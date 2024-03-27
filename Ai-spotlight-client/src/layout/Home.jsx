import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import Tools from "../components/Tools";
import { FaFilter } from "react-icons/fa";
import { ImFilter } from "react-icons/im";
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "../../public/category.json";
import FeaturedTools from "../components/FeaturedTools";
import ToolsFilter from "../components/HomeFilter";
import SortTools from "../components/SortTools";
import { MdGridOn } from "react-icons/md";
import { CiGrid2H } from "react-icons/ci";
import clsx from "clsx";


const Home = () => {
  const [tools, setTools] = useState([]);
  const [status, setStatus] = useState(0);
  const [sort, setSortBy] = useState(null);
  const [pricing, setPricing] = useState([]);
  const [features, setFeatures] = useState([]);
  // const [grid, setGrid] = useState('');
  const [f_option, setFilterState] = useState();
  const { pathname } = useLocation();
  const [response, setResponse] = useState(true);
  const [isFilterClicked, setIsFilterClicked] = useState(false); // New state
  const [isGridClicked, setIsGridClicked] = useState(false); // New state

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  let url = `http://localhost:6060/api/v1/tools/get/filter`;

  useEffect(() => {
    const filterValue =
      Number(pricing?.length) +
      Number(features?.length) +
      Number(sort == null ? 0 : sort?.length);
    setFilterState(filterValue);

    if (!tools?.length) setResponse(true);
    url = `${url}${pricing
      .map((f, index) => `${index > 0 ? "&" : "?"}${f.toLowerCase()}=true`)
      .join("")}${features
        .map(
          (f, index) =>
            `${pricing.length > 0 || index > 0 ? "&" : "?"}${f.toLowerCase()}=true`
        )
        .join("")}${`${pricing.length > 0 || features.length > 0 ? "&" : "?"}sort=${sort}`}`;

    axios.get(url).then((res) => {
      if (pricing.length || features.length || sort?.length) {
        setTools(res?.data?.tools);
      }
      setResponse(false);
    });
  }, [status, features, pricing, sort, pathname]);

  console.log('sort', f_option);

  const handleFilterClick = () => {
    setIsFilterClicked(!isFilterClicked);
  };

  const handleGridClick = () => {
    setIsGridClicked(!isGridClicked);
  };

  return (
    <main>
      <Helmet>
        <title>Ai Spotlights - The Largest Ai Tools Directory</title>
        <meta name="description" content='Ai Spotlights is the largest Ai Tools Directory.A free site to help you find the best AI tools and software to make your work and life more efficient and productive. Updated daily, join millions of followers of our website, newsletter and YouTube.' />
      </Helmet>

      <div className="home-hero-blue-bulb" style={{/* Styles remain unchanged */ }} />

      <Hero pricing={pricing} setPricing={setPricing} features={features} setFeatures={setFeatures} setSortBy={setSortBy} sort={sort} />

      <section className="wrapper relative block ">
        <div className="-z-10">
          {/* buttons below */}
          <div className="my-10 mt-1 flex items-center justify-between gap-0 card-align z-50">
            
            {/* test button */}
            {/* changed here start */}
            <button onClick={() => setIsFilterClicked(!isFilterClicked)}
              className=" bg-cyprus/95 toolscard dark:toolscard1 text-white dark:text-black flex items-center gap-2 font-semibold px-4 py-3 text-[17px] my-5 rounded-[12px] hover:drop-shadow-xl transition-all border-[1px] border-gray-300 max-sm:text-[15px]"
            >
              <ImFilter className="text-white dark:text-gray-700 text-[15px]" /> Filters
            </button>
 {/* changed here end */}

            <div className="flex gap-2 items-center">
               {/* changed here start */}
              <button
                onClick={handleGridClick}
                className="bg-white bg-cyprus/95 toolscard dark:toolscard1 max-sm:hidden text-white dark:text-black flex items-center justify-center gap-1 font-semibold px-4 py-3 text-[17px]   my-5 rounded-[12px] hover:drop-shadow-xl transition-all border-[1px] border-gray-300 max-sm:text-[12px]"
              >
                {isGridClicked ? (<CiGrid2H className="font-900 text-[20px]" />) : (<MdGridOn className="font-bold text-[15px]" />)}View
              </button>
               {/* changed here end */}
              <SortTools sort={sort} setSortBy={setSortBy} />
            </div>
          </div>

          {/* contents below */}
          <div className={`${isFilterClicked ? "-mt-[5rem] w-full card-align transition-opacity -z-50 duration-1000 ease-in-out max-sm:-mt-[3rem]" : "-mt-[3rem]"}`}>
            <div className={`${isFilterClicked ? "flex justify-between max-sm:block" : "visible"}`}>

              {/* filter bar here */}
              <div className={`relative ${isFilterClicked ? "w-[25%] max-sm:w-[100%]" : "w-full"}`}>
                <div className={`ease-linear duration-300  max-sm:w-[100%]  max-sm:relative flex gap-5  mt-12
               ${isFilterClicked ? "mt-12 left-0 relative" : "-left-[150%] max-sm:-left-[150%] absolute"}`}
                >
                  <ToolsFilter setFeatures={setFeatures} features={features} setPricing={setPricing} pricing={pricing} setIsFilterClicked={setIsFilterClicked} isFilterClicked={isFilterClicked}  />
                </div>
              </div>

              {/* cards is in here */}
              <div className={`w-full ease-linear duration-200  mt-6 card-align ${isFilterClicked ? "md:w-[75%]" : "md:w-full w-full"}`}>
                {f_option === 0 && <FeaturedTools title={'Featured tools'} gridChecked={isGridClicked} isFilterClicked={isFilterClicked} />}
                <Tools gridChecked={isGridClicked} tools={tools} f_option={f_option} response={response} title={'Explore More tools'} isFilterClicked={isFilterClicked} />
              </div>

            </div>
          </div>
        </div>
      </section>

      <Section2 />

      <div className="container wrapper my-[6rem]" data-aos="fade-top">
        <h1 className='heading text-7xl text-center'>Categories</h1>
        <div className="wrapper my-10 grid grid-cols-3 max-md:grid-cols-2 max-sm:block">
          {categories.slice(0, 6).map((category, index) => (
            <div id="div_block-244-12" key={index} className="ct-div-block our-works-card-wrapper flex items-center m-5 max-w-sm rounded-lg" style={{ opacity: 1, visibility: 'inherit', transform: 'translate(0px, 0px)' }}>
              <Link to={`/ai-tools/${category?.replace(/\s+/g, "-")}`} value={category} className="" data-aos="fade-top">
                <div id="div_block-245-12" className="ct-div-block our-works-card--icon-wrapper our-works-card__box-shadow">
                </div>
                <h3 id="headline-247-12" className="ct-headline our-works-card--heading capitalize text-center">{category}</h3>
              </Link>
            </div>
          ))}
        </div >
      </div>

    </main>
  );
};

export default Home;