import mongoose from "mongoose";
import { Books } from "../../schema/Books.schema.js";

export const getBookModel = async (bookId) => {
  const bookObjId = new mongoose.Types.ObjectId(bookId);
  const data = await Books.findById(bookObjId);
  return data;
};
