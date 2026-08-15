/* ============================================================
   Firestore over its REST API.

   No SDK, no bundler, no npm — just fetch(). Firestore's REST endpoint
   returns documents in a typed wrapper ({stringValue: "..."}), so the two
   converters below translate to and from plain JavaScript objects.

   Security is unchanged: these calls are unauthenticated, so the rules in
   firebase/firestore.rules apply exactly as written.
   ============================================================ */

(function () {
  const cfg = window.CORE_FIREBASE || {};
  const BASE = 'https://firestore.googleapis.com/v1/projects';

  const enabled = () => Boolean(cfg.projectId && cfg.apiKey);

  function url(path) {
    return `${BASE}/${cfg.projectId}/databases/(default)/documents/${path}?key=${cfg.apiKey}`;
  }

  /* ---- typed value -> plain JS ---- */
  function decodeValue(v) {
    if (v === null || v === undefined) return null;
    if ('stringValue' in v) return v.stringValue;
    if ('booleanValue' in v) return v.booleanValue;
    if ('integerValue' in v) return Number(v.integerValue);
    if ('doubleValue' in v) return v.doubleValue;
    if ('timestampValue' in v) return v.timestampValue;
    if ('nullValue' in v) return null;
    if ('arrayValue' in v) return (v.arrayValue.values || []).map(decodeValue);
    if ('mapValue' in v) return decodeFields(v.mapValue.fields || {});
    return null;
  }

  function decodeFields(fields) {
    const out = {};
    for (const key of Object.keys(fields)) out[key] = decodeValue(fields[key]);
    return out;
  }

  /* ---- plain JS -> typed value ---- */
  function encodeValue(v) {
    if (v === null || v === undefined) return { nullValue: null };
    if (typeof v === 'string') return { stringValue: v };
    if (typeof v === 'boolean') return { booleanValue: v };
    if (typeof v === 'number') {
      return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    }
    if (Array.isArray(v)) return { arrayValue: { values: v.map(encodeValue) } };
    if (typeof v === 'object') return { mapValue: { fields: encodeFields(v) } };
    return { nullValue: null };
  }

  function encodeFields(obj) {
    const out = {};
    for (const key of Object.keys(obj)) out[key] = encodeValue(obj[key]);
    return out;
  }

  /**
   * Read a whole collection. Returns [] on any failure so callers can fall
   * back to the local placeholder data rather than showing an error.
   */
  async function getCollection(name) {
    if (!enabled()) return [];
    try {
      const res = await fetch(url(name) + '&pageSize=300');
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      return (json.documents || []).map((doc) => {
        const data = decodeFields(doc.fields || {});
        // the document id is the slug, so use it if the field is missing
        if (!data.slug) data.slug = doc.name.split('/').pop();
        return data;
      });
    } catch (err) {
      console.warn(`[firestore] read failed for "${name}" — using placeholder data`, err);
      return [];
    }
  }

  /** Create one document. Used by the quote form. */
  async function createDoc(name, data) {
    if (!enabled()) {
      console.info('[firestore] not configured — submission logged only:', data);
      return { ok: true, stored: false };
    }
    const res = await fetch(url(name), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: encodeFields(data) }),
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Firestore rejected the submission (${res.status}). ${detail.slice(0, 200)}`);
    }
    return { ok: true, stored: true };
  }

  window.CoreDB = { enabled, getCollection, createDoc };
})();
