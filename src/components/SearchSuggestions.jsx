import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const SearchSuggestions = ({ searchQuery }) => {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const searchResults = await apiRequest({
          url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist,album,track`,
        });

        setSuggestions(searchResults);
        console.log(searchResults);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  return (
    <>
      {searchQuery && (
        <div className="rounded-b-lg flex mt-8 flex-col bg-[#3C3E4D] w-[365px] min-h-[400px] absolute">
          
          <div className="pt-4">
            <h1 className="text-white text-lg font-bold ml-1">Songs</h1>
            <div className="border-solid border-t border-[#777883] py-3 flex flex-col gap-1">
              {suggestions?.tracks?.items?.length > 0 ? (
                suggestions?.tracks?.items?.slice(0, 3).map((track, index) => {
                  return (
                    <div
                      className="flex items-center justify-start gap-2 ml-1 cursor-pointer"
                      key={index}
                    >
                      <img
                        className="h-[42px] w-[55px] rounded-md"
                        src={track?.album?.images[0]?.url}
                        alt="track"
                      />
                      <p className="text-white">{track?.name}</p>
                    </div>
                  );
                })
              ) : (
                <p className="text-[#fc4747] ml-1">No Matching Items Found</p>
              )}
            </div>
          </div>
          
          <div >
            <h1 className="text-white text-lg font-bold ml-1">Artists</h1>
            <div className="border-solid border-t border-[#777883] py-3 flex flex-col gap-1">
              {suggestions?.artists?.items?.length > 0 ? (
                suggestions?.artists?.items
                  ?.slice(0, 3)
                  .map((artist, index) => {
                    return (
                      <div
                        className="flex items-center justify-start gap-2 ml-1 cursor-pointer"
                        key={index}
                      >
                        <img
                          className="h-[42px] w-[55px] rounded-md"
                          src={artist?.images[0]?.url}
                          alt="artist"
                        />
                        <p className="text-white">{artist.name}</p>
                      </div>
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
                    <div
                      className="flex items-center justify-start gap-2 ml-1 cursor-pointer"
                      key={index}
                    >
                      <img
                        className="h-[42px] w-[55px] rounded-md"
                        src={album?.images[0]?.url}
                        alt="album"
                      />
                      <p className="text-white ">{album?.name}</p>
                    </div>
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
