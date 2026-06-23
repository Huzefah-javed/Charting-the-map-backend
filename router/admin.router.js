import { Router } from "express";
import { adminDashboardDetail } from "../Controllers/admin/adminDashboardDetail.js";
import { adminCategoryDetail } from "../Controllers/admin/adminCategoryDetail.js";
import { adminTagsDetail } from "../Controllers/admin/adminTagsDetails.js";
import { AdminBooksDetail } from "../Controllers/admin/adminBooksDetail.js";
import { AdminAddBookDetail } from "../Controllers/admin/adminAddBookDetail.js";
import { AdminEditBookDetail } from "../Controllers/admin/adminEditBookDetail.js";
import { AdminDeleteBookDetail } from "../Controllers/admin/adminDeleteBookDetail.js";
import { validationCheck } from "../middlewares/validationCheck.js";
import { AddBookValidation } from "../validations/auth.addBook.js";
import { editBookValidation } from "../validations/auth.editBook.js";

export const adminRouter = Router()


adminRouter.get("/DashboardDetails", adminDashboardDetail)
adminRouter.get("/CategoryDetails", adminCategoryDetail)
adminRouter.get("/TagsDetails", adminTagsDetail)
adminRouter.get("/Books", AdminBooksDetail)
adminRouter.post("/AddBook", validationCheck(AddBookValidation), AdminAddBookDetail)
adminRouter.put("/EditBook/:id", validationCheck(editBookValidation), AdminEditBookDetail)
adminRouter.delete("/DeleteBook/:id", AdminDeleteBookDetail)