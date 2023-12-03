import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import shortenRouter from "./routes/shortenRoute.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/shorten", shortenRouter);
app.get("/", (req, res) => {
  res.render("index.html");
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(PORT, () =>
      console.log(`server is up and running on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
