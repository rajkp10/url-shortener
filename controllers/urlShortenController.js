import Url from "../models/ShortUrl.js";
import StatusCodes from "http-status-codes";
import { nanoid } from "nanoid";
import { isValidUrl } from "../utils/validator.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const createShortURL = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    if (!isValidUrl(originalUrl)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Enter a valid url." });
    }
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(StatusCodes.OK).json(url);
    }
    const urlId = nanoid();
    url = Url.create({
      originalUrl,
      shortUrl: `${process.env.BASE_URL}/${urlId}`,
      urlId,
    });
    res.status(StatusCodes.CREATED).json(url);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server Error!!!" });
  }
};

const redirectToURL = async (req, res) => {
  const { id: urlId } = req.params;
  try {
    const url = await Url.findOne({ urlId });
    if (url) {
      await Url.findOneAndUpdate({ urlId }, { $inc: { clicks: 1 } });
      return res
        .status(StatusCodes.MOVED_PERMANENTLY)
        .redirect(url.originalUrl);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Url Not Found!!!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server Error!!!" });
  }
};

export { createShortURL, redirectToURL };
