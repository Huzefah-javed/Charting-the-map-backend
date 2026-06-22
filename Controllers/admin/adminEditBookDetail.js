import { adminAddBookModel } from "../../model/admin/AdminAddBookModel.js";
import { adminEditBookModel } from "../../model/admin/AdminEditBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";
import { AppError } from "../../utils/errorClass.js";

export const AdminEditBookDetail = asyncWrapper(async (req, res, next) => {

  let updateDoc= req.body;
  const {id} = req.params

  if (updateDoc.title && (typeof updateDoc.title !== "string" || updateDoc.title.trim() === "")) return  new AppError("Book title is required and must be a valid text string.", 400);
if (updateDoc.excerpt && updateDoc.excerpt.trim() === "") return new AppError("Book excerpt is required and must be a valid text string.", 400)
if (updateDoc.author && typeof updateDoc.author !== "string") return new AppError("Author name must be a text string.",400);
  
  const currentYear = new Date().getFullYear();
  
  if (updateDoc.publish_year && typeof updateDoc.publish_year !== "string") return  new AppError("Publication year must be a valid numeric string.", 400)
    if (parseInt(updateDoc.publish_year, 10) > currentYear) return new AppError(`Publication year cannot be in the future (max: ${currentYear}).`, 400)

const validStatuses = ["publish", "draft"];
  if (updateDoc.status && !validStatuses.includes(updateDoc.status)) return new AppError( 'Status must be explicitly set to either "Publish" or "Draft" ', 400)

if (updateDoc.genre && typeof updateDoc.genre !== "string") return  new AppError("Genre field must be provided as a string", 400)

if (updateDoc.languages  && !Array.isArray(updateDoc.languages)) return new AppError("Language field is required as as array.")
if (updateDoc.countries && !Array.isArray(updateDoc.countries))  return new AppError("countries field is required as as array.",400)
if (updateDoc.tags && !Array.isArray(updateDoc.tags))  return new AppError("tags field is required as as array.", 400);


if(updateDoc.rating) updateDoc.rating = Number(updateDoc.rating)
if (updateDoc.rating && (updateDoc.rating < 0 || updateDoc.rating > 5))  return new AppError( "Rating must be a numeric score between 1 and 5 stars.", 400)


const validTypes = ["Non-Fiction", "Fiction"];
  if (updateDoc.type && !validTypes.includes(updateDoc.type))  return new AppError('Type must be selected as either "Fiction" or "Non-fiction".',400)
if (updateDoc.book_cover_img_url && updateDoc.book_cover_img_url.trim() === "") return new AppError( "Book cover image reference path must be a string value.",400)
if (updateDoc.review_html &&  updateDoc.review_html.trim() === "") return new AppError("Content text layout payload data type error.", 400)
if(updateDoc.languages){
  updateDoc.languages =  updateDoc.languages.map((lang) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  });
}
if (updateDoc.tags) { 
  updateDoc.tags = updateDoc.tags?.map((tag) => {
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  });
}
if(updateDoc.genre) updateDoc.genre = updateDoc.genre && updateDoc.genre.charAt(0).toUpperCase() +updateDoc.genre.slice(1);

  const response = await adminEditBookModel(updateDoc, id);
  
   return res.status(200).json({ success: true,message:"Book updated successfully" });
});
