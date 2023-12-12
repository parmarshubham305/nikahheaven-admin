import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { localKeys } from '../../constants/localStorage';

import { getLocalUser } from '../../utils/localStorage';
import { VAPID_KEY, auth, db, messaging } from '../config';
import { C_USERS } from '../constants';
import { getToken } from 'firebase/messaging';

const user = getLocalUser(localKeys.AUTH) as any;

// Get ProfileData data from db
export const getProfileData = (id = '') =>
  new Promise((resolve) => {
    const getActivitiesQuery = query(
      collection(db, C_USERS),
      where(
        'createdBy',
        '==',
        id !== '' ? id : auth?.currentUser?.uid || user?.uid,
      ),
      where('deleteDocument', '==', false),
    );
    let fetchedProfiles = [] as any;
    getDocs(getActivitiesQuery)
      .then((response) => {
        response.docs.forEach((document) => {
          const fetchedProfile = {
            id: document.id,
            ...document.data(),
          };
          fetchedProfiles.push(fetchedProfile);
        });
        resolve(fetchedProfiles[0]);
      })
      .catch((error) => {
        resolve(fetchedProfiles);
      });
  });

export const getProfileDataByEmail = (email: string | null) =>
  new Promise((resolve) => {
    const getActivitiesQuery = query(
      collection(db, C_USERS),
      where('email', '==', email),
      where('deleteDocument', '==', false),
    );
    let fetchedProfiles = [] as any;
    getDocs(getActivitiesQuery)
      .then((response) => {
        response.docs.forEach((document) => {
          const fetchedProfile = {
            id: document.id,
            ...document.data(),
          };
          fetchedProfiles.push(fetchedProfile);
        });
        resolve(fetchedProfiles[0]);
      })
      .catch((error) => {
        resolve(fetchedProfiles);
      });
  });

export const getProfileLogInData = (id: string) =>
  new Promise((resolve) => {
    const getParentsDataQuery = query(
      collection(db, C_USERS),
      where('createdBy', '==', auth?.currentUser?.uid || user?.uid),
      //   where('deleteDocument', '==', false)
    );
    let fetchedProfileLogins = [] as any;
    getDocs(getParentsDataQuery)
      .then((response) => {
        response.docs.forEach((document) => {
          const fetchedProfileLogIn = {
            id: document.id,
            ...document.data(),
          };
          fetchedProfileLogins.push(fetchedProfileLogIn);
        });
        resolve(fetchedProfileLogins[0]);
      })
      .catch((error) => {
        resolve('');
      });
  });


//Notifications
const storeFCMTokenInFirestore = (token: any, userId: string) => {
  const userDocRef = doc(db, 'Users', userId);

  setDoc(userDocRef, { fcmToken: token }, { merge: true })
    .then(() => {
      console.log('FCM token stored in Firestore successfully.');
    })
    .catch((error) => {
      console.error('Error storing FCM token in Firestore:', error);
    });
};

export const getFCMTokenAndStore = async (userId: string) => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      // console.log("Notification permission granted");
      // console.log("userIdmesg---", userId);
      try {
        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken) => {
            // console.log('currentToken==>', currentToken);
            if (currentToken) {
              storeFCMTokenInFirestore(currentToken, userId);
            } else {
              console.log('No FCM token available. Request permission.');
            }
          })
          .catch((error) => {
            console.error('Error retrieving FCM token:', error);
          });
      } catch (error) {
        console.log('error==>', error);
      }
    } else {
      console.log('Notification permission denied');
      return;
    }
  });
  // const messaging = getMessaging();
};
