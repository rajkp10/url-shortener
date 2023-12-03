import express from "express";
import {
  createShortURL,
  redirectToURL,
} from "../controllers/urlShortenController.js";
import rateLimit from "express-rate-limit";
const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  statusCode: 200,
  message: {
    status: 429,
    error: "Too many requests, please try after 10 minutes.",
  },
});

router.route("/").post(apiLimiter, createShortURL);
router.route("/:id").get(redirectToURL);

export default router;
