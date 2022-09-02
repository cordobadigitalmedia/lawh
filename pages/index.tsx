import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lawh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-[#E9D8BE] h-screen p-2">
        <div className="flex bg-[url('/lawh.png')] bg-contain bg-no-repeat bg-center h-full"></div>
      </div>
    </div>
  );
};

export default Home;
