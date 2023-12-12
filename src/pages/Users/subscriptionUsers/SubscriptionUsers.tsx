import { C_USERS } from '@/firebase/constants';
import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import Loader from '@/common/Loader';
import SubscriptionUsersTable from './SubscriptionUsersTable';
import { useEffect, useState } from 'react';
import { firebaseDataType } from '@/constants/other';
import { firebaseQueryOperators } from '@/firebase/queryBuilder';
const SubscriptionUsers = () => {
  const [subscribeData, setSubscribeData] = useState<any>([]);
  const { data: subscriptionUserData, isFetching } = useFirebaseListener(C_USERS, firebaseDataType.METADATA, [
    {
      property: 'email',
      operator: firebaseQueryOperators.NOT_EQUAL_TO,
      value: '',
    },
  ]);

  useEffect(() => {
    getSubscriptionUsers(subscriptionUserData);
  }, [subscriptionUserData]);

  const getSubscriptionUsers = (subscriptionUserData: any) => {
    const subscriptionUsers: any = [];
    if (subscriptionUserData && subscriptionUserData?.length > 0) {
      subscriptionUserData.forEach((doc: any) => {
        doc['status'] = doc['status'] === undefined ? 'Active' : doc.status;
        doc['role'] = doc['role'] === undefined ? 'normal' : doc.role;
        if (doc.status !== 'Delete') {
          if (doc.packageEndDate) {
            subscriptionUsers.push(doc);
          }
        }
      });
    }
    setSubscribeData({ subscriptionUsers });
  };

  if (isFetching) {
    return <Loader />;
  }

  return <div>{subscriptionUserData && <SubscriptionUsersTable data={subscribeData} />}</div>;
};

export default SubscriptionUsers;
