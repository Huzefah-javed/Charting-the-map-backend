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
