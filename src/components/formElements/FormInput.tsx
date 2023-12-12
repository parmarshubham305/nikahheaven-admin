import { ErrorMessage } from '@hookform/error-message';

interface renderFormInputProps {
  labelText: string;
  inputType: string;
  placeHolder: string;
  defaultValue?: string | Date;
  dbFieldName: string;
  register: any;
  errors: any;
  isDisabled?: boolean;
  isFieldRequired?: boolean | string;
  isEditable?: boolean;
}

const RenderFormInput: React.FC<renderFormInputProps> = ({
  isDisabled = false,
  isFieldRequired = false,
  labelText,
  inputType,
  placeHolder,
  defaultValue,
  register,
  dbFieldName,
  errors,
  isEditable = false,
}) => {
  return (
    <>
      <label className="mb-2.5 block text-black dark:text-white">{labelText}</label>
      <input
        type={inputType}
        placeholder={isEditable ? '' : placeHolder}
        defaultValue={defaultValue}
        disabled={isDisabled || isEditable}
        {...register(dbFieldName, { required: isFieldRequired })}
        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
          isDisabled || isEditable ? 'cursor-not-allowed opacity-70' : ''
        }`}
      />
      {/* {errors[dbFieldName] && <span className="text-danger  font-normal dark:font-medium">This field is required</span>} */}
      <ErrorMessage
        errors={errors}
        name={dbFieldName}
        render={({ message }: any) => (
          <p className="text-rose-400" style={{ color: 'rgb(251 113 133)' }}>
            {message}
          </p>
        )}
      />
    </>
  );
};

export default RenderFormInput;
