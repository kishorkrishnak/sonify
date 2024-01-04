import React from "react";
import { PageLayout } from "../components/layout";

const Artists = () => {
  return (
    <PageLayout>
      <h1 className="text-white text-3xl ml-6 font-bold">Your Artists</h1>
      <div className="flex flex-col justify-start items-center gap-2 min-h-[50vh] w-full"></div>
    </PageLayout>
  );
};

export default Artists;
