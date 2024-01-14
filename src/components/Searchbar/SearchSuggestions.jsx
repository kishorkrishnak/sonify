import { useEffect, useState } from "react";
import { apiRequest } from "../../services";
import { MoonLoader } from "../loaders";
import SearchSuggestionCategory from "./SearchSuggestionCategory";

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

  return (
    <>
      {searchQuery && (
        <div className="z-10 rounded-b-lg flex mt-9 flex-col bg-[#2A2A2A] w-[365px] min-h-[400px] absolute">
          <div className="pt-4">
            {loading && <MoonLoader size={25} />}
            {error && <p className="text-[#fc4747] ml-1">{error}</p>}
            {!loading && !error && (
              <SearchSuggestionCategory
                title={"Songs"}
                items={suggestions?.tracks?.items}
                loading={loading}
              />
            )}
          </div>

          <div>
            {!loading && !error && (
              <SearchSuggestionCategory
                title={"Artists"}
                items={suggestions?.artists?.items}
                loading={loading}
              />
            )}
          </div>

          <div>
            {!loading && !error && (
              <SearchSuggestionCategory
                title={"Albums"}
                items={suggestions?.albums?.items}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSuggestions;
