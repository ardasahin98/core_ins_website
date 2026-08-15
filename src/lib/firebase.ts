import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True once the project env vars are filled in. Until then the site runs
 *  entirely off the local seed files, so it works before Firebase exists. */
export const firebaseEnabled = Boolean(config.projectId && config.apiKey);

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseEnabled) return null;
  if (!app) app = getApps().length ? getApp() : initializeApp(config);
  return app;
}

export function db(): Firestore | null {
  const a = getFirebaseApp();
  return a ? getFirestore(a) : null;
}

export function storage(): FirebaseStorage | null {
  const a = getFirebaseApp();
  return a ? getStorage(a) : null;
}
