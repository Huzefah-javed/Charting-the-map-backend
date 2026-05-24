import { Books } from "../../schema/Books.schema.js";

export const adminAddBookModel = async (data) => {
  let result;
  try {
     await Books.insertOne(data)
    result = { success: true, status: 200, msg:"Added successfully"}
      
  } catch (error) {
    result = {
      success: false,
      status: 500,
      msg: "something went wrong",
    };
  }
  return result;
};
