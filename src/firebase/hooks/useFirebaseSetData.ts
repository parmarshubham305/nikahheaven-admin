import { useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db, auth, firebase } from '../config';

// Initialize Firebase (Make sure you replace the config with your own Firebase project config)
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const useFirebaseSetDoc = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState(null);

  const setDocData = async (
    payload: any,
    collectionName: string,
    docId: string | null | undefined = null,
  ) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    let dataRef = null;

    return new Promise(async (resolve, reject) => {
      try {
        // Get a reference to the Firestore database
        // const db = firebase.firestore();
        const method = docId ? setDoc : addDoc;

        let payLoad = { ...payload };
        const docRef = doc(
          collection(db, collectionName),
          docId || payLoad?.uid || '',
        ) as any;

        //   docId ? (payLoad.id = docId) : (payLoad.id = docRef?.id);
        dataRef = await method(docRef, payLoad).then((res: any) => {
          return res;
        }).catch((error)=>{
            console.log('error', error)
            reject(error)
        }) as any;
        // If docId is provided, update the existing document; otherwise, add a new one
        //   const method = docId ? 'setDoc' : 'add';

        // const docRef = await db.collection(collectionName)[method](
        //   docId || undefined, // If docId is null, it will create a new document
        //   payload
        // );

        setResponse({
          uid: dataRef?.uid,
          ...payload,
        });
        resolve({
          uid: dataRef?.uid,
          ...payload,
        });
      } catch (error: any) {
        setError(error);
        reject(error)
      } finally {
        setLoading(false);
      }
    });

    // return dataRef;
  };

  return { setDocData, loading, error, response };
};

export default useFirebaseSetDoc;
