import React, { useState, useEffect, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  LanguageIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

interface TextOptions {
  main: string;
  translation: string;
}

const audioRoot =
  "https://hizb-al-bahr.s3.eu-central-1.amazonaws.com/Hizb_Al+Bahr_";

export function MediaText({
  text,
  audioSrc = "01.mp3",
}: {
  text: TextOptions;
  audioSrc?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showText, setShowText] = useState(true);
  const isReady = useRef(false);
  const intervalRef = useRef<NodeJS.Timer>();
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio(`${audioRoot}${audioSrc}`)
      : undefined
  );
  useEffect(() => {
    audioRef.current?.load();
    audioRef.current = new Audio(`${audioRoot}${audioSrc}`);
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

  return (
    <div className="group cursor-pointer">
      <div className="border-slate-300 group-hover:border group-active:border dark:border-slate-500 rounded-t-xl p-4 pb-6">
        <div
          className={`${
            showText ? `visible` : `invisible`
          } flex w-full text-white ${
            showTranslation ? `text-l` : `text-2xl`
          } leading-relaxed text-center`}
        >
          {showTranslation ? text.translation : text.main}
        </div>
      </div>
      <div className="invisible group-hover:visible group-active:block bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-14 h-14 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Show Translation"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <LanguageIcon className="h-7 w-7 cursor-pointer text-black" />
          </button>
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-14 h-14 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseIcon className="h-7 w-7 cursor-pointer text-black" />
            ) : (
              <PlayIcon className="h-7 w-7 cursor-pointer text-black" />
            )}
          </button>
          <button
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 m-2 flex-none w-14 h-14 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Hide"
            onClick={() => setShowText(!showText)}
          >
            <EyeSlashIcon className="h-7 w-7 cursor-pointer text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
