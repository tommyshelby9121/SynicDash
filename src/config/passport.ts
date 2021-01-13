import DiscordStrategy, { Profile } from "passport-discord";

// User Model
import User from "../models/User";

module.exports = (passport:any) => {
    // Init DiscordStrategy
    passport.use(new DiscordStrategy.Strategy({
        clientID: process.env.DISCORD_OAUTH_CLIENT_ID!,
        clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET!,
        callbackURL: process.env.DISCORD_OAUTH_CALLBACK_URL,
        scope: ["identify", "guilds"]
    }, async (accessToken:string, refreshToken:string, profile:Profile, done:any) => {

    }));
}