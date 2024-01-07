import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../../../services";

import SearchResult from "./SearchResult";
import { Loader } from "../../misc";

const SearchSuggestions = ({ searchQuery }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const searchResults = await apiRequest({
          url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist,album,track`,
        });

        setSuggestions(searchResults);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const renderCategory = (title, items) => (
    <div>
      <h1 className="text-white text-lg font-bold ml-1 mt-2">{title}</h1>
      <div className="py-3 flex flex-col gap-1">
        {items?.length > 0 ? (
          items
            .slice(0, 3)
            .map((item) => (
              <SearchResult
                loading={loading}
                data={item}
                key={uuidv4()}
                imageSrc={item?.images?.[0]?.url || item?.album?.images[0]?.url}
              />
            ))
        ) : (
          <p className="text-[#fc4747] ml-1">No Matching Items Found</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      {searchQuery && (
        <div className="z-10 rounded-b-lg flex mt-9 flex-col bg-[#2A2A2A] w-[365px] min-h-[400px] absolute">
          <div className="pt-4">
            {loading && <Loader size={25} />}
            {error && <p className="text-[#fc4747] ml-1">{error}</p>}
            {!loading &&
              !error &&
              renderCategory("Songs", suggestions?.tracks?.items)}
          </div>

          <div>
            {!loading &&
              !error &&
              renderCategory("Artists", suggestions?.artists?.items)}
          </div>

          <div>
            {!loading &&
              !error &&
              renderCategory("Albums", suggestions?.albums?.items)}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSuggestions;
