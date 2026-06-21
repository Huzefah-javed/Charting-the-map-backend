import { Books } from "../../schema/Books.schema.js";

export const getBooksModel = async (filterQuery, pageNo) => {
  const { country, publishEra, minRating, tags, languages, category, genre } =
    filterQuery;
  let query = {
    countries: { $in: country },
    publish_year: { $gte: publishEra[0], $lte: publishEra[1] },
    rating: { $gte: minRating },
    category: { $in: category },
    status: "publish",
  };
  if (tags.length > 0) query.tags = { $in: tags };
  if (languages.length > 0) query.languages = { $in: languages };
  if (genre.length > 0) query.genre = { $in: genre };

  pageNo = (Number(pageNo) - 1) * 20;

  const data = await Books.find(query, { review_html: 0, review_date: 0 })
    .limit(20)
    .skip(pageNo);
  return data;
};
