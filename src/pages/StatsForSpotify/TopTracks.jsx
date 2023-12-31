import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TopTracksSong from "../../components/cards/TopTracksSong";
import { PageLayout } from "../../components/layout";
import { apiRequest } from "../../utils";

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
          <TopTracksSong track={track} index={index} key={index} />
        ))}
      </tbody>
    </table>
  );
};

const TopTracks = () => {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [timeFrame, setTimeframe] = useState(TIMEFRAMES.SHORT_TERM);

  const fetchTopTracks = async () => {
    setLoading(true);
    try {
      const tracks = await apiRequest({
        url: `/me/top/tracks?time_range=${timeFrame}&limit=25`,
        authFlow: true,
      });
      setTracks(tracks?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTracks();
  }, [timeFrame]);

  return (
    <PageLayout>
      <div className="gap-3 py-14 flex flex-col items-center justify-stretch">
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
              
              <button className="bg-green-600 hover:bg-green-800 text-white w-fit mx-auto mt-2 p-4 py-2 rounded-md">Create Playlist</button>

    </PageLayout>
  );
};

export default TopTracks;
