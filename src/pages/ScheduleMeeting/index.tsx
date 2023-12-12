import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import { C_MEETINGS } from '@/firebase/constants';
import Loader from '@/common/Loader';
import DataTable from './DataTable';
import useAuth from '@/hooks/use-auth';
import PushNotification from './PushNotification';
import { firebaseDataType } from '@/constants/other';

const ScheduleMeeting = () => {
  const { user } = useAuth();
  const { data, isFetching } = useFirebaseListener(C_MEETINGS, firebaseDataType.METADATA, null, '', { property: 'createdAt', value: 'desc' });

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white text-black dark:text-white px-5 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {user && <PushNotification user={user} />}
      {data && <DataTable data={data} />}
    </div>
  );
};
export default ScheduleMeeting;
