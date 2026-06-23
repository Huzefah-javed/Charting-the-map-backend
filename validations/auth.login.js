import z from "zod";

export const loginValidation  = z.object({
    email:z.string().email(),
    password:z.string().min(4),
    role:z.enum(["user","admin"])   
})