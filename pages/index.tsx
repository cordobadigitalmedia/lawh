import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { MediaText } from "../components/MediaText";
import { PageNav } from "../components/PageNav";
import hizbalbahr from "../data/hizbalbahar.json";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const updatePage = (no: number) => {
    setCurrentPage(no);
  };
  const setSrcFromPage = (no: number) => {
    let src = "";
    if (no < 9) {
      src = `0${no + 1}.mp3`;
    } else {
      src = `${no + 1}.mp3`;
    }
    return src;
  };
  return (
    <div>
      <Head>
        <title>Lawh Tablet</title>
        <link rel="icon" href="/lawh.ico" />
      </Head>
      <div className="flex flex-col bg-[#E9D8BE] h-screen p-2">
        <div className="flex bg-[url('/lawh.png')] bg-scroll bg-contain bg-no-repeat bg-center h-full place-content-center">
          <div className="flex flex-col w-[300px] largemobile:w-[22rem] desktop:w-[300px] p-5 items-center justify-center">
            <div className="text-white text-3xl font-naskh">
              {hizbalbahr.title}
            </div>
            <MediaText
              text={hizbalbahr.text[currentPage]}
              audioSrc={setSrcFromPage(currentPage)}
              setPageNo={updatePage}
              totalPages={hizbalbahr.text.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
