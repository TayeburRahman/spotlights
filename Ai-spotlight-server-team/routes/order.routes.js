const { postPaymentOrder, paymentSuccess, getOrderList, getOrderDetails, getUsersOrder, deleteOrder, updateOrdersStates } = require("../controllers/order.controllers"); 
const { verifyJWT, verifyAdmin } = require("../middlewares/auth.middleware");
  
 
  
  const router = require("express").Router(); 
  router.route("/payment").post(postPaymentOrder);   
 
  router.route("/get_list").get(verifyJWT,verifyAdmin,getOrderList);   
  router.route("/details/:id").get(getOrderDetails);  
  router.route("/:type/update/:id").put(updateOrdersStates); 
  router.route("/delete/:id").delete(deleteOrder); 

  router.route("/payment/:id/user").post(paymentSuccess); 
  router.route("/user/:userID").get(verifyJWT, getUsersOrder);


  module.exports = router;