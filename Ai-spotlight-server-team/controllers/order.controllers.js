const { ObjectId } = require("mongodb"); 
const mongoose = require("mongoose");
const Stripe = require('stripe');  
const orderModels = require("../models/order.models");
const { currentDateTime } = require("../middlewares/currentdatetime");


const postPaymentOrder = async (req, res) => {
    try {

        const { checkout_details,  packages, payment_details,  user  } = req.body.formData 

        // console.log("oder", checkout_details,  packages, payment_details,  user );

        const stripe = new Stripe("sk_test_51PMOhN09YD8QwZP3pVZbyYu0Vuf6fKWqFLEAuBf6ozKDmP5fvgFgglxe1YOlI5DN5jBHf6iBy0XyXEErdht33hKu00YnmNyDgA") 
        const {currentDateS} = currentDateTime()
 

        const oder = await orderModels.create({
            price: packages.price, checkout_details,  packages, payment_details,  user,
            i_date: currentDateS
        });

        // console.log("oder", oder);

        let session = {}

        if (oder?._id) {
            session =await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `https://ai-spotlights.com/order/pay/success/${oder?._id}`,
                cancel_url: 'https://ai-spotlights.com/order/pay/cancel',
                customer_email: `${payment_details.company_email}`,
                client_reference_id: user?.id,
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: packages?.price * 100,
                            product_data: {
                                name: `${payment_details.company_name} on the ${packages.name}`,
                                description: `${payment_details.company_name}, ${packages.name}`
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


const paymentSuccess = async (req, res) => {
    try {
      const { id } = req.params;
 

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

     const order = await orderModels.findOne({ _id: id });

     const { exPassword, name, type, email } = order; 

    //  const mailData = {
    //     to: email,
    //     password: exPassword,
    //     subject: 'Thank You for Your Purchase! Welcome to Fame Flow Network',
    //     text1: `Dear ${user?.name},`,
    //     text2:"We received a request to reset the password for your account at Nutrifit-Hub. To proceed with resetting your password, please click on the following link:", 
       
    //   }
 
    //   sendMailWithGmail(mailData) 
     
       
     return res.json({
            result, 
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
        const { userID } = req.params; 
        const order = await orderModels.find({ 'user.id': userID }).sort({ createdAt: -1 });
    
        return res.json({
            order,
            status: "success",
            message: "User orders retrieved successfully",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const getOrderList = async (req, res) => { 
 
    try {
        const order = await orderModels.find({}).sort({ createdAt: -1 });
 
        return res.json({
            data:order,
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
    
        return res.json({
            data:order,
            status: "success",
            message: "User publications get success",
        });

    } catch (error) {
        return res.json({ status: "error", message: error });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        console.log('dsd', id)

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
 

module.exports = {
    postPaymentOrder,
    getOrderList,
    getOrderDetails,
    updateOrdersStates,
    deleteOrder,
    paymentSuccess,
    getUsersOrder
};