import { v4 as uuidv4 } from "uuid";
import PageLayout from "../../components/PageLayout/PageLayout";
import { Album } from "../../components/cards";

const AlbumsLibrary = ({ title, albums }) => {
  return (
    <PageLayout>
      <h1 className="text-white text-2xl ml-6 font-bold">{title}</h1>
      <div className="grid grid-cols-2 justify-items-center pt-5 px-3 sm:px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-10">
        {albums &&
          albums.map((album) => <Album album={album} key={uuidv4()} />)}
      </div>
    </PageLayout>
  );
};

export default AlbumsLibrary;
