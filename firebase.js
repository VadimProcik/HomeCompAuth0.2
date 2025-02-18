// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA3aiZlixuyxr4KF5Yo0TYGztEOKnx7KU4",
  authDomain: "testingauth-59b25.firebaseapp.com",
  projectId: "testingauth-59b25",
  storageBucket: "testingauth-59b25.firebasestorage.app",
  messagingSenderId: "431805722250",
  appId: "1:431805722250:web:ce6a7e85325b5d73c30773",
  measurementId: "G-HGRE116TYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export Firebase Auth for use in your components
export { auth, signInWithEmailAndPassword };