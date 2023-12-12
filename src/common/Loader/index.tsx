const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-boxdark">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export const Spinner = (props: any) => {
  const { className } = props;
  return (
    <div className="items-center justify-center">
      <div
        className={`h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent ${className}`}
      ></div>
    </div>
  );
};

export default Loader;
