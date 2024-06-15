const { ObjectId } = require("mongodb");
const publicationsModels = require("../models/publications.models");
const mongoose = require("mongoose");
const Stripe = require('stripe');
const orderModels = require("../models/order.models");
const userModels = require("../models/user.models");
const { sendMailWithGmail } = require("../middleware/email.success");
const { generateToken } = require("../utils/token");
const { currentDateTime } = require("../middleware/currentdatetime");


const postPaymentOrder = async (req, res) => {
    try {

        const { price, brand, writingPackage, publishPackage, account, newsStory, detailedResearch } = req.body.formData

        const stripe = new Stripe("sk_test_51PMOhN09YD8QwZP3pVZbyYu0Vuf6fKWqFLEAuBf6ozKDmP5fvgFgglxe1YOlI5DN5jBHf6iBy0XyXEErdht33hKu00YnmNyDgA")
         

        const {currentDateS} = currentDateTime()
 

        let oder  = await orderModels.create({
                price,
                brand,
                writingPackage,
                publishPackage,
                name: account?.name,
                email: account?.email,
                exPassword: account?.password,
                newsStory,
                detailedResearch,
                type: account.status,
                i_date: currentDateS
            }); 

        let session = {}

        if (oder?._id) {
            session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `https://fameflownetwork-client.vercel.app/pay/success/${oder?._id}`,
                cancel_url: 'https://fameflownetwork-client.vercel.app/pay/cancle',
                customer_email: `${account.email}`,
                client_reference_id: '61276312',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: price * 100,
                            product_data: {
                                name: `${writingPackage.title} on the ${publishPackage.title}`,
                                description: `${writingPackage.title}, ${publishPackage.title}`
                            }
                        },
                        quantity: 1
                    }
                ]
            })
        }

        return res.json({
            session,
            oder,
            status: "success",
            message: "post success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};


const getOrderList = async (req, res) => {
    const { payment, status } = req.params;
    console.log("jj", payment, status);
    try {
        const order = await orderModels.find({ payment, status });
        return res.json({
            order,
            status: "success",
            message: "orders get success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orderModels.findOne({ _id: id });

        console.log(order)

        return res.json({
            order,
            status: "success",
            message: "User publications get success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const updateOrdersStates = async (req, res) => {
    const { id, type } = req.params
    const { oderStatus, oderPayment } = req.body

    try {
        console.log("JSON.stringify(", oderStatus, oderPayment, id, type)
        let result = {}

        if (type === "payment") {
            result = await orderModels.updateOne(
                {
                    _id: id
                },
                {
                    $set: {
                        payment: oderPayment
                    }
                }
            );
        }

        if (type === "status") {
            result = await orderModels.updateOne(
                {
                    _id: id
                },
                {
                    $set: {
                        status: oderStatus
                    }
                }
            );

        }

        const order = await orderModels.findOne({ _id: id });

        return res.json({
            order,
            result,
            status: "success",
            message: "User publications get success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await orderModels.deleteOne({ _id: id });

        return res.json({
            result,
            status: "success",
            message: "site successfully deleted",
        });

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};


const paymentSuccess = async (req, res) => {
    try {
      const { id } = req.params;

      console.log("userid, email", id)

      const result = await orderModels.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    payment: 'Paid'
                }
            }
        );
        console.log("result", result)

     const order = await orderModels.findOne({ _id: id });

     const { exPassword, name, type, email } = order;
 
     let token = {}
     let user = {}
     if(type !== 'login'){
       user = await userModels.create({email, password: exPassword, name});
      
       if(!user){
        return res.status(204).json({ 
            status: "error",
            message: "Server error, user cannot be created",
          });
        }
      token = generateToken(user); 
     }    

     const mailData = {
        to: email,
        password: exPassword,
        subject: 'Thank You for Your Purchase! Welcome to Fame Flow Network',
        text1: `Dear ${user?.name},`,
        text2:"We received a request to reset the password for your account at Nutrifit-Hub. To proceed with resetting your password, please click on the following link:", 
       
      }
 
      sendMailWithGmail(mailData) 
     
       
     return res.json({
            result,
            user,
            token,
            order,
            status: "success",
            message: "Update successfully ",
        });

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

const getUsersOrder = async (req, res) => {
    try {
        const { email } = req.params;

        const order = await orderModels.find({ email: email }); 

        return res.json({
            order,
            status: "success",
            message: "User publications get success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};
 

module.exports = {
    postPaymentOrder,
    getOrderList,
    getOrderDetails,
    updateOrdersStates,
    deleteOrder,
    paymentSuccess,
    getUsersOrder
};