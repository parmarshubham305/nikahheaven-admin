import AllUsersDataTable from './AllUsersDataTable';
import useFirebaseListener from '@/firebase/hooks/useFirebaseListener';
import { C_USERS } from '@/firebase/constants';
import Loader from '@/common/Loader';

const AllUsers = () => {
  const { data, isFetching } = useFirebaseListener(C_USERS);

  if (isFetching) {
    return <Loader />;
  }

  return <div>{data && <AllUsersDataTable data={data} />}</div>;
};
export default AllUsers;
