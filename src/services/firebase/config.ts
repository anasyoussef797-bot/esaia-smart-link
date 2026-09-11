/**
 * ESAIA - Firebase Client SDK Centralized Configuration
 * Securely loads environment variables and provides unified Auth, Firestore, and Storage handles.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Safe environment fallback configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'esaia-saas.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'esaia-saas',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'esaia-saas.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your-firebase-api-key' &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key' &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'esaia-saas'
);

// Only initialize live Firebase SDK services if valid production credentials exist
// This prevents 400 Bad Request network errors to Google Identity Toolkit in demo/preview environments
let app: FirebaseApp | null = null;
if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

export const auth: Auth = (isFirebaseConfigured && app)
  ? getAuth(app)
  : ({
      currentUser: null,
      onAuthStateChanged: () => () => {},
      signOut: async () => {},
    } as unknown as Auth);

export const db: Firestore = (isFirebaseConfigured && app)
  ? getFirestore(app)
  : ({} as unknown as Firestore);

export const storage: FirebaseStorage = (isFirebaseConfigured && app)
  ? getStorage(app)
  : ({} as unknown as FirebaseStorage);

export default app;
