import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";

import { apiRequest } from "../../services";
import TopTracksSong from "./TopTracksSong";

const TIMEFRAMES = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
};

const TAB_TITLES = {
  [TIMEFRAMES.SHORT_TERM]: "Last 4 weeks",
  [TIMEFRAMES.MEDIUM_TERM]: "Last 6 months",
  [TIMEFRAMES.LONG_TERM]: "All time",
};

const TopTracksSongList = ({ tracks }) => {
  return (
    <table className="text-black dark:text-white mt-2 w-[100%]">
      <tbody className="w-[100%]">
        {tracks?.map((track, index) => (
          <TopTracksSong track={track} index={index} key={uuidv4} />
        ))}
      </tbody>
    </table>
  );
};

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [timeFrame, setTimeframe] = useState(TIMEFRAMES.SHORT_TERM);
  const { loadingRef } = useAppContext();

  const fetchTopTracks = async () => {
    loadingRef.current?.continuousStart();

    try {
      const tracks = await apiRequest({
        url: `/me/top/tracks?time_range=${timeFrame}&limit=25`,
        authFlow: true,
      });
      setTracks(tracks?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchTopTracks();
  }, [timeFrame]);

  return (
    <>
      <div className="gap-3 py-14 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-black dark:text-white font-bold ">
          Top Tracks {`(${TAB_TITLES[timeFrame]})`}
        </h1>
      </div>
      <div className="flex flex-col items-stretch justify-center">
        <Tabs
          className={"flex justify-center flex-col items-center text-white"}
        >
          <TabList
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {Object.entries(TAB_TITLES).map(([timeframeKey, title]) => (
              <Tab
                key={timeframeKey}
                onClick={() => setTimeframe(timeframeKey)}
                className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
              >
                {title}
              </Tab>
            ))}
          </TabList>
          <TabPanel className="w-[90%]">
            <TopTracksSongList tracks={tracks} />
          </TabPanel>
          <TabPanel className="w-[90%]">
            <TopTracksSongList tracks={tracks} />
          </TabPanel>
          <TabPanel className="w-[90%]">
            <TopTracksSongList tracks={tracks} />
          </TabPanel>
        </Tabs>
      </div>

      <button className="bg-green-600 hover:bg-green-800 text-white w-fit mx-auto mt-3 p-4 py-2 rounded-md">
        Create Playlist
      </button>
    </>
  );
};

export default TopTracks;
