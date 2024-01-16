import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAppContext } from "../../App";
import PageLayout from "../../components/PageLayout/PageLayout";
import { apiRequest } from "../../services";
const TopGenres = () => {
  Chart.register(...registerables);
  const [timeFrame, setTimeframe] = useState("short_term");
  const [chartData, setChartData] = useState(null);
  const { loadingRef } = useAppContext();
  const title =
    timeFrame === "short_term"
      ? "(last 4 weeks)"
      : timeFrame === "medium_term"
      ? "(last 6 months)"
      : "(all time)";

  const fetchTopArtists = async () => {
    loadingRef.current?.continuousStart();
    setChartData(null);
    try {
      const response = await apiRequest({
        url: `/me/top/artists?time_range=${timeFrame}&limit=50`,
        authFlow: true,
      });
      const genreCounts = {};

      for (const artist of response?.items) {
        const artistGenres = artist.genres;

        artistGenres.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      }
      const genreCountsArray = Object.entries(genreCounts);
      genreCountsArray.sort((a, b) => b[1] - a[1]);
      const sortedGenreCounts = Object.fromEntries(
        genreCountsArray.slice(0, 10)
      );
      const sortedGenresArray = Object.keys(sortedGenreCounts);
      const indexedGenresArray = sortedGenresArray.map(
        (genre, index) => `${index + 1}. ${genre}`
      );

      const chartData = {
        labels: indexedGenresArray,
        datasets: [
          {
            borderRadius: 5,
            label: "Top Genres",
            data: indexedGenresArray.map(
              (indexedGenre) => sortedGenreCounts[indexedGenre.split(". ")[1]]
            ),
            backgroundColor: "#3C3E4D",
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    } finally {
      loadingRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchTopArtists();
  }, [timeFrame]);

  const chartOptions = {
    maintainAspectRatio: false,
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          beginAtZero: true,
          color: "white",
          font: {
            size: 16,
          },
        },
      },
    },
  };
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

          <TabPanel className="w-[90%]">
            {" "}
            <div className="w-full h-[600px]">
              {" "}
              {chartData && <Bar data={chartData} options={chartOptions} />}
            </div>
          </TabPanel>

          <TabPanel className="w-[90%]">
            <div className="w-full h-[500px]">
              {" "}
              {chartData && <Bar data={chartData} options={chartOptions} />}
            </div>
          </TabPanel>

          <TabPanel className="w-[90%]">
            <div className="w-full h-[500px]">
              {" "}
              {chartData && <Bar data={chartData} options={chartOptions} />}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TopGenres;
