import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PageLayout from "../../components/PageLayout/PageLayout";

import ArtistsGrid from "../../components/sections/ArtistsGrid";
import { apiRequest } from "../../services";
import { useAppContext } from "../../App";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const { loadingRef } = useAppContext();
  const [timeFrame, setTimeframe] = useState("short_term");
  const title =
    timeFrame === "short_term"
      ? "(last 4 weeks)"
      : timeFrame === "medium_term"
      ? "(last 6 months)"
      : "(all time)";

  useEffect(() => {
    const fetchTopArtists = async () => {
      setArtists(null)
      loadingRef.current?.continuousStart();

      try {
        const response = await apiRequest({
          url: `/me/top/artists?time_range=${timeFrame}`,
          authFlow: true,
        });
        const artists = response?.items?.map((item, index) => ({
          ...item,
          name: `${index + 1}. ${item.name}`,
        }));
        setArtists(artists);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();
      }
    };
    fetchTopArtists();
  }, [timeFrame]);

  return (
    <>
      <div className="gap-3 py-14 flex flex-col items-center justify-stretch">
        <h1 className="text-3xl text-black dark:text-white font-bold ">
          Top Artists {title}
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

          <TabPanel className="w-[90%]">
            <div className="mt-4">
              <ArtistsGrid artists={artists} />
            </div>
          </TabPanel>
          <TabPanel className="w-[90%]">
            <ArtistsGrid artists={artists} />
          </TabPanel>
          <TabPanel className="w-[90%]">
            <ArtistsGrid artists={artists} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TopArtists;
