import { RiArrowDownSLine } from 'react-icons/ri';

interface renderSelectDropdownProps {
  options: any;
  labelText: string;
  defaultValue?: string;
  dbFieldName: string;
  register: any;
  errors: any;
  isEditable?: boolean;
}

const RenderSelectDropdown: React.FC<renderSelectDropdownProps> = ({ isEditable = false, labelText, options, defaultValue, dbFieldName, register, errors }) => {
  return (
    <>
      <label className="mb-2.5 block text-black dark:text-white">{labelText}</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          disabled={isEditable}
          defaultValue={defaultValue}
          {...register(dbFieldName, { required: true })}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          {options.map((item: any, index: any) => {
            return (
              <option key={index} value={item?.title || item?.value}>
                {item.title ||  item?.label}
              </option>
            );
          })}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <RiArrowDownSLine />
        </span>
      </div>
      {errors[dbFieldName] && <span className="text-danger  font-normal dark:font-medium">This field is required</span>}
    </>
  );
};
export default RenderSelectDropdown;
