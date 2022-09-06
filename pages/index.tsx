import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Lawh Tablet</title>
        <link rel="icon" href="/lawh.ico" />
      </Head>
      <div className="flex flex-col bg-slate-300 h-screen p-2">
        <div className="flex bg-[url('/lawh.png')] bg-scroll bg-contain bg-no-repeat bg-center h-full place-content-center">
          <div className="flex flex-col w-[300px] largemobile:w-[22rem] desktop:w-[300px] p-5 items-center justify-center">
            <div className="text-white text-3xl font-naskh mb-3">
              <Link href="/hizbalbahar">
                <a>حِزْبُ الْبَحْرِ</a>
              </Link>
            </div>
            <div className="text-white text-3xl font-naskh mb-3">
              <Link href="/alwadhifa">
                <a>الوظيفة</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
