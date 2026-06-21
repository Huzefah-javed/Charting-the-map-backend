import { Books } from "../../schema/Books.schema.js";

export const adminAddBookModel = async (data) => {
     await Books.insertOne(data)
};
