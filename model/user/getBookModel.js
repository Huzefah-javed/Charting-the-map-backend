import mongoose from "mongoose";
import { Books } from "../../schema/Books.schema.js";

export const getBookModel = async (bookId) => {
  let result;
    const bookObjId = new mongoose.Types.ObjectId(bookId)
  try {
  const data =  await Books.findById(bookObjId)
    result = { success: true, status:200, data };
  } catch (error) {
    result = {
      success: false,
      status:500,
      msg: "something went wrong while getting book data",
    };
  }
  return result;
};
