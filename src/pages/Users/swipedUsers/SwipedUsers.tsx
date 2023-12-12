import { C_SWIPE_CARDS, C_USERS } from '@/firebase/constants';
import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import Loader from '@/common/Loader';
import SwipeUserTable from './SwipeUserTable';
import { useEffect, useState } from 'react';
const SwipedUsers = () => {
  const { data: swipedCollectionData, isFetching: isSwipeLoad } = useFirebaseListener(C_SWIPE_CARDS);
  const { data: allUserData, isFetching: isUserLoad } = useFirebaseListener(C_USERS);
  const [swipeData, setSwipeData] = useState([]);

  useEffect(() => {
    getSwipedUsers(swipedCollectionData, allUserData);
  }, [swipedCollectionData, allUserData]);

  const getSwipedUsers = (sCollectionData: any, allUserData: any) => {
    const swipes: any = [];
    if (allUserData && allUserData?.length > 0 && sCollectionData && sCollectionData?.length > 0) {
      sCollectionData.forEach((doc: any) => {
        const userInfo = allUserData.find((o:any) => o.uid === doc.uid);
        const otherInfo = allUserData.find((o: any) => o.uid === doc.other_uid);
        swipes.push({ ...doc, userInfo, otherInfo });
      });
    }
    setSwipeData(swipes);
  };

  if (isSwipeLoad || isUserLoad) {
    return <Loader />;
  }

  return <div>{swipedCollectionData && <SwipeUserTable data={swipeData} />}</div>;
};

export default SwipedUsers;
