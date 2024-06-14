import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import Swal from "sweetalert2";
import categories from "../../public/category.json";
import Button from "../components/Button";
import { baseUrl } from "../config/Url";
import useAdmin from "../hooks/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DarkModeContext from '../providers/DarkModeContext ';

const Features = ['Waitlist', 'Browser Extension', 'Open Source', 'Mobile App', 'Discord Community', 'API', 'No Signup Required'];
const Pricing = ['Free', 'Freemium', 'Free Trial', 'Paid',  "Deals"];

// 'Contact for Pricing',

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const UpdateTool = () => {
  const [isAdmin] = useAdmin();
  const toolDetails = useLoaderData();
  const {
    _id,
    title,
    subtitle,
    metaTitle,
    metaDescription,
    description, 
    toolsLogo,
    toolsImage,
    ratings,
    category,
    websiteLink,
    facebookLink,
    discordLink,
    twitterLink,
    linkedinLink,
    videoReviewLink,
    youtubeLink,
    features,
    price,
  } = toolDetails.data;
 
  const animatedComponents = makeAnimated();

  const [isFeatures, setFeatures] = useState([]);
  const [isPrice, setPricing] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const { darkMode } = useContext(DarkModeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("price", price)
    setValue("features", features)
    setFeatures(features)
    setPricing(price)
  }, [features, price]);

  useEffect(() => {
    register("description", {
      required: description?.length >= 50 ? false : true,
      minLength: 50,
    });
  }, [register]);

  const handleChangesetPricing = (event) => {
    const {
      target: { value },
    } = event;
    setPricing(
      typeof value === 'string' ? value.split(',') : value,
      setValue("price", value)
    );
  };

  const handleChangesetFeatures = (event) => {
    const {
      target: { value },
    } = event;
    setFeatures(
      typeof value === 'string' ? value.split(',') : value,
      setValue("features", value)
    );
  };


  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.put(`${baseUrl}/api/v1/tools/${_id}`, data);
      
      if (response.status === 200) {
        {
          isAdmin
            ? navigate("/dashboard/manage-tools")
            : navigate("/dashboard/my-tools");
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your tool has been successfully updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire(
          "Error",
          "An error occurred while updating the tool. Please try again.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while updating the tool. Please try again.",
        "error"
      );
    }
  };

  return (
    <main className="flex items-center justify-center py-10">
 
      <div className="shadow-xl rounded p-10 w-[70%]">
        <h1 className="text-2xl mb-5 text-center font-bold">
          Update Your Tool
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Tools Title:</label>
            <input
              type="text"
              defaultValue={title}
              {...register("title", {
                required: title?.length > 0 ? false : true,
              })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Title is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subtitle:</label>
            <input
              type="text"
              defaultValue={subtitle}
              {...register("subtitle", {
                required: subtitle?.length > 0 ? false : true,
              })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
            />
            {errors.subtitle && (
              <p className="text-red-500 text-xs italic">
                Subtitle is required.
              </p>
            )}
          </div>
          {/* meta informations */}

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Meta Title:</label>
            <input
              type="text"
              defaultValue={metaTitle}
              {...register("metaTitle", {
                required: metaTitle?.length > 0 ? false : true,
              })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
            />
            {errors.metaTitle && (
              <p className="text-red-500 text-xs italic">
                Meta Titile is required.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Meta Description:</label>
            <input
              type="text"
              defaultValue={metaDescription}
              {...register("metaDescription", {
                required: metaDescription?.length > 0 ? false : true,
              })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
            />
            {errors.metaDescription && (
              <p className="text-red-500 text-xs italic">
                Meta Description is required.
              </p>
            )}
          </div>


          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description:</label>
            <ReactQuill
              theme="snow"
              defaultValue={description}
              onChange={(data) => {
                setValue("description", data);
                if (description?.length >= 50 || data?.length >= 50) {
                  clearErrors("description");
                }
              }}
              className="shadow rounded w-full appearance-none focus:outline-none min-h-[200px] border-10"
              placeholder="Enter your description.."
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                Description must be at least 50 characters.
              </p>
            )}
          </div>

          {isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Category:</label>
              <select
                className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
                {...register("category")}
              >
                <option selected>{category}</option>
                {categories.map((category, index) => (
                  <option key={index} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs italic">
                  Category is required.
                </p>
              )}
            </div>
          )}

        
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Logo URL:</label>
            <input
              type="text"
              defaultValue={toolsLogo}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("toolsLogo", { required: true })}
            />
            {errors.toolsLogo && (
              <p className="text-red-500 text-xs italic">
                Logo URL is required.
              </p>
            )}
          </div> 

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image URL:</label>
            <input
              type="text"
              defaultValue={toolsImage}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("toolsImage", { required: true })}
            />
            {errors.toolsImage && (
              <p className="text-red-500 text-xs italic">
                Image URL is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Website Link:
            </label>
            <input
              type="text"
              defaultValue={websiteLink}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("websiteLink", { required: true })}
            />
            {errors.websiteLink && (
              <p className="text-red-500 text-xs italic">
                Website Link is required.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Video Review Link:
            </label>
            <input
              type="text"
              defaultValue={videoReviewLink}
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              placeholder="Paste the embed URL here"
              {...register("videoReviewLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              YouTube Link:
            </label>
            <input
              type="text"
              defaultValue={youtubeLink}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("youtubeLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Facebook Link:
            </label>
            <input
              type="text"
              defaultValue={facebookLink}
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("facebookLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Discord Link:
            </label>
            <input
              type="text"
              defaultValue={discordLink}
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("discordLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              LinkedIn Link:
            </label>
            <input
              type="text"
              defaultValue={linkedinLink}
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("linkedinLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Twitter Link:
            </label>
            <input
              type="text"
              defaultValue={twitterLink}
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none border-10"
              {...register("twitterLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Pricing:</label>
            <Select 
              placeholder='Select pricing'
              multiple
              required
              value={isPrice}
              onChange={handleChangesetPricing}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{
                width: "100%", 
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                }, "& .MuiSelect-icon": {
                  color: "#858585",   
                }, 
              }}
              className="shadow text-stone-900 border-10"
              id={`${darkMode && 'bg-cyprus'}`}
            >
              {Pricing?.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={isPrice?.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>

            {errors?.pricing && (
              <p className="text-red-500 text-xs italic">Features is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Features:</label>
            <Select 
              placeholder='Select Features'
              multiple
              required
              value={isFeatures }
              onChange={handleChangesetFeatures}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{
                width: "100%", 
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                }, "& .MuiSelect-icon": {
                  color: "#858585",   
                },
              }}
              className="shadow text-stone-900 border-10"
              id={`${darkMode && 'bg-cyprus'}`}
            >
              {Features.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={isFeatures?.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select> 
            {errors?.features && (
              <p className="text-red-500 text-xs italic">Features is required.</p>
            )}
          </div> 

          <Button size="full">Update</Button>
        </form>
      </div>
    </main>
  );
};

export default UpdateTool;
