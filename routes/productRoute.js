const express = require("express");
const { createProduct, getProductDetails, updateProduct, deleteProduct, getAllProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
  module.exports = router;
  router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
  router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);