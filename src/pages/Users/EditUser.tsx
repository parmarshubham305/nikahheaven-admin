import { defaultImgUrl } from '@/constants/other';
import { useLocation } from 'react-router-dom';
import ApproveSwitch from './ApproveSwitch';
import { useEffect, useState } from 'react';
import ProfileTabForm from './ProfileTabForm';
import GeneralInfoTabForm from './GeneralInfoTabForm';
import { C_USERS } from '@/firebase/constants';
import { toast } from 'react-toastify';
import useFirebaseSetDoc from '@/firebase/hooks/useFirebaseSetData';

const EditUser = () => {
  const location = useLocation();
  const [approve, setApprove] = useState(false);
  const [userInfo, setUserInfo] = useState(location.state?.user);
  const is_view = location.state?.is_view ?? false;
  const [activeTab, setActiveTab] = useState('profile');
  const { name, email, status, profilePic } = userInfo;
  const { setDocData, loading } = useFirebaseSetDoc();

  const TickmarkIcon = () => (
    <svg className=" text-primary" stroke="currentColor" fill="#3C50E0" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M23 11.99L20.56 9.2l.34-3.69-3.61-.82L15.4 1.5 12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69 2.44-2.8zm-3.95 1.48l-.56.65.08.85.18 1.95-1.9.43-.84.19-.44.74-.99 1.68-1.78-.77-.8-.34-.79.34-1.78.77-.99-1.67-.44-.74-.84-.19-1.9-.43.18-1.96.08-.85-.56-.65L3.67 12l1.29-1.48.56-.65-.09-.86-.18-1.94 1.9-.43.84-.19.44-.74.99-1.68 1.78.77.8.34.79-.34 1.78-.77.99 1.68.44.74.84.19 1.9.43-.18 1.95-.08.85.56.65 1.29 1.47-1.28 1.48z"></path>
      <path d="M10.09 13.75l-2.32-2.33-1.48 1.49 3.8 3.81 7.34-7.36-1.48-1.49z"></path>
    </svg>
  );
  useEffect(() => {
    setApprove(userInfo.isApproved);
  }, [userInfo]);

  const handleApprove = async (val: boolean) => {
    const updatedPayload = { ...userInfo, isApproved: val };
    const res: any = await setDocData(updatedPayload, C_USERS, userInfo?.uid);
    if (res?.uid) {
      toast.success('User has been updated succesfully', {
        position: 'top-right',
        autoClose: 5000,
        type: 'success',
      });
      setUserInfo(res);
    } else {
      toast.success("Something wen't wrong", {
        position: 'top-right',
        autoClose: 5000,
        type: 'error',
      });
    }
  };
  return (
    <div className="sm:flex no-wrap md:-mx-2 block flex-1">
      <div className="w-full xl:w-3/12 md:w-4/12  sm:w-5/12 md:mx-2">
        <div className=" rounded p-3  border-green-400 bg-white/40  shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="image overflow-hidden">
            <img className="h-auto w-full mx-aut0" src={`${profilePic === '' ? defaultImgUrl : profilePic}`} alt="UserImg" />
            <div className="relative">
              <div className="absolute -top-[150px] lg:-top-[120px] right-[15px]">{approve && <TickmarkIcon />}</div>
            </div>
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-2 capitalize text-center">{name}</h1>
          <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center font-bold">{email}</p>
          <ul className="bg-white/70-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded  text-sm">{status}</span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Approve</span>
              <span className="ml-auto">
                <ApproveSwitch approve={approve} setApprove={handleApprove} loading={loading} />
              </span>
            </li>
          </ul>
        </div>
        <div className="my-4"></div>
        {userInfo?.photos?.length > 0 && (
          <div className="rounded p-3  border-green-400 bg-white/40  shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span>Photos</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              {userInfo?.photos?.map((item: any, index: any) => (
                <div className="text-center my-2" key={index}>
                  <img className="h-30 w-30 mx-auto object-cover" src={item?.photoUrl} alt="User's photos" />
                </div>
              ))}
              {userInfo?.photos?.length === 0 && <div className="text-center my-2">No more photos</div>}
            </div>
          </div>
        )}
      </div>
      <div className="w-full xl:w-9/12 md:w-8/12 sm:w-7/12 sm:mx-2 sm:mt-0 mt-4 flex sm:flex-1">
        <div className="border rounded p-3  w-full border-stroke bg-white/40  shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="grid">
            <div className="flex flex-col gap-9">
              <div>
                <div className="border-b border-stroke p-3 dark:border-strokedark">
                  <div className="dark:border-strokedark flex flex-wrap gap-3">
                    <div
                      className={`rounded-md py-3 px-2 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 md:flex-grow-0 flex-grow md:flex-shrink flex-shrink-0 text-center md:text-start ${
                        activeTab === 'profile' ? 'bg-primary text-white' : 'bg-white dark:bg-meta-4'
                      } text-black dark:text-white`}
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile
                    </div>
                    <div
                      className={`rounded-md py-3 px-2 text-sm font-medium hover:bg-primary hover:text-white dark:hover:bg-primary md:text-base lg:px-6 md:flex-grow-0 flex-grow md:flex-shrink flex-shrink-0 text-center md:text-start ${
                        activeTab === 'generalInfo' ? 'bg-primary text-white' : 'bg-white dark:bg-meta-4'
                      } text-black dark:text-white`}
                      onClick={() => setActiveTab('generalInfo')}
                    >
                      General Info
                    </div>
                  </div>
                </div>
                {activeTab === 'profile' && <ProfileTabForm userInfo={userInfo} is_view={is_view} />}
                {activeTab === 'generalInfo' && <GeneralInfoTabForm userInfo={userInfo} is_view={is_view} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
