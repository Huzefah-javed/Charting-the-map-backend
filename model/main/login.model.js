import { users } from "../../schema/Users.schema.js";

export const login = async (email, password, role) => {
  let response = {};
  try {
    const data = await users.findOne(
      { email, password, role },
      { _id: 1, email: 1, name: 1, role: 1 },
    );
    if (!data) {
      response.msg = "No user found with this email or password !!";
      response.status = 404;
      response.success = false;
      return response;
    }
    response.data = data;
    response.msg = "Login successful !!";
    response.status = 200;
    response.success = true;
    return response;
  } catch (error) {
    response.msg = "Login failed !!";
    response.status = 500;
    response.success = false;
    return response;
  }
};
