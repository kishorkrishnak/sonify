import SearchResult from "./SearchResult";
import { v4 as uuidv4 } from "uuid";

const SearchSuggestionCategory = ({ title, items, loading }) => {
  return (
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
};

export default SearchSuggestionCategory;
