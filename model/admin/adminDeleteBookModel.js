import mongoose from "mongoose";
import { Books } from "../../schema/Books.schema.js";

export const adminDeleteBookModel = async (id) => {
  let result;
  try {
    const deletedBook = await Books.findByIdAndDelete(id);
    if (!deletedBook) {
      result = { success: false, status: 400, msg: "Book not found" };
    }
    result = { success: true, status: 200, msg: "Delete successfully" };
  } catch (error) {
    result = { success: false, status: 500, msg: "Delete operation failed" };
  }

  return result;
};
