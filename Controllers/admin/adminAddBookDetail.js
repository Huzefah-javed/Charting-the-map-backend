import { adminAddBookModel } from "../../model/admin/AdminAddBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";
import { AppError } from "../../utils/errorClass.js";
export const AdminAddBookDetail = asyncWrapper(async (req, res, next)=>{   
   let {author,
    bookImg,
    excerpt,
    content,
    genre,
    language,
    countries,
    tags,
    publish_year,
    rating,
    status,
    title,
    type,
  } = req.body;
  
  if (!title || typeof title !== "string" || title.trim() === "") return new AppError( "Book title is required and must be a valid text string.",400)
  if (!excerpt || typeof excerpt !== "string" || excerpt.trim() === "") return new AppError(  "Book excerpt is required and must be a valid text string.",400);
  

  if (!author && typeof author !== "string") return new AppError("Author name must be a text string.",400) 
  const currentYear = new Date().getFullYear();

  if (!publish_year || typeof publish_year !== "string") {
    return new AppError(  "Publication year must be a valid numeric string.",400);
  }

  if (parseInt(publish_year, 10) > currentYear) {
    return new AppError(  `Publication year cannot be in the future (max: ${currentYear}).`,400);
  }

  const validStatuses = ["publish", "draft"];
  if (!status || !validStatuses.includes(status)) {
    return new AppError(  'Status must be explicitly set to either "Publish" or "Draft".',400);
  }
  
  if (!genre || typeof publish_year !== "string") {
    return new AppError(  "Genre field must be provided as a string",400);
  }
  
  if (!language || !Array.isArray(language)) {
    return new AppError(  "Language field is required as as array.",400);
  }
  if (!countries || !Array.isArray(countries)) {
    return new AppError(  "countries field is required as as array.",400);
  }

  if (!tags || !Array.isArray(tags))return new AppError("tags field is required", 400)

  if (typeof rating !== "number" && rating > 1 && rating < 5) return new AppError(  "Rating must be a numeric score between 1 and 5 stars.",400);
  
  const validTypes = ["Non-Fiction", "Fiction"];
  if (!type || !validTypes.includes(type)) return new AppError('Type must be selected as either "Fiction" or "Non-fiction".',400);
  
  
  if (!bookImg && typeof bookImg !== "string" && bookImg.trim() === "") return new AppError(  "Book cover image reference path must be a string value.",400);
  
  
  if (!content && typeof content !== "string" && content.trim() === "") return new AppError(  "Content text layout payload data type error.",400);
  
  language = language.map((lang) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  });
  tags = tags.map((tag) => {
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  });
  genre = genre.charAt(0).toUpperCase() + genre.slice(1);
  const response = await adminAddBookModel({
    title,
    excerpt,
    author: author,
    book_cover_img_url: bookImg,
    review_html: content,
    genre,
    languages: language,
    countries,
    publish_year,
    rating: rating,
    status,
    tags,
    category: type,
  });

  return res.status(201).json({message:"Added book successfully"});
});
