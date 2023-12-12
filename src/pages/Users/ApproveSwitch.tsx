import React from 'react';
interface approveSwitchProps {
  approve: boolean;
  loading: boolean;
  setApprove: any;
}

const ApproveSwitch: React.FC<approveSwitchProps> = ({ approve, setApprove, loading }) => {
  return (
    <li>
      <label className={`relative m-0 block h-7.5 w-14 rounded-full ${approve ? 'bg-primary' : 'bg-black/30 dark:bg-bodydark'}`}>
        <input disabled={loading} type="checkbox" onChange={() => setApprove(!approve)} className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0" />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            approve && '!right-[3px] !translate-x-full'
          }`}
        ></span>
      </label>
    </li>
  );
};

export default ApproveSwitch;
