import { NextResponse } from 'next/server';

/**
 * Receives a quote request and writes it to Firestore.
 *
 * Runs on the server so the write uses a service account rather than public
 * rules, which keeps the inquiries collection unreadable from the browser.
 * With no credentials configured it logs the submission and returns success,
 * so the form is testable before Firebase exists — swap that for a hard error
 * before you go live.
 */

export const runtime = 'nodejs';

type Body = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  country?: string;
  projectType?: string;
  message?: string;
  instrumentSlugs?: string[];
  source?: string;
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (name.length < 2 || name.length > 200) {
    return NextResponse.json({ error: 'Please give us a name.' }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }
  if (message.length < 2 || message.length > 5000) {
    return NextResponse.json({ error: 'Please tell us what you need.' }, { status: 400 });
  }

  const record = {
    name,
    email,
    company: (body.company ?? '').trim().slice(0, 200),
    phone: (body.phone ?? '').trim().slice(0, 60),
    country: (body.country ?? '').trim().slice(0, 100),
    projectType: (body.projectType ?? '').trim().slice(0, 100),
    message,
    instrumentSlugs: Array.isArray(body.instrumentSlugs) ? body.instrumentSlugs.slice(0, 20) : [],
    source: body.source ?? 'website',
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    console.info('[inquiries] no FIREBASE_SERVICE_ACCOUNT set — submission logged only:', record);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const { getApps, initializeApp, cert } = await import('firebase-admin/app');
    const { getFirestore, FieldValue } = await import('firebase-admin/firestore');

    if (!getApps().length) {
      initializeApp({ credential: cert(JSON.parse(serviceAccount)) });
    }
    await getFirestore().collection('inquiries').add({
      ...record,
      receivedAt: FieldValue.serverTimestamp(),
    });

    // TODO: notify the team — a Firestore trigger with SendGrid/Resend, or a
    // webhook into whichever inbox the sales team actually reads.

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error('[inquiries] write failed', err);
    return NextResponse.json(
      { error: 'We could not record that. Please email us directly.' },
      { status: 500 },
    );
  }
}
