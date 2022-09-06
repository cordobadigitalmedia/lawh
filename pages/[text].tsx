import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { MediaText } from "../components/MediaText";

interface ParamsOptions {
  text: string;
}

interface HomeProps {
  page: { title: string; translation: "none" | "eng" | "fre"; text: [] };
}

const Page: React.FC<HomeProps> = (page: HomeProps) => {
  const router = useRouter();
  const { text } = router.query;
  const pageData = page.page;
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
      {page && "page" in page && text && (
        <div className="flex flex-col bg-[#E9D8BE] h-screen p-2">
          <div className="flex bg-[url('/lawh.png')] bg-scroll bg-contain bg-no-repeat bg-center h-full place-content-center">
            <div className="flex flex-col w-[300px] largemobile:w-[22rem] desktop:w-[300px] p-5 items-center justify-center">
              <div className="text-white text-3xl font-naskh">
                {pageData.title}
              </div>
              <MediaText
                text={pageData.text[currentPage]}
                audioSrc={setSrcFromPage(currentPage)}
                setPageNo={updatePage}
                totalPages={pageData.text.length}
                path={text.toString()}
                translation={pageData.translation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { text: "hizbalbahar" } },
      { params: { text: "alwadhifa" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }: { params: ParamsOptions }) {
  if (params.text) {
    const res = await fetch(`https://lawh-data.vercel.app/${params.text}.json`);
    const data = await res.json();
    return {
      // Passed to the page component as props
      props: { page: data },
    };
  }
}

export default Page;
