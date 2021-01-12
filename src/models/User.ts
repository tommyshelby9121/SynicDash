import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    discordId: string,
    discordTag: string,
    avatar: string,
}

const UserSchema = new Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordTag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
    },
});

export default model<IUser>("User", UserSchema);