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
  console.log("1");
  if (!title || typeof title !== "string" || title.trim() === "") {
    return next({
      status: 400,
      msg: "Book title is required and must be a valid text string.",
    });
    console.log("2");
  }
  if (!excerpt || typeof excerpt !== "string" || excerpt.trim() === "") {
    return next({
      status: 400,
      msg: "Book excerpt is required and must be a valid text string.",
    });
  }

  console.log("3");
  if (!author && typeof author !== "string") {
    return next({ status: 400, msg: "Author name must be a text string." });
  }
  console.log("4");

  const currentYear = new Date().getFullYear();

  if (!publish_year || typeof publish_year !== "string") {
    return next({
      status: 400,
      msg: "Publication year must be a valid numeric string.",
    });
  }

  console.log("5");
  if (parseInt(publish_year, 10) > currentYear) {
    return next({
      status: 400,
      msg: `Publication year cannot be in the future (max: ${currentYear}).`,
    });
  }

  console.log("6");
  const validStatuses = ["publish", "draft"];
  if (!status || !validStatuses.includes(status)) {
    return next({
      status: 400,
      msg: 'Status must be explicitly set to either "Publish" or "Draft".',
    });
  }
  console.log("7");

  if (!genre || typeof publish_year !== "string") {
    return next({
      status: 400,
      msg: "Genre field must be provided as a string",
    });
  }
  console.log("8");

  if (!language || !Array.isArray(language)) {
    return next({
      status: 400,
      msg: "Language field is required as as array.",
    });
  }
  console.log("9");
  if (!countries || !Array.isArray(countries)) {
    return next({
      status: 400,
      msg: "countries field is required as as array.",
    });
  }

  console.log("10");
  if (!tags || !Array.isArray(tags)) {
    return next({ status: 400, msg: "tags field is required as as array." });
  }

  console.log("12");
  if (typeof rating !== "number" && rating > 1 && rating < 5) {
    return next({
      status: 400,
      msg: "Rating must be a numeric score between 1 and 5 stars.",
    });
  }
  console.log("13");

  const validTypes = ["Non-Fiction", "Fiction"];
  if (!type || !validTypes.includes(type)) {
    return next({
      status: 400,
      msg: 'Type must be selected as either "Fiction" or "Non-fiction".',
    });
  }
  console.log("14");

  if (!bookImg && typeof bookImg !== "string" && bookImg.trim() === "") {
    return next({
      status: 400,
      msg: "Book cover image reference path must be a string value.",
    });
  }
  console.log("15");

  if (!content && typeof content !== "string" && content.trim() === "") {
    return next({
      status: 400,
      msg: "Content text layout payload data type error.",
    });
  }
  console.log("16");

  language = language.map((lang) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  });
  console.log("17");

  tags = tags.map((tag) => {
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  });
  console.log("18");

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
