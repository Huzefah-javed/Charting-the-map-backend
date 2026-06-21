import { getBooksModel } from "../../model/main/getBooksModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const bookController =asyncWrapper( async (req, res, next) => {
  let { publishEra, minRating, country, tags, languages, category, genre, pageNo=1 } = req.query;

  let filterQuery = {};

  if (!country) return res.json({ status: 401, msg: "No country selected" })
  country = Array.isArray(country) ? country : [country]
  publishEra = publishEra
    ? publishEra.split("-")
    : ["0000", new Date().getFullYear().toString()]
  minRating = minRating ? Number(minRating) : 0
  tags = Array.isArray(tags) ? tags : tags ? [tags] : []
  languages = Array.isArray(languages) ? languages : languages? [languages]:[]
  genre = Array.isArray(genre) ? genre : genre? [genre]:[]
  category = Array.isArray(category) ? category :category? [category]: ["Fiction", "Non-Fiction"]

  filterQuery = {country, publishEra, minRating, tags, languages, category, genre}
 const response =  await getBooksModel(filterQuery, pageNo)
  
   return res.status(200).json({ success: true, data: response });
});
