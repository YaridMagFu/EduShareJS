import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAiEVuLVat3NGmHv0zYLcayOQE3B45Seus",
    authDomain: "intentobueno-8bc83.firebaseapp.com",
    projectId: "intentobueno-8bc83",
    storageBucket: "intentobueno-8bc83.appspot.com",
    messagingSenderId: "1096943338637",
    appId: "1:1096943338637:web:dc44f3fffab904bd90cec4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);