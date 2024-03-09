import LockOpenIcon from '@mui/icons-material/LockOpen';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SellIcon from '@mui/icons-material/Sell';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FiExternalLink } from "react-icons/fi";
import { MdFavorite, MdVerified } from "react-icons/md";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import useFavourite from "../hooks/useFavourite";
import { AuthContext } from "../providers/AuthProvider";
import Button, { buttonVariants } from "./Button";




const ToolsCard = ({ item }) => {

  const { user } = useContext(AuthContext);
  const { existing, favourite, handelOnAddFeature } = useFavourite(item, user);
  const [averageRating, setAverageRating] = useState(0);

  // Calculate the average rating when the component mounts or when item changes
  useEffect(() => {
    if (item && item.feedback && item.feedback.length > 0) {
      const totalRatings = item.feedback.reduce((total, feedback) => total + feedback?.userRating, 0);
      const avgRating = totalRatings / item.feedback.length;
      setAverageRating(avgRating.toFixed(1)); // Round to two decimal places
    } else {
      setAverageRating(0);
    }
  }, [item]);


  return (
    <div className="rounded-[1rem] bg-cyprus/95 toolscard dark:bg-white brightness-110 overflow-hidden shadow-xl max-h-full pb-[60px] cardi">
      {/* <Link to={`/tool-details/${item?.title.replace(/\s+/g, "-")}`}>
        <img
          src={item?.toolsImage}
          alt={item?.title}
          className="object-cover cursor-pointer rounded-t-md hover:scale-110 transition-all duration-700 h-[200px] w-full"
        />
      </Link> */}

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <Link to={`/tool-details/${item?.title.replace(/\s+/g, "-")}`}>
              <img
                src={item?.toolsLogo ? item?.toolsLogo : item?.toolsImage}
                alt={item?.title}
                className="object-fill cursor-pointer rounded-md border-[1.5px] toolsimage hover:scale-110 transition-all duration-700 h-[45px] w-[45px]"
              />
            </Link>
            <Link
              to={`/tool-details/${item?.title.replace(/\s+/g, "-")}`}
              className="text-xl font-semibold hover:text-cyan cursor-pointer line-clamp-1 capitalize"
            >
              {item?.title}
            </Link>
            {item?.verified === true && (
              <MdVerified className="text-blue-600 h-5 w-5" />
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div>
            <Rating
              className="text-[24px]"
              initialRating={averageRating}
              readonly
              emptySymbol={<span className="text-gray-300">&#9734;</span>}
              fullSymbol={<span className="text-yellow-400">&#9733; </span>}
            /> ({averageRating})
          </div>
          <div className="flex justify-between items-center gap-2">
            <MdFavorite className="text-red-500 h-6 w-6 cursor-pointer" />
            {user ? favourite?.length : item.favourite?.length}
          </div>
        </div>

        <p className="line-clamp-2">{item?.subtitle}</p>
        {/* <Helmet>
          <title>`Ai-Spotlight ${item?.metaTitle}`</title>
          <meta name="description" content={item?.metaDescription} />
        </Helmet> */}
        <Grid container className='mt-2'>
          {
            item?.price?.map((data, idx) => (
              <Grid item className='m-2'>

                <Typography className="tagCard1">
                  {data === "Free Trial" && <LockOpenIcon className='cardTagIcon' />}
                  {data === "Freemium" && <LockOpenIcon className='cardTagIcon' />}
                  {data === "Free" && <TaskAltIcon className='cardTagIcon' />}
                  {data === "Paid" && <MonetizationOnIcon className='cardTagIcon' />}
                  {data === "Contact for Pricing" && <MonetizationOnIcon className='cardTagIcon' />}
                  {data === "Deals" && <SellIcon className='cardTagIcon' />}
                  {data}
                </Typography>

              </Grid>
            ))
          }
        </Grid>

        <div className="toolscard__bottom flex justify-between">
          <Button colors="transparent" className={`${existing && "background_"}`} onClick={(e) => handelOnAddFeature(item._id)}>
            <MdFavorite className="h-5 w-5" />
          </Button>

          <Link
            to={item?.websiteLink}
            className={buttonVariants({ colors: "primary" })}
            target="_blank"
          >
            <div className="flex items-center gap-2">
              Visit <FiExternalLink />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsCard;
