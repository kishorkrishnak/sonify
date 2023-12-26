import { useEffect, useState } from "react";
import { apiRequest } from "../../../utils";
import SearchResult from "./SearchResult";

const SearchSuggestions = ({ searchQuery }) => {
  const [suggestions, setSuggestions] = useState(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const searchResults = await apiRequest({
          url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist,album,track`,
        });

        setSuggestions(searchResults);
       } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  return (
    <>
      {searchQuery && (
        <div className="z-10 rounded-b-lg flex mt-9 flex-col bg-[#2A2A2A] w-[365px] min-h-[400px] absolute">
          <div className="pt-4">
            <h1 className="text-white text-lg font-bold ml-1">Songs</h1>
            <div className="border-solid border-t border-[#777883] py-3 flex flex-col gap-1">
              {suggestions?.tracks?.items?.length > 0 ? (
                suggestions?.tracks?.items?.slice(0, 3).map((track, index) => {
                  return (
                    <SearchResult
                      name={track?.name}
                      key={index}
                      imageSrc={track?.album?.images[0]?.url}
                    ></SearchResult>
                  );
                })
              ) : (
                <p className="text-[#fc4747] ml-1">No Matching Items Found</p>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-white text-lg font-bold ml-1">Artists</h1>
            <div className="border-solid border-t border-[#777883] py-3 flex flex-col gap-1">
              {suggestions?.artists?.items?.length > 0 ? (
                suggestions?.artists?.items
                  ?.slice(0, 3)
                  .map((artist, index) => {
                    return (
                      <SearchResult
                        name={artist?.name}
                        key={index}
                        imageSrc={artist?.images[0]?.url}
                      ></SearchResult>
                    );
                  })
              ) : (
                <p className="text-[#fc4747] ml-1">No Matching Items Found</p>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-white text-lg font-bold ml-1">Albums</h1>
            <div className="border-solid border-t border-[#777883] py-3 flex flex-col gap-1">
              {suggestions?.albums?.items?.length > 0 ? (
                suggestions?.albums?.items?.slice(0, 3).map((album, index) => {
                  return (
                    <SearchResult
                      data={album}
                      key={index}
                      imageSrc={album?.images[0]?.url}
                    ></SearchResult>
                  );
                })
              ) : (
                <p className="text-[#fc4747] ml-1">No Matching Items Found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSuggestions;
