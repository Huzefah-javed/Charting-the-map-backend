import { Books } from "../../schema/Books.schema.js";

export const adminEditBookModel = async (updateObj, id) => {
  let result;
  try {
     await Books.findByIdAndUpdate(id, updateObj)
    result = { success: true, status: 200, msg:"Edited successfully"}
      
  } catch (error) {
    result = {
      success: false,
      status: 500,
      msg: "something went wrong while updating",
    };
  }
  return result;
};
