import React from 'react';
import RenderFormInput from '@/components/formElements/FormInput';
import RenderSelectDropdown from '@/components/formElements/SelectDropdown';
import { genderData, heightData, bodyTypeData } from '@/constants/dropdownData';
import { FieldValues, useForm } from 'react-hook-form';
import useFirebaseSetDoc from '@/firebase/hooks/useFirebaseSetData';
import { C_USERS } from '@/firebase/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface profileTabFormProps {
  userInfo: any;
  is_view: boolean;
}

const ProfileTabForm: React.FC<profileTabFormProps> = ({ userInfo, is_view }) => {
  const navigate = useNavigate();
  const { setDocData, loading } = useFirebaseSetDoc();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: userInfo?.email,
      name: userInfo?.name ?? '',
      phone_number: userInfo?.phone_number ?? '',
      username: userInfo?.username ?? '',
    },
  });

  const onSubmit = async (payload: FieldValues) => {
    const updatedPayload = { ...userInfo, ...payload };
    const res: any = await setDocData(updatedPayload, C_USERS, userInfo?.uid);
    if (res?.uid) {
      toast.success('User has been updated succesfully', {
        position: 'top-right',
        autoClose: 5000,
        type: 'success',
      });
      navigate('/users');
    } else {
      toast.success("Something wen't wrong", {
        position: 'top-right',
        autoClose: 5000,
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-3">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <RenderFormInput
              dbFieldName="username"
              inputType="text"
              labelText="Username"
              placeHolder="Enter your username"
              register={register}
              errors={errors}
              isDisabled={true}
              isEditable={is_view}
            />
          </div>

          <div className="w-full xl:w-1/2">
            <RenderFormInput
              dbFieldName="name"
              inputType="text"
              labelText="Full Name"
              placeHolder="Enter your full name"
              register={register}
              errors={errors}
              isEditable={is_view}
            />
          </div>
        </div>

        <div className="mb-4.5">
          <RenderFormInput
            dbFieldName="email"
            inputType="email"
            labelText="Email"
            placeHolder="Enter your email address"
            register={register}
            errors={errors}
            isDisabled={true}
            isEditable={is_view}
          />
        </div>

        <div className="mb-4.5">
          <RenderFormInput
            dbFieldName="phone_number"
            inputType="number"
            labelText="Phone Number"
            placeHolder="Enter your phone number"
            register={register}
            errors={errors}
            isDisabled={true}
            isEditable={is_view}
          />
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="gender"
              register={register}
              errors={errors}
              labelText={'Gender'}
              options={genderData}
              defaultValue={userInfo?.gender}
              isEditable={is_view}
            />
          </div>

          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="height"
              register={register}
              errors={errors}
              labelText={'Height'}
              options={heightData}
              defaultValue={userInfo?.height}
              isEditable={is_view}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="bodyType"
              register={register}
              errors={errors}
              labelText={'Body Type'}
              options={bodyTypeData}
              defaultValue={userInfo?.bodyType}
              isEditable={is_view}
            />
          </div>
        </div>
        <button disabled={is_view || loading} className={`${is_view ? 'opacity-50' : ''} flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-8`}>
          {loading ? 'Submitting...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileTabForm;
