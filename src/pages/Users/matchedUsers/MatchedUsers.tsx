import { C_MATCH, C_USERS } from '@/firebase/constants';
import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import Loader from '@/common/Loader';
import MatchedUsersTable from './MatchedUsersTable';
import { useEffect, useState } from 'react';
const MatchedUsers = () => {
  const { data: matchedCollectionData, isFetching: isMatchedLoading } = useFirebaseListener(C_MATCH);
  const { data: allUserData, isFetching: isUserLoad } = useFirebaseListener(C_USERS);
  const [matchedData, setMatchedData] = useState([]);

  useEffect(() => {
    getMatchedUsers(matchedCollectionData, allUserData);
  }, [matchedCollectionData, allUserData]);

  const getMatchedUsers = (sCollectionData: any, allUserData: any) => {
    const matched: any = [];
    if (allUserData && allUserData?.length > 0 && sCollectionData && sCollectionData?.length > 0) {
      sCollectionData.forEach((doc: any) => {
        const userInfo = allUserData.find((o: any) => o.uid === doc.uid);
        const otherInfo = allUserData.find((o: any) => o.uid === doc.other_uid);
        matched.push({ ...doc, userInfo, otherInfo });
      });
    }
    setMatchedData(matched);
  };

  if (isMatchedLoading || isUserLoad) {
    return <Loader />;
  }

  return <div>{matchedCollectionData && <MatchedUsersTable data={matchedData} />}</div>;
};

export default MatchedUsers;
