import mongoose from "mongoose";
import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const adminDeleteBookModel = async (id) => {
    const deletedBook = await Books.findByIdAndDelete(id);
    if (!deletedBook) new AppError("No book found", 401)
  };
