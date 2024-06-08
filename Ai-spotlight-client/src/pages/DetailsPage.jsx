import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiFillYoutube } from "react-icons/ai";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { FaFacebook, FaStar } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { MdFavorite } from "react-icons/md";
import Rating from "react-rating";
import { Link, useLoaderData } from "react-router-dom";
import { buttonVariants } from "../components/Button";
import ToolsCard from "../components/ToolsCard";
import { baseUrl } from "../config/Url";
import useFavourite from "../hooks/useFavourite";
import useToast from "../hooks/useToast";
import { AuthContext } from "../providers/AuthProvider";


const DetailsPage = () => {
  const { user } = useContext(AuthContext);
  const { displayToast } = useToast();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [isOpenText, setIsOpenText] = useState(false);
  const [isFeedback, setFeedBack] = useState('');
  const [feedbackState, setFeedbackState] = useState(false)
  const [open, setOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const { isLoading, error, data } = useQuery({
    queryKey: ["approvedTools"],
    queryFn: () =>
      axios
        .get(`${baseUrl}/api/v1/tools/approved-tools`)
        .then((res) => res.data),
  });

  const toolDetails = useLoaderData();
  const {
    _id,
    title,
    subtitle,
    metaTitle,
    metaDescription,
    description,
    category,
    websiteLink,
    toolsImage,
    youtubeLink,
    facebookLink,
    videoReviewLink,
    discordLink,
    twitterLink,
    linkedinLink,
    ratings,
    favourite,
    feedback,
    tags,
  } = toolDetails.data;
  console.log(tags)

  const item = toolDetails.data;

  const { existing, favourite: favour, handelOnAddFeature } = useFavourite(item, user);


  const relatedTools = data
    ? data.filter((tool) => tool.category === category && tool.title !== title).slice(0, 6)
    : [];

  const relatedProducts = data
    ? data.filter((tool) => tool.ratings === ratings && tool.title !== title).slice(0, 6)
    : [];

  const handelOnSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      // showToast("Please log in to your account!"); 
      displayToast({ status: 'success', message: "Please log in to your account!" })
      return;
    }

    const formData = {
      text: isFeedback,
      user: user,
      userRating: rating,
    };

    try {
      const response = await axios.post(`http://localhost:6060/api/v1/tools/feedback/${_id}`, {
        formData
      }); 
      setFeedBack('');
      setFeedbackAll(response.data.feedback);
      displayToast({ status: 'success', message: "Feedback submitted successfully. Thank you!" }); 
    } catch (error) {
      console.error("Error:", error.message);
      // displayToast({ status: 'error', message: "Failed to submit feedback. Please try again later." });
    }
    setFeedbackSubmitted(true);
  };

  const resetModal = () => {
    setRating(null);
    setFeedBack('');
    setFeedbackSubmitted(false);
    setOpen(false);
  };

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


  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );

 
  const handleRatingClick = (currentRating) => {
    // Toggle rating if the same star is clicked again
    setRating((prevRating) => (prevRating === currentRating ? null : currentRating));
  };

  const getRatingText = () => {
    if (rating === 1) return 'I Just Hate it 😡';
    else if (rating === 2) return `I don't Like it😕`;
    else if (rating === 3) return 'It is Awesome! 😊';
    else if (rating === 4) return 'I Like it 😎';
    else if (rating === 5) return 'I Just love it 😍';
    else return '';
  };


  return (
    <main className="wrapper details-wrapper my-10">
      {metaTitle && metaDescription && (
        <Helmet>
          <title>{`${metaTitle} -- Ai SpotLghts`}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
      )}

      <div className='mb-4'>
         <Link to="/">Home</Link> <KeyboardArrowRightIcon/> <Link to="/ai-tools/All-categories">AI Tools</Link>   <KeyboardArrowRightIcon/> {title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <img
          src={toolsImage}
          alt={title}
          className="w-full h-auto rounded-lg"
        />

        <div className="space-y-2">
          <h2 className="text-5xl font-bold capitalize">{title}</h2>

          <Rating
            className="text-[24px]"
            initialRating={averageRating}
            readonly
            emptySymbol={<span className="text-gray-300">&#9734;</span>}
            fullSymbol={<span className="text-yellow-400">&#9733; </span>}
          />

          ({averageRating})
          <div className="flex gap-2 items-center">
            <MdFavorite
              onClick={(e) => handelOnAddFeature(_id)} className="text-red-500 h-6 w-6 cursor-pointer" />
            {user?.email ? favour?.length : favourite?.length}
          </div>

          <h4 className="text-lg">{subtitle}</h4>

          <Link
            to={websiteLink}
            className={buttonVariants({ colors: "transparent", size: "small" })}
            target="_blank"
          >
            View Deal
          </Link>
          <ul className="text-white dark:text-black capitalize">Tags:
            {/* {console.log(tags)} */}
            {tags && tags?.map((item, index) => (
              <li key={index} className="lowercase mx-2 inline-block">
                <span className="text-white dark:text-black capitalize"></span>{item.label}
              </li>
            ))}
          </ul>

          {(facebookLink ||
            discordLink ||
            twitterLink ||
            linkedinLink ||
            youtubeLink) && (
              <div className="space-y-2">
                <p>Social Links</p>
                <div className="flex gap-3 text-2xl">
                  {facebookLink && (
                    <Link to={facebookLink} target="_blank">
                      <FaFacebook />
                    </Link>
                  )}

                  {linkedinLink && (
                    <Link to={twitterLink} target="_blank">
                      <ImLinkedin />
                    </Link>
                  )}

                  {twitterLink && (
                    <Link to={twitterLink} target="_blank">
                      <BsTwitter />
                    </Link>
                  )}

                  {youtubeLink && (
                    <Link to={youtubeLink} target="_blank">
                      <AiFillYoutube />
                    </Link>
                  )}

                  {discordLink && (
                    <Link to={discordLink} target="_blank">
                      <BsDiscord />
                    </Link>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>

      <div className={clsx(
        `flex justify-between gap-2 text-justify space-y-5 font-extralight details-align`,
      )}>
        <div className={clsx(`w-full md:w-[70%] card-align`)}>
          <h3 className="font-bold text-xl capitalize mb-5">{title} Features </h3>
          <div className={clsx(isOpenText ? null : "line-clamp-[7]",)}>
            <p
              className="space-y-5 leading-relaxed font-extralight"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <button
            onClick={() => setIsOpenText(!isOpenText)}
            className="text-sky-400 font-bold ital"
          >
            {isOpenText ? "Read Less..." : "Read More..."}
          </button>
          {videoReviewLink && (
            <div className="space-y-5 mt-12">
              <p className="font-bold capitalize">{title} Video Review</p>
              <div className="aspect-w-16 aspect-h-9">
                <iframe src={videoReviewLink} className="rounded-2xl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          )}

        </div>

        {/* { relatedProducts.length > 0 && ( */}
        <div className="my-10 w-[25%] card-align">
          <p className="font-bold text-2xl mb-5">Similar Tools </p>
          {relatedProducts?.length === 0 ? (
            <p className="text-sky-300 font-medium">No similar products available!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10 cards-align">
              {relatedProducts?.map((item, index) => (
                <ToolsCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>

      {relatedTools && relatedTools.length > 0 && (
        <div className="my-10">
          <p className="font-bold text-2xl mb-5">Similar Category Tools </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedTools.map((item, index) => (
              <ToolsCard key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="my-14">

        <div className="flex justify-between">
          <h4 className="font-bold text-4xl capitalize"><span className="font-bold">{title}</span> Reviews: </h4>
          <button
            className="rounded-[9px] flex items-center gap-[1px] py-[15px] px-[34px] text-white bg-[#0ea5e9] hover:bg-[#0ea4e9de] shadow-lg"
            onClick={() => setOpen(true)}
          >
            <FaStar /> Write a Review
          </button>
        </div>


        <div className="grid grid-cols-3 gap-5 my-5">
          {feedback && feedback.map(({ feedback_text, user, userRating }, index) => (
            <div className="textarea_feedback p-4 mt-2 bg-white text-black rounded-xl shadow-lg " key={index}>
              <div className="flex items-center">
                <img className="w-12 rounded-[50%] me-2" src={user?.photoURL} />
                <div className="block mt-1 space-y-[1px]">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-${i < userRating ? 'yellow-400 ' : 'gray-400'}`} />
                      ))}
                    </div> <p className="font-[500] text-[16px] mt-[1px]">{userRating}</p>
                  </div>
                  <h1 className="text-[18px]">{user?.displayName}</h1>
                </div>
              </div>
              <p className="space-y-5  mt-3 px-2 py-3">{feedback_text}</p>
              {/* {console.log('rating', rating, userRating)} */}
            </div>
          ))}
        </div>

        <div
          onClick={() => !feedbackSubmitted && setOpen(false)}
          className={`
          fixed inset-0 flex justify-center items-center transition-colors z-50
          ${(!feedbackSubmitted && open) ? "visible bg-black/20" : "invisible"}
        `}
        >
          {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
            bg-white rounded-xl shadow p-6 transition-all space-y-10 z-50
            ${(!feedbackSubmitted && open) ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
          >
            <button
              onClick={resetModal}
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            >
              ❌
            </button>
            {feedbackSubmitted ? (
              <div className="w-[40vw] text-black text-center space-y-5">
                <p className="text-2xl font-semibold">Thanks for your feedback! ✨</p>
                {/* Display additional thank you message or redirect the user */}
              </div>
            ) : (
              <div className="w-[40vw] text-black space-y-5">
                <div className="flex mx-auto items-center justify-center">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => handleRatingClick(currentRating)}
                          className="hidden"
                        />
                        <FaStar
                          className="text-5xl"
                          color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <p className="text-center text-2xl font-semibold">{getRatingText()}</p>
                <p className="mt-5 space-y-5 text-black text-3xl font-bold">Write your review:</p>
                <p className="mt-2 text-black">Your review helps others learn about great AI tools. Please be noted that your review will be moderated before it is published.</p>

                <form className="mt-3 grid" onSubmit={handelOnSubmit}>
                  <textarea className="py-2 px-2 textarea_feedback border-gray-500 border-2" required type="text"
                    value={isFeedback}
                    onChange={(e) => setFeedBack(e.target.value)}
                    placeholder={getRatingText() ? `Why ${getRatingText()}` : 'write your Feedback ✨😃'} style={{ width: '100%', borderRadius: '17px', padding: '14px', height: '210px', color: 'black' }} /> <br />
                  <button type="submit" className='grid mt-[10px] rounded-[9px] border-gray-300 border-[1px] py-[10px] px-[34px] text-white bg-[#0ea5e9] hover:bg-[#0ea4e9de]'> Submit </button>
                </form>
              </div>)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;