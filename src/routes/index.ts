import { Request, Response, Router } from "express";
const router = Router();

// Import Routes
import auth from "./auth";
router.use("/auth", auth);

// @route   GET /
// @desc    Home Page
router.get("/", (req:Request, res:Response) => {
   res.render("index", {
      title: "Synic - The only Discord bot you will ever need!"
   });
});

export default router;