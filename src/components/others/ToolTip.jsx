const ToolTip = ({ children, tip }) => {
  return (
    <div className="group flex relative">
      {children}
      <span
        className="flex items-center justify-center group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 
-translate-x-1/2 translate-y-full opacity-0 m-3 mx-auto w-[150px]"
      >
        {tip}
      </span>
    </div>
  );
};

export default ToolTip;
