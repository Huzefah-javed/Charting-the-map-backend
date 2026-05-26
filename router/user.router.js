import { Router } from "express";
import { addFavoriteBookController } from "../Controllers/user/addFavBook.js";
import { getFavoriteBookController } from "../Controllers/user/getFavBook.js";
import { getBookReview } from "../Controllers/user/getBookReview.js";
import { deleteFavBook } from "../Controllers/user/deleteFavBook.js";

export const userRouter = Router()

userRouter.post("/readingList", addFavoriteBookController)
userRouter.get("/readingList", getFavoriteBookController)
userRouter.delete("/readingList/:docId", deleteFavBook)
userRouter.get("/book/:bookId", getBookReview)
