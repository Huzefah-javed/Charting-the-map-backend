import { Books } from "../../schema/Books.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const adminEditBookModel = async (updateObj, id) => {
  const book =   await Books.findByIdAndUpdate(id, updateObj)   
  if(!book) new AppError("No book found with this id",401)  
  };
