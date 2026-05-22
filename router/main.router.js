import { Router } from "express";
import { bookController } from "../Controllers/main/bookController.js";
import { jwtVerification } from "../middlewares/authentication.js";
import { userRouter } from "./user.router.js";
import { loginController } from "../Controllers/main/loginController.js";
import { logoutController } from "../Controllers/main/logoutController.js";
import { roleChecker } from "../middlewares/roleChecker.js";
import { CountryTotalRev } from "../Controllers/main/countryTotalRevController.js";
import { adminRouter } from "./admin.router.js";

export const mainRouter = Router()


mainRouter.get("/books", bookController)
mainRouter.get("/reviewPerCountry", CountryTotalRev)
mainRouter.post("/userLogin", loginController)
mainRouter.post("/logout", logoutController)

mainRouter.use("/user", jwtVerification, roleChecker("user"),userRouter)
mainRouter.use("/admin",jwtVerification, roleChecker("admin"), adminRouter)