const toolModels = require("../models/tool.models");

const getAllTools = async (req, res) => {
  const result = await toolModels.find().sort({
    createdAt: -1
  });
  res.send(result);
};

const getFeaturedTools = async (req, res) => {
  const result = await toolModels
    .find({
      status: "approved",
      featured: "true"
    })
    .sort({
      updatedAt: -1,
      status: -1,
    });
  res.send(result);
};


const userFeaturedTool = async (req, res) => {
  const email = req.params.email;
  const id = req.params.toolId;

  try {
    const ExistingUser = await toolModels.findOne({
      $and: [{ _id: id }, { favourite: email }],
    });

    if (ExistingUser) {
      const response = await toolModels.findOneAndUpdate(
        { _id: id },
        {
          $pull: {
            favourite: email,
          },
        },
        { returnOriginal: false }
      );

      return res.status(201).json({
        response,
        status: "success",
        message: "Tools Remove Bookmark Success",
      });
    } else {
      const response = await toolModels.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            favourite: email,
          },
        },
        { returnOriginal: false }
      );

      return res.status(200).json({
        response,
        status: "success",
        message: "Tools Add Bookmark Success",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const getApproveTools = async (req, res) => {
  const result = await toolModels
    .find({
      status: "approved",
      featured: "false"
    })
    .sort({
      updatedAt: -1,
      status: -1,
    });
  res.send(result);
};

const getMyTools = async (req, res) => {
  let query = {};
  if (req.query?.email) {
    query = {
      userEmail: req.query.email
    };
  }

  const decodedEmail = req.decoded.email;
  if (query.userEmail !== decodedEmail)
    return res.status(403).send({
      error: true,
      message: "Forbidden Access"
    });

  const result = await toolModels.find(query).sort({
    createdAt: -1
  });
  res.send(result);
};

const getSingleTools = async (req, res) => {
  const title = req.params.title;
  const formattedTitle = title.replace(/-/g, " ");
  const result = await toolModels.findOne({
    title: formattedTitle
  });
  res.send(result);
};

const createTools = async (req, res) => {
  console.log("dart", req.body)
  const result = await toolModels.create(req.body);
  res.send(result);
};

const approveTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      status: "approved",
    },
  });
  res.send(result);
};

const denyTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      status: "denied",
    },
  });
  res.send(result);
};

const verifyTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      verified: "true",
    },
  });
  res.send(result);
};

const unverifyTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      verified: "false",
    },
  });
  res.send(result);
};

const featuredTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      featured: "true",
    },
  });
  res.send(result);
};

const unfeaturedTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndUpdate(id, {
    $set: {
      featured: "false",
    },
  });
  res.send(result);
};

const updateTools = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updateTools = {
    $set: {
      title: body.title,
      subtitle: body.subtitle,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      tags: body.tags,
      toolsImage: body.toolsImage,
      toolsLogo: body.toolsLogo,
      ratings: body.ratings,
      favourite: body.favourite,
      category: body.category,
      description: body.description,
      websiteLink: body.websiteLink,
      youtubeLink: body.youtubeLink,
      facebookLink: body.facebookLink,
      discordLink: body.discordLink,
      twitterLink: body.twitterLink,
      linkedinLink: body.twitterLink,
      videoReviewLink: body.videoReviewLink,
      features: body.features,
      price: body.price,
    },
  };
  const result = await toolModels.findByIdAndUpdate(id, updateTools);
  res.send(result);
};

const deleteTools = async (req, res) => {
  const id = req.params.id;
  const result = await toolModels.findByIdAndDelete(id);
  res.send(result);
};

//searching tools
const searchToolsController = async (req, res) => {
  try {

    const {
      keyword
    } = req.params;

    const results = await toolModels
      .find({
        $or: [{
          title: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          description: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          userName: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          subtitle: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          category: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          tags: {
            $regex: keyword,
            $options: "i"
          }
        },
        ],
      })
      .select("-photo");
    res.json(results);


  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Searching tools API",
      error,
    });
  }
};

const feedbackUser = async (req, res) => {
  try {
    const { text, user, userRating } = req.body.formData;
    const id = req.params.toolId;
    // const email = req.params.email;

    const createData = {
      feedback_text: text,
      user: user,
      userRating: userRating,
    }

    const response = await toolModels.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          feedback: createData,
        },
      }); 

     const result = await toolModels.findOne({ _id: id });
 
 
    return res.status(200).json({ 
      feedback: result.feedback,
      response,
      status: "success",
      message: "User feedback Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const getFeedback = async (req, res) => {
  try { 
    const id = req.params.toolId;  
     const result = await toolModels.findOne({ _id: id }); 

     const feedback = result.feedback.reverse() 

    return res.status(200).json({ 
      feedback,
      status: "success",
      message: "feedback Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

 
const featuredExistingUser = async (req, res) => {
  try {
    const email = req.params.email;
    const id = req.params.toolId;

    const exist = await toolModels.findOne({
      $and: [{ _id: id }, { favourite: email }],
    });

    const result = await toolModels.findOne({ _id: id });
    return res.status(200).json({
      exist,
      favour: result.favourite,
      status: "success",
      message: "ExistingUser Find Success",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

const ToolsSearchFilter = async (req, res) => {

  console.log("req.query", req.query)
 
  let categories = [];

  if (req.query.art) {
    categories.push("Art");
  }
  if (req.query.audio_editing) {
    categories.push("Audio Edting");
  }
  // if (req.query.paid) {
  //   categories.push("Paid");
  // }
  if (req.query.contact_for_pricing) {
    categories.push("Contact for Pricing");
  } 
  let featuresFilter = [];

  if (req.query.mobile_app) {
    featuresFilter.push("Mobile App");
  }
  if (req.query.waitlist) {
    featuresFilter.push("Waitlist");
  }
  if (req.query.api) {
    featuresFilter.push("API");
  }
  if (req.query.browser_extension) {
    featuresFilter.push("Browser Extension");
  }
  if (req.query.open_source) {
    featuresFilter.push("Open Source");
  }
  if (req.query.discord_community) {
    featuresFilter.push("Discord Community");
  }
  if (req.query.no_signup_required) {
    featuresFilter.push("No Signup Required");
  }
 
  //--------------------------------------------------------------
  // PRICING FILTER

  let pricingFilter = []; 

  if (req.query.free) {
    pricingFilter.push("Free");
  }
  if (req.query.free_trial) {
    pricingFilter.push("Free Trial");
  }
  if (req.query.contact_for_pricing) {
    pricingFilter.push("Contact for Pricing");
  }
  if (req.query.freemium) {
    pricingFilter.push("Freemium");
  }
  if (req.query.paid) {
    pricingFilter.push("Paid");
  }
  if (req.query.deals) {
    pricingFilter.push("Deals");
  }

  console.log("pricingFilter", pricingFilter)
  //--------------------------------------------------------------

  const getQuery = () => {
    if (pricingFilter?.length > 0 && featuresFilter?.length > 0) {

      return {
        $or: [
          { price:{$in: pricingFilter}},
          { features:{ $in: featuresFilter}}
        ]
      };
    } else if (featuresFilter?.length > 0) {
      return {
        features: { $in: featuresFilter },
        // features: { $in: featuresFilter },
      };
    } else if (pricingFilter?.length > 0) {
      return {
        price: { $in: pricingFilter },
      };
    } else {
      return;
    }
  };

  // console.log("filters is : ", pricingFilter, featuresFilter);

  const getParams = () => {
    return {
      categories: { $in: categories },
    };
  };

  try {
    let tools = [];
    if (categories.length > 0) {
      // console.log("params id is : ", paramsId);
      tools = await toolModels
        .find({ status: "approved" })
        .find(getParams())
        .find(getQuery());
    } else {
      // tools = await toolModels.find(getQuery());
      tools = await toolModels.find({ status: "approved" }).find(getQuery());
    }

    // console.log("tools is : ", tools)

    if (req?.query?.sort) {


      if (req?.query?.sort === "popular") {
        const sortData = await [...tools].sort((a, b) => {
          // console.log("a is : ", a);
          return Number(a.favourite.length) - Number(b.favourite.length);
        });
        tools = sortData?.slice(0)?.reverse();
      } else if (req?.query?.sort === "verified") {
        // const sortData = await [...tools].sort((a, b) => {
        //   return Number(a.favourite.length) - Number(b.favourite.length);
        // });
        tools = [...tools].filter((e) => e.verified === true)  
      } else if (req?.query?.sort === "new") { 
        const newTools = [...tools]
        tools = newTools.slice(0)?.reverse();
      }
    }

    return res.status(200).json({
      tools,
      status: "success",
      message: "Inactive Tools Find Success",
    });

    // res.send({ status: "success", result: tools });
  } catch (err) {
    res.status(500).json({ massages: "Internal Server Error" });
  }
}; 

module.exports = {
  getAllTools,
  getApproveTools,
  getFeaturedTools,
  getMyTools,
  getSingleTools,
  createTools,
  approveTools,
  denyTools,
  verifyTools,
  unverifyTools,
  featuredTools,
  unfeaturedTools,
  updateTools,
  deleteTools,
  searchToolsController,
  userFeaturedTool,
  featuredExistingUser,
  feedbackUser,
  getFeedback,
  ToolsSearchFilter,
};