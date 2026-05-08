const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth");
const {
  loginValidator,
  updateProfileValidator,
  validate,
} = require("../validators/auth.validator");

// Public routes
router.post(
  "/google",
  loginValidator,
  validate,
  AuthController.loginWithGoogle,
);

// Protected routes
router.get("/profile", authenticate, AuthController.getProfile);
router.put(
  "/profile",
  authenticate,
  updateProfileValidator,
  validate,
  AuthController.updateProfile,
);

router.get("/verify", authenticate, AuthController.verifyToken);

module.exports = router;
