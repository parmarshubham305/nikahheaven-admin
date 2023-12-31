import Loader, { Spinner } from '@/common/Loader';
import RenderFormInput from '@/components/formElements/FormInput';
import RenderSelectDropdown from '@/components/formElements/SelectDropdown';
import { Countries } from '@/constants/dropdownData';
import { axiosPost } from '@/firebase/axios';
import { C_USERS } from '@/firebase/constants';
import useFirebaseSetDoc from '@/firebase/hooks/useFirebaseSetData';
import toaster, { toastTypes } from '@/utils/toaster';
import config from '@/utils/urlConfig';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

const PushNotification = ({ user = null }: any) => {
  const { setDocData, loading } = useFirebaseSetDoc();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, disabled },
    setError,
    getValues,
    watch,
  } = useForm({
    values: {
      host_user_id: user?.uid,
      meeting_dateAndTime: '',
      meeting_country: Countries[0]?.value || '',
      notification_title: user?.notification?.title || 'Meeting Scheduled',
      notification_description:
        user?.notification?.description ||
        `You have a meeting scheduled for ${new Date()}. The meeting will take place in ${Countries[0]?.label}. Please be prepared and join on time.`,
    },
  });

  //   const values = getValues();
  const title = watch('notification_title');
  const desc = watch('notification_description');

  //states
  const [isNotificationEdit, setIsNotificationEdit] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  //handler functions
  const isValidMeetingDate = (date: any) => {
    // Allow dates that are in the future
    const currentDate = new Date();
    if (new Date(date) > currentDate) {
      return true;
    } else {
      setError('meeting_dateAndTime', { type: 'custom', message: 'Date should be more than ' + currentDate });
      return false;
    }
  };

  const isValidCountry = (country: string) => {
    if (country === '') {
      setError('meeting_country', { type: 'custom', message: 'Please select country' });
      return false;
    }
    return true;
  };

  const onSubmit = async (values: FieldValues) => {
    // console.log('values-->', values);
    // e.preventDefault();
    setIsLoading(true);
    if (isValidMeetingDate(values?.meeting_dateAndTime) && isValidCountry(values?.meeting_country)) {
      //   setError({ field: 'common', value: '' });
      // Handle form submission
      try {
        // const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/schedule-meeting`, {
        //   method: 'post',
        //   body: JSON.stringify(values),
        //   headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        //   },
        // })
        //   .then((res: any) => res)
        //   .catch((error) => {
        //     console.log('error==> catch', error);

        //     error?.error && toaster(toastTypes.ERROR, error?.error);
        //     setIsLoading(false);
        //   });
        const res = await axiosPost(`${config?.backendUrl}/schedule-meeting`, values, user?.authUser?.accessToken);

        if (res?.status) {
          // props.getAllMeetings();
          res?.data?.id && toaster(toastTypes.SUCCESS, res?.data?.message);
        } else {
          if (res?.message?.error) {
            toaster(toastTypes.ERROR, res?.message?.error);
          }
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log('error==>', error);
        error?.message && toaster(toastTypes.ERROR, error?.message);
        setIsLoading(false);
      }
    } else {
      // Display an error message or take other appropriate actions
      console.log('Form validation failed!');
      setIsLoading(false);
    }
  };

  const handleNotificationCancel = () => {
    setIsNotificationEdit(false);
  };

  const handleSaveNotification = async () => {
    const {authUser, ...rest}=user;
    const payLoad = {
      ...rest,
      notification: {
        title: title || '',
        description: desc || '',
      },
    };
    const res = (await setDocData(payLoad, C_USERS, rest?.uid)) as any;
    if (res?.uid) {
      setIsNotificationEdit(false);
      toaster(toastTypes.SUCCESS, 'Notification Save Successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-3">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <RenderFormInput
              dbFieldName="meeting_dateAndTime"
              inputType="datetime-local"
              labelText="Select Meeting Date and Time"
              placeHolder="Select Meeting Date and Time"
              register={register}
              errors={errors}
              defaultValue={new Date()}
              isFieldRequired={'This Field is required.'}
              //   isEditable={is_view}
            />
          </div>

          <div className="w-full xl:w-1/2">
            <RenderSelectDropdown
              dbFieldName="meeting_country"
              register={register}
              errors={errors}
              labelText={'Select Country'}
              options={Countries}
              //   defaultValue={Countries[0]}
              //   isEditable={is_view}
            />
          </div>
        </div>
        <div className="border-stroke bg-white text-black dark:text-white dark:border-strokedark dark:bg-boxdark rounded-lg overflow-hidden shadow-lg w-full">
          <div className="flex justify-between p-4 bg-gray-200">
            <h5 className="text-xl">Notification</h5>
            <button type="button" className="bg-primary text-white px-4 py-2 rounded" onClick={() => setIsNotificationEdit(!isNotificationEdit)}>
              Edit
            </button>
          </div>
          <div className="border-b-2 border-stroke-200"></div>
          <div className="p-4">
            {isNotificationEdit ? (
              <>
                <div className="mb-3">
                  <RenderFormInput
                    dbFieldName="notification_title"
                    inputType="text"
                    labelText="Notification Title"
                    placeHolder="Enter Notification Title"
                    register={register}
                    errors={errors}
                    isDisabled={loading}
                    isFieldRequired={true}
                    //   isEditable={is_view}
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2.5 block text-black dark:text-white">Notification Description</label>
                  <textarea
                    {...register('notification_description')}
                    rows={4}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    placeholder="Enter Notification Description"
                    disabled={loading}
                  ></textarea>
                </div>
                <div className="m-3 flex gap-5">
                  <button className="flex sm justify-center rounded bg-secondary p-3 font-medium text-gray mt-8" onClick={() => handleNotificationCancel()}>
                    Cancel
                  </button>
                  <button
                    className={`${loading ? 'opacity-50' : ''} flex justify-center rounded bg-primary p-3 font-medium text-gray mt-8`}
                    type="button"
                    onClick={() => handleSaveNotification()}
                    disabled={loading}
                  >
                    {loading ? <Spinner className="w-6 h-6 border-white" /> : 'Save'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h6 className="text-lg font-semibold mb-2">{title}</h6>
                <p className="text-gray-700">{desc}</p>
                <button
                  className={`${isLoading || disabled ? 'opacity-50' : ''} flex justify-center rounded bg-primary p-3 font-medium text-gray mt-8`}
                  type="submit"
                  disabled={disabled || isLoading}
                >
                  {isLoading ? <Spinner className="w-6 h-6 border-white" /> : 'Schedule and Push Notification'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
export default PushNotification;
