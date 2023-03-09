import { Router } from "express";
import authController from "../controllers/authController";
const router = Router();
import { check } from "express-validator";
import User from "../models/User";

router.post(
  "/register",
  [
    check("email", "please enter a valid email").isEmail(),
    check("email").custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
    check("name", "please can not be empty").not().isEmpty(),
    check("password", "password length more than 6").isLength({ min: 3 }),
  ],
  authController.signup
);
router.post(
  "/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "password Required").not().isEmpty(),
  ],
  authController.login
);

export default router;
