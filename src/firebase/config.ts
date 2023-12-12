import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getPerformance } from 'firebase/performance';
import { getMessaging } from 'firebase/messaging';

//jeel
const configDev = {
  apiKey: 'AIzaSyBq2vzV2AZnVqwbZa9_iRHQNrKkS4R2WVQ',
  authDomain: 'nikahhevan.firebaseapp.com',
  databaseURL: 'https://nikahhevan-default-rtdb.firebaseio.com',
  projectId: 'nikahhevan',
  storageBucket: 'nikahhevan.appspot.com',
  messagingSenderId: '1084152193627',
  appId: '1:1084152193627:web:010ad836bb0cadb66cd57e',
  measurementId: 'G-BKW7M361RH',
};

//Epicbae
const configProd = {
  apiKey: 'AIzaSyAlJSmfUC9rNzGg5CMDdv9TAgxG-WyaKcc',
  authDomain: 'nikahheaven-77.firebaseapp.com',
  databaseURL: 'https://nikahheaven-77-default-rtdb.firebaseio.com',
  projectId: 'nikahheaven-77',
  storageBucket: 'nikahheaven-77.appspot.com',
  messagingSenderId: '602164921281',
  appId: '1:602164921281:web:90263203b9e46391c12540',
  measurementId: 'G-15Y4P8MRKC',
};

//firebase or other config
export const WEB_CLIENT_ID = '602164921281-4ub1ti3jpero98atollsjmr12sv205h4.apps.googleusercontent.com';
export const CLOUDINARY_PRESENT_NAME = 'xv99gfhp';
export const CLOUDINARY_CLOUD_NAME = 'dyv2pftfd';
export const STRIPE_PUBLIC_KEY = 'pk_test_51N3SR4SD6UvKCkuQSGbaw6dhFyPeeHM51cdHBA1fOGvbxt4LEVjhOsZeKTkZ0QrAPECCeFMiS6gY3HXejfXDqdq5002uik7qth';
export const STRIPE_CLOUD_SERVER_URL = 'http://localhost:5000/epicbae-246b2/us-central1/payWithStripe';
export const IS_STRIPE_LIVE = false;

// jp
// export const VAPID_KEY="BNLkZ36KL9DPe9W1C6zxKAzYBLYHOwXOPSz1PKQ8hXSN1gLgRyyZkzytI6pmXnixF57x_gSc--j7q1AIk9tNvko"

// kapa
export const VAPID_KEY = 'BL2BP5u1OUbVxatLTkf9BVnAbZtxNOeX5cGPtwP5Yds5SGb1vh7C7szC25fqFrtBHsaNvl3pzBgYJN1MhlrJitU';

// Allow developer to switch between Dev and Prod DB using code.
const dev = false;
const config = dev ? configDev : configProd;
const firebase = initializeApp(config);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const storage = getStorage(firebase);
const performance = getPerformance(firebase);
const db = getFirestore(firebase);
const messaging = getMessaging(firebase);

export { firebase, analytics, auth, storage, performance, db, messaging };
