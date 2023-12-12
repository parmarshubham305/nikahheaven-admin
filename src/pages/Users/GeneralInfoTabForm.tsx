import RenderSelectDropdown from '@/components/formElements/SelectDropdown';
import { drinkingData, eatingData, educationData, lookingData, maritalData, personalityData, religionData, sexualityData, smokingData } from '@/constants/dropdownData';
import { C_USERS } from '@/firebase/constants';
import useFirebaseSetDoc from '@/firebase/hooks/useFirebaseSetData';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface generalTabFormProps {
  userInfo: any;
  is_view: boolean;
}

const GeneralInfoTabForm: React.FC<generalTabFormProps> = ({ userInfo, is_view }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setDocData, loading } = useFirebaseSetDoc();
  const navigate = useNavigate();
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
      toast.success('User has been updated succesfully', {
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
            <RenderSelectDropdown
              dbFieldName="sexuality"
              register={register}
              errors={errors}
              labelText={'Sexuality'}
              options={sexualityData}
              isEditable={is_view}
              defaultValue={userInfo.sexuality}
            />
          </div>

          <div className="w-full xl:w-1/2">
            <RenderSelectDropdown
              dbFieldName="personality"
              register={register}
              errors={errors}
              labelText={'Personality'}
              options={personalityData}
              isEditable={is_view}
              defaultValue={userInfo.personality}
            />
          </div>
        </div>

        <div className="mb-4.5">
          <RenderSelectDropdown
            dbFieldName="education"
            register={register}
            errors={errors}
            labelText={'Education'}
            options={educationData}
            isEditable={is_view}
            defaultValue={userInfo.education}
          />
        </div>

        <div className="mb-4.5">
          <RenderSelectDropdown
            dbFieldName="maritalStatus"
            register={register}
            errors={errors}
            labelText={'Marital Status'}
            options={maritalData}
            isEditable={is_view}
            defaultValue={userInfo.maritalStatus}
          />
        </div>
        <div className="mb-4.5">
          <RenderSelectDropdown
            dbFieldName="lookingFor"
            register={register}
            errors={errors}
            labelText={"I'm Looking for"}
            options={lookingData}
            isEditable={is_view}
            defaultValue={userInfo.lookingFor}
          />
        </div>
        <div className="mb-4.5">
          <RenderSelectDropdown
            dbFieldName="religion"
            register={register}
            errors={errors}
            labelText={'Religion'}
            options={religionData}
            isEditable={is_view}
            defaultValue={userInfo.religion}
          />
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="dringkingStatus"
              register={register}
              errors={errors}
              labelText={'Drinking'}
              options={drinkingData}
              isEditable={is_view}
              defaultValue={userInfo.dringkingStatus}
            />
          </div>
          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="smokingStatus"
              register={register}
              errors={errors}
              labelText={'Smoking'}
              options={smokingData}
              isEditable={is_view}
              defaultValue={userInfo.smokingStatus}
            />
          </div>

          <div className="w-full xl:w-1/3">
            <RenderSelectDropdown
              dbFieldName="eatingStatus"
              register={register}
              errors={errors}
              labelText={'Eating'}
              options={eatingData}
              isEditable={is_view}
              defaultValue={userInfo.eatingStatus}
            />
          </div>
        </div>
        <button disabled={is_view || loading} className={`${is_view ? 'opacity-50' : ''} flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-8`}>
          {loading ? 'Submitting...' : 'Save Chnages'}
        </button>
      </div>
    </form>
  );
};

export default GeneralInfoTabForm;
