import { lazy } from 'react';
import { DASHBOARD, MATCHED_USERS, MY_PROFILE, SCHEDULE_MEETING, SEEKER_REQUEST, SETTINGS, SUBSCRIPTION_USERS, SWIPED_USERS, USERS } from './constants';
import EditUser from '@/pages/Users/EditUser';
import SwipedUsers from '@/pages/Users/swipedUsers/SwipedUsers';
import MatchedUsers from '@/pages/Users/matchedUsers/MatchedUsers';
import SubscriptionUsers from '@/pages/Users/subscriptionUsers/SubscriptionUsers';
import SeekerRequests from '@/pages/Users/seekerRequests/SeekerRequests';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';

import AllUsers from '@/pages/Users/allUsers/AllUsers';
const ScheduleMeeting = lazy(() => import('../pages/ScheduleMeeting'));

const coreRoutes = [
  {
    path: `${DASHBOARD}`,
    title: 'root',
    component: Dashboard,
  },
  {
    path: `${USERS}`,
    title: 'Users',
    component: AllUsers,
  },
  {
    path: `${USERS}/:userId`,
    title: 'Users',
    component: EditUser,
  },
  {
    path: `${SWIPED_USERS}`,
    title: 'swiped-users',
    component: SwipedUsers,
  },
  {
    path: `${MATCHED_USERS}`,
    title: 'matched-users',
    component: MatchedUsers,
  },
  {
    path: `${SUBSCRIPTION_USERS}`,
    title: 'subscription-users',
    component: SubscriptionUsers,
  },
  {
    path: `${SEEKER_REQUEST}`,
    title: 'seeker-request',
    component: SeekerRequests,
  },
  {
    path: `${SETTINGS}`,
    title: 'Setting',
    component: Settings,
  },
  {
    path: `${MY_PROFILE}`,
    title: 'My Profile',
    component: Profile,
  },
  {
    path: `${SCHEDULE_MEETING}`,
    title: 'My Profile',
    component: ScheduleMeeting,
  },
];

const routes = [...coreRoutes];
export default routes;
