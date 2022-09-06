import React, { useState, useEffect, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  LanguageIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

interface TextOptions {
  main: string;
  none?: string;
  eng?: string;
  fre?: string;
}

const audioRoot = ".s3.eu-central-1.amazonaws.com/";

export function MediaText({
  text,
  audioSrc = "01.mp3",
  totalPages = 0,
  setPageNo,
  path,
  translation,
}: {
  text: TextOptions;
  audioSrc?: string;
  totalPages: number;
  setPageNo: Function;
  path: string;
  translation: "none" | "eng" | "fre";
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showText, setShowText] = useState(true);
  const isReady = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio(`https://${path}${audioRoot}${path}_${audioSrc}`)
      : undefined
  );
  useEffect(() => {
    audioRef.current?.load();
    audioRef.current = new Audio(
      `https://${path}${audioRoot}${path}_${audioSrc}`
    );
    if (isPlaying) {
      audioRef.current?.play();
      startTimer();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioSrc]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        setIsPlaying(false);
      }
    }, 1000);
  };

  const decreasePage = () => {
    let page = currentPage;
    if (page > 0) {
      page--;
      setCurrentPage(page);
      setPageNo(page);
    }
  };
  const increasePage = () => {
    let page = currentPage;
    if (page >= 0 && page < totalPages - 1) {
      page++;
      setCurrentPage(page);
      setPageNo(page);
    }
  };

  return (
    <div className="group cursor-pointer">
      <div className="border-slate-300 group-hover:border group-active:border dark:border-slate-500 rounded-t-xl p-4 pb-6">
        <div
          className={`${
            showText ? `visible` : `invisible`
          } flex w-full text-white ${
            showTranslation ? `text-xl` : `text-2xl font-naskh`
          } leading-relaxed text-center`}
        >
          {showTranslation ? text[translation] : text.main}
        </div>
      </div>
      <div className="block group-hover:hidden group-active:hidden text-slate-300 flex flex-col items-center">
        Hover or click for options
      </div>
      <div className="invisible group-hover:visible group-active:visible bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex flex-col items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Previous Page"
            onClick={() => decreasePage()}
          >
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-black" />
          </button>
          {translation !== "none" && (
            <button
              type="button"
              className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
              aria-label="Show Translation"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              <LanguageIcon className="h-6 w-6 cursor-pointer text-black" />
            </button>
          )}
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6 cursor-pointer text-black" />
            ) : (
              <PlayIcon className="h-6 w-6 cursor-pointer text-black" />
            )}
          </button>
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Hide"
            onClick={() => setShowText(!showText)}
          >
            <EyeSlashIcon className="h-6 w-6 cursor-pointer text-black" />
          </button>
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Hide"
            onClick={() => increasePage()}
          >
            <ArrowRightIcon className="h-6 w-6 cursor-pointer text-black" />
          </button>
        </div>
        <div className="items-center justify-evenly text-black flex">
          {`${currentPage + 1}`} of {`${totalPages}`}
        </div>
      </div>
    </div>
  );
}
