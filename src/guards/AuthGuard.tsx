import { Navigate } from 'react-router-dom';
import * as ROUTES from '../routes/constants';
// import Loader from '../components/shared/Loader';
import Loader from '../common/Loader/index';

const AuthGuard = ({ children, user, isLoading }: any) => {
  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
