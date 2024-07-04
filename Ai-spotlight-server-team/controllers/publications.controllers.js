const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const publicationsModels = require("../models/publications.models");

const addPublication = async (req, res) => {
    try {
        const { publication, user } = req.body;
        const { orderId } = req.params;

        // Generate a new ObjectId for the publication
        publication._id = new mongoose.Types.ObjectId();

        const existingUser = await publicationsModels.findOne({ orderId });

        if (existingUser) {
            // Update existing user's publications
            const result = await publicationsModels.updateOne(
                { orderId },
                {
                    $push: {
                        publication,
                    },
                }
            );

            return res.json({
                result,
                status: "success",
                message: "Publication successfully updated",
            });
        } else {
            // Create a new user document with publications
            const result = await publicationsModels.create({
                user,
                orderId,
                publication: [publication],
            });

            return res.json({
                result,
                status: "success",
                message: "User created with publication",
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({ status: "error", message: error.message });
    }
};

const updatePublication = async (req, res) => {
    try {
        const { publication: updatedPublication } = req.body;
        const { orderId, publicationId} = req.params;  

        console.log(`updatePublication`, publicationId)

          // Convert publicationId to ObjectId
          updatedPublication._id = publicationId;

        console.log(`updated`,   updatedPublication)

        const result = await publicationsModels.updateOne(
            { 
                orderId: orderId,
                "publication._id": publicationId  
            },
            {
                $set: {
                    "publication.$": [updatedPublication]  
                }
            }
        );
 

        return res.json({
            result,
            status: "success",
            message: "Publication successfully updated",
        });
    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const getUserPublication = async (req, res) => {
    try { 
        const { orderId } = req.params;  
 

        const publications = await publicationsModels.findOne({ orderId }); 
 

          return res.json({
            publications,
              status: "success",
              message: "User publications get success",
          });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const deletePublication = async (req, res) => {
    try { 
        const { orderId, publicationId} = req.params;   
     
        const result = await publicationsModels.findOneAndUpdate(
            { orderId: orderId },
            {
                $pull: {
                    publication: { _id: publicationId }
                }
            },
            { new: true } 
        );
   
        if (result) {
            return res.json({
                status: "success",
                message: "Publication successfully deleted",
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "Publication not found",
            });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};



  

module.exports = {
    addPublication,
    getUserPublication,
    updatePublication,
    deletePublication
};