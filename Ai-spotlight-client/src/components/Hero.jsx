import Categories from "./Categories";
import SearchInput from "./SearchInput";

const Hero = ({pricing, setPricing, features, setFeatures,setSortBy, sort}) => {
  return (
    <section className="wrapper mt-[4rem]">
      <div className="space-y-5 flex items-center justify-center flex-col my-10">
        <h2 className="text-2xl max-md:text-sm text-center font-norma brightness-75">
          Ai Spotlights
        </h2>
        <h1 className="text-6xl  max-md:text-[2.5rem] text-center capitalize font-medium mb-50">The largest AI tools directory</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width={400} height={25} viewBox="0 0 307 34" fill="none" className="m-auto block max-sm:mr-[20%] max-md:mr-[30%] max-lg:mr-[40%] max-sm:w-40" style={{ position: 'relative', top: '-17px', zIndex: -13, right: '-44px' }}>
          {/* Define linear gradient */}
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FFD700' }}>
                <animate attributeName="stop-color" values="#FFD700;#FFA500;#FFFF00;#32CD32;#00BFFF;#8A2BE2;#FF69B4;#FFD700" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#FFD700' }}>
                <animate attributeName="stop-color" values="#FFD700;#FFA500;#FFFF00;#32CD32;#00BFFF;#8A2BE2;#FF69B4;#FFD700" dur="5s" repeatCount="indefinite" begin="5s" />
              </stop>
            </linearGradient>
          </defs>
          {/* Path using the linear gradient */}
          <path d="M303.498 26.5334C183.108 -17.8935 53.0014 10.644 2.99697 30.4662" stroke="url(#colorGradient)" strokeWidth={8} strokeLinecap="round" />
        </svg>

      </div>

      <div className="mt-5">
        <SearchInput pricing={pricing} setPricing={setPricing} features={features} setFeatures={setFeatures} setSortBy={setSortBy} sort={sort} />
        <Categories />
      </div>
    </section>
  );
};

export default Hero;
