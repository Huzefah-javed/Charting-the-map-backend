import { Router } from "express";
import { adminDashboardDetail } from "../Controllers/admin/adminDashboardDetail.js";
import { adminCategoryDetail } from "../Controllers/admin/adminCategoryDetail.js";
import { adminTagsDetail } from "../Controllers/admin/adminTagsDetails.js";

export const adminRouter = Router()


adminRouter.get("/DashboardDetails", adminDashboardDetail)
adminRouter.get("/CategoryDetails", adminCategoryDetail)
adminRouter.get("/TagsDetails", adminTagsDetail)