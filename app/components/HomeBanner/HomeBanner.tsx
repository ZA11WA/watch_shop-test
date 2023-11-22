import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="rounded-2xl relative bg-gradient-to-r from-slate-500 via-slate-300 to-emerald-300 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Tylko dzisiaj 3 zegarki w cenie 2
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Sprawdź naszą lisę zegarków poniżej!
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
            GET 25% OFF </p>
        </div>
        <div className=" w-1/3 relative aspect-video"> </div>
        <Image className="rotate-45" src={"/watch_banner1.png"} alt="baner_photo" width={150} height={150}/>
      </div>
    </div>
  );
};

export default HomeBanner;
