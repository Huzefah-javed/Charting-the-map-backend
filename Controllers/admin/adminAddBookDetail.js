import { adminAddBookModel } from "../../model/admin/AdminAddBookModel.js";

export const AdminAddBookDetail = async (req, res, next) => {
  let {
    author,
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
  
  if (!title || typeof title !== "string" || title.trim() === "") {
    return next({
      status: 400,
      msg: "Book title is required and must be a valid text string.",
    });
  }
  if (!excerpt || typeof excerpt !== "string" || excerpt.trim() === "") {
    return next({
      status: 400,
      msg: "Book excerpt is required and must be a valid text string.",
    });
  }

  if (!author && typeof author !== "string") {
    return next({ status: 400, msg: "Author name must be a text string." });
  }
  
  const currentYear = new Date().getFullYear();

  if (!publish_year || typeof publish_year !== "string") {
    return next({
      status: 400,
      msg: "Publication year must be a valid numeric string.",
    });
  }

  if (parseInt(publish_year, 10) > currentYear) {
    return next({
      status: 400,
      msg: `Publication year cannot be in the future (max: ${currentYear}).`,
    });
  }

  const validStatuses = ["publish", "draft"];
  if (!status || !validStatuses.includes(status)) {
    return next({
      status: 400,
      msg: 'Status must be explicitly set to either "Publish" or "Draft".',
    });
  }
  
  if (!genre || typeof publish_year !== "string") {
    return next({
      status: 400,
      msg: "Genre field must be provided as a string",
    });
  }
  
  if (!language || !Array.isArray(language)) {
    return next({
      status: 400,
      msg: "Language field is required as as array.",
    });
  }
  if (!countries || !Array.isArray(countries)) {
    return next({
      status: 400,
      msg: "countries field is required as as array.",
    });
  }

  if (!tags || !Array.isArray(tags)) {
    return next({ status: 400, msg: "tags field is required as as array." });
  }

  if (typeof rating !== "number" && rating > 1 && rating < 5) {
    return next({
      status: 400,
      msg: "Rating must be a numeric score between 1 and 5 stars.",
    });
  }
  
  const validTypes = ["Non-Fiction", "Fiction"];
  if (!type || !validTypes.includes(type)) {
    return next({
      status: 400,
      msg: 'Type must be selected as either "Fiction" or "Non-fiction".',
    });
  }
  
  if (!bookImg && typeof bookImg !== "string" && bookImg.trim() === "") {
    return next({
      status: 400,
      msg: "Book cover image reference path must be a string value.",
    });
  }
  
  if (!content && typeof content !== "string" && content.trim() === "") {
    return next({
      status: 400,
      msg: "Content text layout payload data type error.",
    });
  }
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

  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.status(response.status).json(response);
};
