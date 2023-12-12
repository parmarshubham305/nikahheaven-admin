import { useEffect, useState } from 'react';
// import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
// import CardThree from '../../components/CardThree.tsx';
// import CardTwo from '../../components/CardTwo.tsx';
// import ChartOne from '../../components/ChartOne.tsx';
// import ChartThree from '../../components/ChartThree.tsx';
// import ChartTwo from '../../components/ChartTwo.tsx';
// import ChatCard from '../../components/ChatCard.tsx';
// import MapOne from '../../components/MapOne.tsx';
// import TableOne from '../../components/TableOne.tsx';
import { getAllDataCount } from '@/firebase/services/dataCountService.ts';
import { C_MATCH, C_MEETINGS, C_SEEKER_REQUEST, C_SWIPE_CARDS, C_USERS } from '@/firebase/constants.ts';
import { firebaseQueryOperators } from '@/firebase/queryBuilder.ts';
import Loader from '@/common/Loader/index.tsx';

const Dashboard = () => {
  //states
  const [dataCount, setDataCount] = useState<any>({
    allUsers: 0,
    swipedUsers: 0,
    matchedUsers: 0,
    paidUsers: 0,
    seekerRequests: 0,
    meetingsRequests: 0,
  });

  const [isLoading, setIsLoading] = useState<any>(false);

  //hooks
  useEffect(() => {
    getData();
  }, []);

  //handle function
  const getData = async () => {
    setIsLoading(true);
    const allUsers = await getAllDataCount(C_USERS, [
      {
        property: 'uid',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);
    const swipedUsers = await getAllDataCount(C_SWIPE_CARDS, [
      {
        property: 'uid',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);
    const matchedUsers = await getAllDataCount(C_MATCH, [
      {
        property: 'uid',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);
    const paidUsers = await getAllDataCount(C_USERS, [
      {
        property: 'packageEndDate',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);

    const seekerRequests = await getAllDataCount(C_SEEKER_REQUEST, [
      {
        property: 'uid',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);
    const meetingsRequests = await getAllDataCount(C_MEETINGS, [
      {
        property: 'uid',
        operator: firebaseQueryOperators.NOT_EQUAL_TO,
        value: '',
      },
    ]);
    setDataCount((prev: any) => ({ ...prev, allUsers, swipedUsers, matchedUsers, paidUsers, seekerRequests, meetingsRequests }));
    setIsLoading(false);
  };

  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardOne dataCount={dataCount?.allUsers?.count} title="All Users" isLoading={isLoading}/>
          <CardOne dataCount={dataCount?.paidUsers?.count} title="Subscription Users" isLoading={isLoading}/>
          <CardOne dataCount={dataCount?.swipedUsers?.count} title="Total Swiped Users" isLoading={isLoading}/>
          <CardOne dataCount={dataCount?.matchedUsers?.count} title="Total Matches Users" isLoading={isLoading}/>
          <CardOne dataCount={dataCount?.seekerRequests?.count} title="Sent Seeker Requests" isLoading={isLoading}/>

          {/* <CardTwo dataCount={dataCount}/>
        <CardThree dataCount={dataCount}/>
        <CardFour dataCount={dataCount}/> */}
        </div>
      {/* )} */}

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default Dashboard;
