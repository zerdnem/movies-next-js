import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { HeartIcon, PlayIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import Header from "../../../components/Header";
import { useState } from "react";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(
    `https://yts.torrentbay.to/api/v2/movie_details.json?movie_id=${id}`
  );
  const json = await res.json();
  const movie = json.data.movie;
  return {
    props: {
      movie,
    },
  };
};

export default function Movie({ movie }) {
  const [showPlayer, setShowPlayer] = useState(false);
  function handleClick(magnet) {
    setShowPlayer(true);
    window.webtor = window.webtor || [];
    window.webtor.push({
      id: "player",
      magnet: `magnet:?xt=urn:btih:${magnet}`,
    });
  }
  return (
    <div className="relative">
      <Head>
        <title>{movie.title}</title>
        <meta name="description" content={movie.description_full} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("webtor loaded");
        }}
      />
      <Header />
      <section className="relative z-50">
        <div className="relative min-h-[calc(100vh-72px)]">
          <Image
            src={movie.background_image_original}
            alt="poster"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
          <div className="flex items-center space-x-3 md:space-x-5">
            <Image
              src={movie.large_cover_image}
              width={300}
              height={400}
              alt="poster"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {movie.title}
            </h1>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5">
            <button
              className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => handleClick(movie.torrents[1].hash)}
            >
              <PlayIcon className="h-6 md:h-8" />
              <span className="uppercase font-medium tracking-wide">Watch</span>
            </button>

            <button
              className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => setShowPlayer(true)}
            >
              <PlayIcon className="h-6 md:h-8" />
              <span className="uppercase font-medium tracking-wide">
                Trailer
              </span>
            </button>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <PlusIcon className="h-6" />
            </div>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <HeartIcon className="h-6" />
            </div>
          </div>

          <p className="text-xs md:text-sm">
            {movie.year} • {movie.genres.map((genre) => genre + " ")}
          </p>
          <h4 className="text-sm md:text-lg max-w-4xl">
            {movie.description_full}
          </h4>
        </div>

        {showPlayer && (
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
        )}

        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? "opacity-100 z-50" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold"> {movie.title}</span>
            <div className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]">
              <XIcon className="h-5" />
            </div>
          </div>
          <div className="relative">
            <div id="player" className="webtor" />
          </div>
        </div>
      </section>
    </div>
  );
}
