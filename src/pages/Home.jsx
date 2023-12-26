import axios from "axios";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/layout";
import FeaturedArtists from "../components/sections/FeaturedArtists";
import Login from "../components/sections/Login";
import Player from "../components/sections/Player";
import TopSongs from "../components/sections/TopSongs";
import TrendingAlbums from "../components/sections/TrendingAlbums";

const Home = ({setPlayingTrack,playingTrack}) => {

  return (
    <PageLayout>
     
      <TrendingAlbums></TrendingAlbums>
      <TopSongs playingTrack={playingTrack} setPlayingTrack={setPlayingTrack}></TopSongs>
      <TrendingAlbums></TrendingAlbums>
      <TrendingAlbums></TrendingAlbums>

      <FeaturedArtists></FeaturedArtists>
    </PageLayout>
  );
};

export default Home;
