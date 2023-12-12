import { useState, useEffect } from 'react';

import { firebaseDataType } from '@/constants/other';
import { listenCollectionData } from '../services/listeners';
// import useProfileStore from '../stores/ProfileStore';

// TODO EXAMPLE CALL
// const { user } = useAuth();

// const [data, isLoading] = useStoryItemListener(
//   REVIEWER,
//   firebaseDataType.STUDENT_DATA,
//   [
//     {
//       property: 'createdBy',
//       operator: firebaseQueryOperators.EQUAL_TO,
//       value: user?.uid,
//     },
//     {
//       property: 'deleteDocument',
//       operator: firebaseQueryOperators.EQUAL_TO,
//       value: false,
//     },
//   ]
// );

const useFirebaseListener: any = (
  collectionName: string,
  dataType = firebaseDataType.METADATA,
  queryList: any = null,
  userId: any = '',
  orderBy = null,
) => {
  const [collectionData, setCollectionData] = useState<any>(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  //   const { profile } = useProfileStore();

  const nullQuery =
    (queryList && queryList.find((query: any) => query.value === undefined || query.value === null)) || collectionName.includes('undefined') || collectionName === '';

  useEffect(() => {
    if (!nullQuery) {
      const listener = listenCollectionData(
        collectionName,
        (fetchedData: any) => {
          setCollectionData(fetchedData);
          setIsDataFetching(false);
        },
        dataType,
        nullQuery ? null : queryList,
        orderBy,
      );
      return () => listener && listener();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nullQuery, userId]);

  return {
    data: collectionData,
    isFetching: isDataFetching,
    dataCount: collectionData ? collectionData.length : 0,
  };
};

export default useFirebaseListener;
