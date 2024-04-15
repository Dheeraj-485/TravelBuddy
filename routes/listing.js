const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingControllers = require("../controllers/listings");

//Index Route
router.get("/", wrapAsync(listingControllers.index));

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingControllers.renderNewForm));

//Show Route
router.get("/:id", wrapAsync(listingControllers.showListing));

//Create Route
// router.post("/", validateListing, wrapAsync(listingControllers.createListing));
router.post(
  "/",
  validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingControllers.createListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingControllers.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.destroyListing)
);

module.exports = router;
