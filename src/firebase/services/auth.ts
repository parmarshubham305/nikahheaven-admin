import {
  collection,
  doc,
  where,
  query,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { localKeys } from '../../constants/localStorage';
// import { apiHandler } from '../axios';
import { auth, db } from '../config';
import { C_USERS } from '../constants';
// import useStudentStore from '../../stores/StudentStore';

// Get the user data thorough mail
export const getUserData = (email:string | null) =>
  new Promise((resolve) => {
    // const studentStore = useStudentStore();
    const getUserProfileData = query(
      collection(db, C_USERS),
    //   where('deleteDocument', '==', false),
      where('email', '==', email)
      // where('email', '==', studentStore?.email ? studentStore?.email : email)
    );
    let fetchedProfiles = [] as any;
    getDocs(getUserProfileData)
      .then((response) => {
        response.docs.forEach((document) => {
          const fetchedProfile = {
            id: document.id,
            ...document.data(),
          };
          fetchedProfiles.push(fetchedProfile);
        });
        fetchedProfiles && fetchedProfiles.length > 0
          ? resolve(fetchedProfiles[0])
          : resolve('');
      })
      .catch((error) => {
        console.log('error::', error)
        resolve(false)});
  });


// Sign Out User
export const signOut = async () => {
//   apiHandler.defaults.headers.common.Authorization = '';
  await localStorage.removeItem(localKeys.AUTH);
//   await localStorage.removeItem(localKeys.GOOGLE_OAUTH);
//   await localStorage.removeItem(localKeys.GOOGLE_OAUTH_DATA);
  await auth.signOut();
//   window.location = 'https://localhost:5173/';
};
