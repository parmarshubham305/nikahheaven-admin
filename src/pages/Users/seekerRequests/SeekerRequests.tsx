import { C_SEEKER_REQUEST, C_SWIPE_CARDS, C_USERS } from '@/firebase/constants';
import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import Loader from '@/common/Loader';
import SeekerRequestsTable from './SeekerRequestsTable';
import { useEffect, useState } from 'react';
const SeekerRequests = () => {
  const { data: seekerCollectionData, isFetching: isSeekerLoading } = useFirebaseListener(C_SEEKER_REQUEST);
  const { data: allUserData, isFetching: isUserLoad } = useFirebaseListener(C_USERS);
  const [seekersData, setSeekersData] = useState([]);

  useEffect(() => {
    getSeekerRequests(seekerCollectionData, allUserData);
  }, [seekerCollectionData, allUserData]);

  const getSeekerRequests = (sCollectionData: any, allUserData: any) => {
    const seekers: any = [];
    if (allUserData && allUserData?.length > 0 && sCollectionData && sCollectionData?.length > 0) {
      sCollectionData.forEach((doc: any) => {
        const userInfo = allUserData.find((o: any) => o.uid === doc.uid);
        const otherInfo = allUserData.find((o: any) => o.uid === doc.other_uid);
        if (doc.status !== 'Delete') {
          seekers.push({ ...doc, userInfo, otherInfo });
        }
      });
    }
    setSeekersData(seekers);
  };

  if (isSeekerLoading || isUserLoad) {
    return <Loader />;
  }

  return <div>{seekerCollectionData && <SeekerRequestsTable data={seekersData} />}</div>;
};

export default SeekerRequests;
