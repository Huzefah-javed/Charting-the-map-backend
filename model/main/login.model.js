import { users } from "../../schema/Users.schema.js";
import { AppError } from "../../utils/errorClass.js";

export const login = async (email, password, role) => {
    const data = await users.findOne(
      { email, password, role },
      { _id: 1, email: 1, name: 1, role: 1 },
    );
    if (!data) new AppError("No user found with this email or password !!", 404)
      return data;
};
