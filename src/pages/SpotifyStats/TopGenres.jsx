import React, { useEffect, useState } from "react";
import { PageLayout } from "../../components/layout";
import { apiRequest } from "../../utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const TopGenres = () => {
  const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeframe] = useState("short_term");
  const title =
    timeFrame === "short_term"
      ? "(last 4 weeks)"
      : timeFrame === "medium_term"
      ? "(last 6 months)"
      : "(all time)";

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      try {
        const genres = await apiRequest({
          url: `/me/top/genres?time_range=${timeFrame}&limit=25`,
          authFlow: true,
        });
        console.log(genres);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTracks();
  }, [timeFrame]);

  return (
    <PageLayout>
      <div className="gap-3 py-14 flex flex-col items-center justify-stretch">
        <h1 className="text-3xl text-black dark:text-white font-bold ">
          Top Genres {title}
        </h1>
      </div>
      <div className="flex flex-col items-stretch justify-center">
        <Tabs
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <TabList
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tab
              onClick={() => setTimeframe("short_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              Last 4 weeks
            </Tab>
            <Tab
              onClick={() => setTimeframe("medium_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              Last 6 months
            </Tab>
            <Tab
              onClick={() => setTimeframe("long_term")}
              className="outline-none flex-1 border-x cursor-pointer p-2 flex items-center justify-center"
            >
              All time
            </Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TopGenres;
