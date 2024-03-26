import React from 'react';
import { Link } from 'react-router-dom';
import categories from "../../public/category.json";

const images = [
    "https://tailwindcss.com/_next/static/media/constraint-based.90d79a51.png",
    "https://tailwindcss.com/_next/static/media/performance.dc827ecf.png",
    "https://tailwindcss.com/_next/static/media/build-anything.8f369bba.png",
    "https://tailwindcss.com/_next/static/media/mobile-first.99f7f4f6.png",
    "https://tailwindcss.com/_next/static/media/constraint-based.90d79a51.png",
];

const AllCategories = () => {
    return (
        <div className="container wrapper my-10">
            <h1 className='heading text-7xl text-center'>All Categories</h1>
            <div className="wrapper my-20 grid grid-cols-3 max-md:block">
                {categories.map((category, index) => (
                    <Link to={`/ai-tools/${category?.replace(/\s+/g, "-")}`} key={index} value={category} className="m-3 max-w-sm p-6 dark:bg-slate-50 border dark:border-gray-200 rounded-[0.8rem]  dark:hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 flex justify-between items-center shadow-lg dark:bg-gradient-to-t dark:from-[#17dcff] bg-gradient-to-t from-[#17dcff]">
                        <div className='flex items-center gap-3'>
                            <div className="w-[50px] h-[50px] rounded-[0.8rem] bg-white grid place-items-center">
                                <img src={images[index % images.length]} alt={`Category ${index + 1}`} className="p-[3px]" />
                            </div>
                            <div>
                              <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-gray-900 text-white text-left">{category}</h5>  
                              <h5 className="font-bold tracking-tight dark:text-gray-900 text-white text-left">{category.length}</h5>
                            </div>
                        </div>  
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={33} height={33} viewBox="0,0,256,256">
                            <g fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(4,4)"><path d="M40,10c-1.104,0 -2,0.896 -2,2c0,1.104 0.896,2 2,2h7.17188l-16.58594,16.58594c-0.781,0.781 -0.781,2.04713 0,2.82812c0.391,0.391 0.90206,0.58594 1.41406,0.58594c0.512,0 1.02306,-0.19494 1.41406,-0.58594l16.58594,-16.58594v7.17188c0,1.104 0.896,2 2,2c1.104,0 2,-0.896 2,-2v-12c0,-1.104 -0.896,-2 -2,-2zM18,12c-3.309,0 -6,2.691 -6,6v28c0,3.309 2.691,6 6,6h28c3.309,0 6,-2.691 6,-6v-12c0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2v12c0,1.103 -0.897,2 -2,2h-28c-1.103,0 -2,-0.897 -2,-2v-28c0,-1.103 0.897,-2 2,-2h12c1.104,0 2,-0.896 2,-2c0,-1.104 -0.896,-2 -2,-2z" /></g></g>
                        </svg>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default AllCategories