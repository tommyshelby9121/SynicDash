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
        const { id, username, discriminator, avatar, guilds } = profile;
        try {
            // Filtered Guilds where permissions has 0x20
            const filteredGuilds = guilds?.filter(object => (object.permissions & 0x20) === 0x20);

            // Check if user exists and update
            const findUser = await User.findOneAndUpdate({ discordId: id }, {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds: filteredGuilds,
            }, { new: true });
            // If user exists return findUser
            if (findUser) {
                return done(null, findUser);
            }
            // If user does not exist, create & return newUser
            else {
                const newUser = await User.create({
                    discordId: id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds: filteredGuilds,
                });
                return done(null, newUser);
            }
        }
        catch (err) {
            console.error(err);
            return done(err, null);
        }
    }));

    // Serialize User
    passport.serializeUser((user:any, done:any) => {
       done(null, user.discordId);
    });

    // Deserialize User
    passport.deserializeUser(async (discordId:any, done:any) => {
       try {
           const user = await User.findOne({ discordId });
           return user ? done(null, user) : done(null, null);
       }
       catch (err) {
           console.error(err);
           done(err, null);
       }
    });
}