const { addPublication, updatePublication, getUserPublication, deletePublication } = require("../controllers/publications.controllers"); 
 
const router = require("express").Router();

 
  router.route("/add_new/:orderId").post(addPublication);
  router.route("/get/:orderId").get(getUserPublication);   
   
  router.route("/update/:orderId/:publicationId").post(updatePublication);
  router.route("/delete/:orderId/:publicationId").delete(deletePublication);
  module.exports = router;
  