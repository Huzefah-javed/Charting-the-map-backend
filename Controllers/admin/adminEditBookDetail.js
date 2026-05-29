import { adminAddBookModel } from "../../model/admin/AdminAddBookModel.js";
import { adminEditBookModel } from "../../model/admin/AdminEditBookModel.js";

export const AdminEditBookDetail = async (req, res, next) => {
  let updateDoc= req.body;
  const {id} = req.params                    
  console.log(id)
  if (updateDoc.title && (typeof updateDoc.title !== "string" || updateDoc.title.trim() === "")) {
    return next({
      status: 400,
      msg: "Book title is required and must be a valid text string.",
    });
}

if (updateDoc.excerpt && updateDoc.excerpt.trim() === ""){
    return next({
        status: 400,
        msg: "Book excerpt is required and must be a valid text string.",
    });
}

if (updateDoc.author && typeof updateDoc.author !== "string") {
    return next({ status: 400, msg: "Author name must be a text string." });
  }
  
  const currentYear = new Date().getFullYear();
  
  if (updateDoc.publish_year && typeof updateDoc.publish_year !== "string") {
      return next({
          status: 400,
          msg: "Publication year must be a valid numeric string.",
        });
    }
    
    if (parseInt(updateDoc.publish_year, 10) > currentYear) {
    return next({
      status: 400,
      msg: `Publication year cannot be in the future (max: ${currentYear}).`,
    });
}

const validStatuses = ["publish", "draft"];
  if (updateDoc.status && !validStatuses.includes(updateDoc.status)) {
    return next({
      status: 400,
      msg: 'Status must be explicitly set to either "Publish" or "Draft".',
    });
}

if (updateDoc.genre && typeof updateDoc.genre !== "string") {
    return next({
      status: 400,
      msg: "Genre field must be provided as a string",
    });
}

if (updateDoc.languages  && !Array.isArray(updateDoc.languages)) {
    return next({
        status: 400,
        msg: "Language field is required as as array.",
    });
}
if (updateDoc.countries && !Array.isArray(updateDoc.countries)) {
    return next({
      status: 400,
      msg: "countries field is required as as array.",
    });
}

if (updateDoc.tags && !Array.isArray(updateDoc.tags)) {
    return next({ status: 400, msg: "tags field is required as as array." });
}

if(updateDoc.rating) updateDoc.rating = Number(updateDoc.rating)
if (updateDoc.rating && (updateDoc.rating < 0 || updateDoc.rating > 5)) {
    return next({
        status: 400,
        msg: "Rating must be a numeric score between 1 and 5 stars.",
    });
}

const validTypes = ["Non-Fiction", "Fiction"];
  if (updateDoc.type && !validTypes.includes(updateDoc.type)) {
    return next({
        status: 400,
      msg: 'Type must be selected as either "Fiction" or "Non-fiction".',
    });
}

if (updateDoc.book_cover_img_url && updateDoc.book_cover_img_url.trim() === "") {
    return next({
      status: 400,
      msg: "Book cover image reference path must be a string value.",
    });
}

if (updateDoc.review_html &&  updateDoc.review_html.trim() === "") {
    return next({
        status: 400,
        msg: "Content text layout payload data type error.",
    });
}
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

  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.status(response.status).json(response);
};
