/* ============================================================
   Firebase connection.

   Leave projectId empty and the site runs entirely off assets/data.js —
   which is how it works right now. Fill both values in and every list on
   the site reads from Firestore instead, and the quote form writes to it.

   Both values are safe to publish. They identify the project; they do not
   grant access. Access is controlled by the rules in firebase/firestore.rules,
   which allow the public to read only documents marked published, and to
   create an inquiry but never read one back.

   Find them in: Firebase console -> Project settings -> General ->
   "Your apps" -> Web app -> SDK setup and configuration.
   ============================================================ */

window.CORE_FIREBASE = {
  projectId: '',
  apiKey: '',
};

/* Where the "Platform login" buttons point. */
window.CORE_PLATFORM_URL = 'https://example.com/login';
