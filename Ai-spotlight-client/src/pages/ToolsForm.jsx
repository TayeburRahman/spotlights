import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import Swal from "sweetalert2";
import categories from "../../public/category.json";
import Button from "../components/Button";
import useAdmin from "../hooks/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};



const Features = ['Waitlist', 'Browser Extension', 'Open Source', 'Mobile App', 'Discord Community', 'API', 'No Signup Required'];
const Pricing = ['Free', 'Freemium', 'Free Trial', 'Paid',   "Deals"];

// 'Contact for Pricing',



const animatedComponents = makeAnimated();

const ToolsForm = () => {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [features, setFeatures] = useState([]);
  const [price, setPricing] = useState([]);

  const [istag, setTag] = useState([]);

  const [axiosSecure] = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    register("description", { required: true, minLength: 50 });
  }, [register]);

  const descriptionContent = watch("description");




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

  const onSubmit = async (e) => {


    const data = {
      userName: e.userName,
      userEmail: e.userEmail,
      title: e.title,
      subtitle: e.subtitle,
      metaTitle: e.metaTitle,
      metaDescription: e.metaDescription,
      category: e.category, 
      description: e.description,
      discordLink: e.discordLink,
      facebookLink: e.facebookLink,
      toolsImage: e.toolsImage,
      twitterLink: e.twitterLink,
      videoReviewLink: e.videoReviewLink,
      websiteLink: e.websiteLink,
      youtubeLink: e.youtubeLink,
      features: e.features,
      price: e.price,
      toolsLogo: e.toolsLogo,
      linkedinLink: e.linkedinLink,  
    } 



    try {
      const response = await axiosSecure.post(`http://localhost:6060/api/v1/tools`, data);
      reset();
      if (response.status === 200) {
        {
          isAdmin
            ? navigate("/dashboard/manage-tools")
            : navigate("/dashboard/my-tools");
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your tool has been successfully added.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire(
          "Error",
          "An error occurred while adding the tool. Please try again.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "An error occurred while adding the tool. Please try again.",
        "error"
      );
    }
  };


  return (
    <main className="flex items-center justify-center py-10">
      <div className="shadow-xl rounded p-10 md:w-[70%]">
        <h1 className="text-2xl mb-5 text-center font-bold">Add a New Tool</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">User Name:</label>
              <input
                type="text"
                className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
                defaultValue={user?.displayName}
                readOnly
                {...register("userName", { required: true })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                User Email:
              </label>
              <input
                type="text"
                className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
                defaultValue={user?.email}
                readOnly
                {...register("userEmail", { required: true })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Tools Title:</label>
            <input
              type="text"
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">Title is required.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subtitle:</label>
            <input
              type="text"
              {...register("subtitle", { required: true })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
            />
            {errors.subtitle && (
              <p className="text-red-500 text-xs italic">
                Subtitle is required.
              </p>
            )}
          </div>

          {/* Meta informations */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Meta Titile:</label>
            <input
              type="text"
              {...register("metaTitle", { required: true })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
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
              {...register("metaDescription", { required: true })}
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
            {errors.metaDescription && (
              <p className="text-red-500 text-xs italic">
                Meta Description is required.
              </p>
            )}
          </div>
          {/* Meta informations */}

          {/* <Helmet>
            <title>Ai-Spotlight {metaTitle}</title>
            <meta name="description" content={metaDescription} />
          </Helmet> */}


          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description:</label>
            <ReactQuill
              theme="snow"
              value={descriptionContent}
              onChange={(data) => {
                setValue("description", data);
              }}
              className="shadow rounded w-full appearance-none focus:outline-none min-h-[200px]"
              placeholder="Enter your description.."
            />
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {descriptionContent && descriptionContent.length > 50
                  ? null
                  : "Description is required and must be at least 50 characters."}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Category:</label>
            <select
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("category", { required: true })}
            >
              <option value="" disabled selected>
                Select a category
              </option>
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

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Logo URL:</label>
            <input
              type="text"
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
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
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
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
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
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
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
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
              className="bg-cyprus/90  dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("youtubeLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Facebook Link:
            </label>
            <input
              type="text"
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("facebookLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Discord Link:
            </label>
            <input
              type="text"
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("discordLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              LinkedIn Link:
            </label>
            <input
              type="text"
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("linkedinLink")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Twitter Link:
            </label>
            <input
              type="text"
              className="bg-cyprus/90 dark:bg-white shadow rounded py-2 px-4 w-full appearance-none focus:outline-none"
              {...register("twitterLink")}
            />
          </div> 

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Pricing:</label>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              placeholder='Select pricing'
              multiple
              required
              value={price}
              onChange={handleChangesetPricing}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{ width: "100%" }}
              className="bg-cyan-200"
            >
              {Pricing.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={price.indexOf(name) > -1} />
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
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              placeholder='Select Features'
              multiple
              required
              value={features}
              onChange={handleChangesetFeatures}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{ width: "100%" }}
            >
              {Features.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={features.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select> 
            {errors?.features && (
              <p className="text-red-500 text-xs italic">Features is required.</p>
            )}
          </div>
          <Button size="full">Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default ToolsForm;