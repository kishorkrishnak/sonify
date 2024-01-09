import { TableSong } from "../cards";
import { CiClock2 } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";

const SongsTable = ({ songs, showHead }) => {
  console.log(songs);
  return (
    <table className="text-black dark:text-white">
      {showHead && (
        <thead className="border-b border-[grey] ">
          <tr>
            <td className="pl-3 text-[grey] pb-[2px]">#</td>
            <td className="text-[grey]">Title</td>
            <td className="pr-3 sm:pr-6 text-[grey]">
              {" "}
              <CiClock2 color="grey" />
            </td>
            <td></td>
          </tr>
        </thead>
      )}
      <tbody>
        {songs?.map((track, index) => {
          return (
            <TableSong track={track} index={index} key={uuidv4()}></TableSong>
          );
        })}
      </tbody>
    </table>
  );
};

export default SongsTable;
