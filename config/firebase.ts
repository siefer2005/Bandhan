import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnduvuvB3TdIz_Rop2jJlQf9pbuFQ_IUI",
    authDomain: "bandhan-a347b.firebaseapp.com",
    projectId: "bandhan-a347b",
    storageBucket: "bandhan-a347b.firebasestorage.app",
    messagingSenderId: "817530679697",
    appId: "1:817530679697:web:6db3875cca25b52c7a2a30",
    measurementId: "G-F2LRD13RVC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
