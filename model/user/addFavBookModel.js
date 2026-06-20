import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";

export const addFavBookModel = async (bookId, userId) => {
    const bookObjId = new mongoose.Types.ObjectId(bookId);
    const userObjId = new mongoose.Types.ObjectId(userId);
    await UserFavorite.insertOne({ bookId: bookObjId, userId: userObjId });
};
