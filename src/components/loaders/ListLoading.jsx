import React from "react";

const TaskList = () => {
  return (
    <tr className="cursor-pointer hover:bg-[#3C3E4D]">
      <td className="py-4 rounded-l-sm pl-3 sm:pl-6 w-[60px]">1</td>
      <td className="w-[400px] bg-red-400">
        <div className="flex items-center gap-3 ">
          <div className="h-[37px] w-[37px] rounded-md bg-red-400"></div>

          <div >
          lmaofg
            <p className="text-[#A6A6A6] text-xs">gdg</p>
          </div>
        </div>
      </td>
      <td className="rounded-r-sm pr-3 sm:pr-6">
        5:10
      </td>

      <td>
        <div className="flex items-center justify-center gap-3">
         
        </div>
      </td>
    </tr>
  );
};

export default TaskList;
