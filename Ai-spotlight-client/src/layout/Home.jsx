import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import Tools from "../components/Tools";
 
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import categories from "../../public/category.json";
import FeaturedTools from "../components/FeaturedTools";
import ToolsFilter from "../components/HomeFilter";
import SortTools from "../components/SortTools";

const Home = () => {
  const [tools, setTools] = useState([])
  const [status, setStatus] = useState(0)

  const [sort, setSortBy] = useState(null);
  const [pricing, setPricing] = useState([]);
  const [features, setFeatures] = useState([]);
  const [f_option, setFilterState] = useState()
  const { pathname } = useLocation(); 
  const [response, setResponse] = useState(true);  
 
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  let url = `http://localhost:6060/api/v1/tools/get/filter`;

  useEffect(() => { 
    const filterValue = Number(pricing?.length) + Number(features?.length) +   Number(sort == null? 0 :sort?.length);
    setFilterState(filterValue)  

    if(!tools?.length)  setResponse(true);
      url = `${url}${pricing
          .map(
              (f, index) =>
                  `${index > 0 ? "&" : "?"}${f.toLowerCase()}=true`
          )
          .join("")}${features
              .map(
                  (f, index) =>
                      `${pricing.length > 0 || index > 0 ? "&" : "?"
                      }${f.toLowerCase()}=true`
              )
              .join("")}${`${pricing.length > 0 || features.length > 0
                  ? "&"
                  : "?"
              }sort=${sort}`}`;

             
      axios.get(url).then((res) => {
       if( pricing.length || features.length || sort?.length) { 
         setTools(res?.data?.tools);    
        }  
        setResponse(false)
      }); 
  }, [status, features, pricing, sort, pathname]);  
  
  console.log('sort', f_option)
 

  return (
    <main>
      <Helmet>
        <title>Ai Spotlights - The Largest Ai Tools Directory</title>
        <meta name="description" content='Ai Spotlights is the largest Ai Tools Directory.A free site to help you find the best AI tools and software to make your work and life more efficient and productive. Updated daily, join millions of followers of our website, newsletter and YouTube.' />
      </Helmet>
      <div className="home-hero-blue-bulb" style={{ width: 480, height: 480, filter: 'blur(160px)', backgroundColor: '#0089c3', borderRadius: '50%', position:'absolute', top: '-18%', bottom: 'auto', left: 'auto', right: '-5%', zIndex: -1 }} />

      <Hero  pricing={pricing} setPricing={setPricing} features={features} setFeatures={setFeatures} setSortBy={setSortBy} sort={sort} />
     
       <section className="wrapper"> 
       <div className="flex justify-between"> 
      <div className="my-10 w-[20%] card-align">
      <SortTools sort={sort} setSortBy={setSortBy} />
       <ToolsFilter setFeatures={setFeatures} features={features} setPricing={setPricing} pricing={pricing} />
      </div> 
       <div className="w-full md:w-[75%] card-align" > 
       {
        f_option === 0 &&  <FeaturedTools title={'Featured tools'} />
       } 
         
       {
           <Tools tools={tools} f_option={f_option} response={response} title={'Explore More tools'} />
       }
        
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
