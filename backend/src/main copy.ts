import express, {
  Application,
  Request,
  Response,
  Express,
  NextFunction,
} from "express";
import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { clerkClient, requireAuth } from "@clerk/express";
import cors from "cors";

const port = process.env.PORT || 3000;

const app: Application = express();
app.use(cors());

app.get(
  "/api/admin",
  requireAuth({ signInUrl: "/sign-in" }),
  async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
      res.json("no userId");
      return;
    }
    const user = await clerkClient.users.getUser(userId);
    res.json({ user });
  }
);

app.get(
  "/api/data", 
  requireAuth(), 
  async (req, res) => {
    const { userId } = req.auth;
    if (!userId) {
      res.json({ message: "no userId" });
      return;
    }
    const user = await clerkClient.users.getUser(userId);
    res.json({ user, message: "user" });
});

app.get("/sign-in", (req, res) => {
  // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
  res.render("sign-in", {
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
