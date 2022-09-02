import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lawh Tablet</title>
        <link rel="icon" href="/lawh.ico" />
      </Head>
      <div className="flex flex-col bg-[#E9D8BE] h-screen p-2">
        <div className="flex bg-[url('/lawh.png')] bg-contain bg-no-repeat bg-center h-full"></div>
      </div>
    </div>
  );
};

export default Home;
