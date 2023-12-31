import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ApiRoutes } from '../firebase/apis';
// import config from '../utils/urlConfig';

import { getDecryptedLocalData, getLocalUser, setEncryptedLocalData } from '../utils/localStorage';
import { auth } from '../firebase/config';
// import { getUserData } from '../firebase/services/auth';
import { localKeys, secretKeys } from '../constants/localStorage';
import { handleTokenExpired } from '../utils/refreshToken';
import { getFCMTokenAndStore, getProfileLogInData } from '../firebase/services/user';
import { apiHandler, axiosPost } from '../firebase/axios';
// import { logInProviders } from '../constants/staticData';
// import useProfileStore from '../stores/ProfileStore';
// import { editProfile } from '../firebase/services/updateServices';
import { getUserData } from '../firebase/services/auth';

const useAuth = (isInitialCall = true) => {
  const [user, setUser] = useState<any>(getLocalUser(localKeys.AUTH));
  const [isLoading, setIsLoading] = useState(true);
  //   const { profile, setProfile } = useProfileStore();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      //   if (authUser && authUser?.emailVerified) {
      if (authUser) {
        fetchData(authUser?.email, authUser);
      } else {
        localStorage.removeItem(localKeys?.AUTH);
        setUser(null);
        // setProfile(null);
        setIsLoading(false);
      }
    });

    return () => listener();
    //eslint-disable-next-line
  }, [isInitialCall]);

  const fetchData = async (email: string | null, authUser: any) => {
    const res = (await getUserData(email)) as any;
    if (res) {
      if (!res?.fcmToken) {
        getFCMTokenAndStore(res?.uid);
      }
      const { uid, id, rt } = res;
      const loginRes = (await getProfileLogInData(uid)) as any;
      if (loginRes) {
        const { loggedInType } = loginRes;
        // if (loggedInType === logInProviders.GOOGLE) {
        //   const googleAuth = await getDecryptedLocalData(
        //     localKeys.GOOGLE_OAUTH_DATA,
        //     secretKeys.GOOGLE_OAUTH_DATA
        //   );
        //   if (googleAuth) {
        //     const { expiry_date, refresh_token } = googleAuth;
        //     tokenExpireHandler(expiry_date, refresh_token, id);
        //   } else if (rt) {
        //     expireTokenCallback(rt, id);
        //   }
        // }
      }
      setEncryptedLocalData({ authUser, ...res }, localKeys?.AUTH, secretKeys?.AUTH);
      setUser({ authUser, ...res });
      //   setProfile(res);
      setIsLoading(false);
    } else {
      localStorage.removeItem(localKeys?.AUTH);
      setUser(null);
      //   setProfile(null);
      setIsLoading(false);
    }
  };

  const getUserDataByEmail = async (email: string | null) => {
    const res = (await getUserData(email)) as any;
    if (res) {
      setUser((prev: any) => ({ ...prev, ...res }));
      setIsLoading(false);
    }
  };

  const tokenExpireHandler = (expiry_date: string, refresh_token: string, userDocId = '') => {
    handleTokenExpired(expiry_date, () => expireTokenCallback(refresh_token, userDocId));
  };

  const expireTokenCallback = async (refresh_token: string, userDocId = '') => {
    try {
      const res = await axiosPost(ApiRoutes.GOOGLE_AUTH, {
        action: 'tokenRefresh',
        refreshToken: refresh_token,
      });
      if (res.status && res.data.access_token) {
        // if (config.environment === 'v2Development') {
        //   console.log('V20231103: Token successfully refreshed.');
        // }
        const { access_token, expiry_date } = res.data;
        apiHandler.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        setEncryptedLocalData(access_token, localKeys.GOOGLE_OAUTH, secretKeys.GOOGLE_OAUTH);
        setEncryptedLocalData({ ...res.data }, localKeys.GOOGLE_OAUTH_DATA, secretKeys.GOOGLE_OAUTH_DATA);
        // await editProfile({
        //   id: user?.id || userDocId,
        //   rt: refresh_token,
        //   t_expire: expiry_date,
        // });
        tokenExpireHandler(expiry_date, refresh_token);
      }
    } catch (error) {}
  };

  const getUser = () => {
    return user;
  };

  return { user, getUser, tokenExpireHandler, fetchData, getUserDataByEmail, isLoading };
};

export default useAuth;
