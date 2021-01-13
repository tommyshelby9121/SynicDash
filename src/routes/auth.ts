import { Router } from "express";
import passport from "passport";
const router = Router();

// @route   GET /auth
// @desc    Authenticate with discord
router.get("/", passport.authenticate("discord"));

// @route   GET /auth/redirect
// @desc    Redirection Validation
router.get("/redirect", passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "/account",
}));

export default router;