import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import AuthGuard from './guards/AuthGuard';
import useAuth from './hooks/use-auth';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const { user, isLoading } = useAuth();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator?.serviceWorker?.register(`/firebase-messaging-sw.js`).then(
      registration => {
        // console.log('Service worker registration succeeded:', registration);
      },
      /*catch*/ error => {
        console.error(`Service worker registration failed: ${error}`);
      }
    );
  } else {
    console.error('Service workers are not supported.');
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          element={
            <AuthGuard user={user} isLoading={isLoading}>
              <DefaultLayout user={user}/>
            </AuthGuard>
          }
        >
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
