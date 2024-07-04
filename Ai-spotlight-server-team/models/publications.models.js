const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,// Unique ID for the publication

    news_name: {
        type: String,
        required: true,
    },
    site_image: {
        type: String,
        required: true,
    },
    news_link: {
        type: String,
        required: true,
    },
    authority: {
        type: String,
        required: true,
    },
    authority_link: {
        type: String,
        required: true,
    },
    moz_rank_link: {
        type: String,
        required: true,
    },
    global_rank: {
        type: String,
        required: true,
    },
    global_rank_link: {
        type: String,
    },
    social_link: {
        type: String,
    },
    traffic_link: {
        type: String,
    },
    social: {
        type: String,
    },
    traffic: {
        type: String,
    },
    moz_rank: {
        type: String,
    },
 
});



// model step: 1
const publicationsModel = new mongoose.Schema(
    {
        user: {
            type: Object,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        publication: {
            type: [publicationSchema],
            required: true,
        }, 
        status: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("publications", publicationsModel);