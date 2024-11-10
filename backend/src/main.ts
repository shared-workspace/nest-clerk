import express, {
  Application,
  Request,
  Response,
  Express,
  NextFunction,
} from "express";
import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import cors from "cors";
import name from "./name";

import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app: Application = express();
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());
app.use("/name", name);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
