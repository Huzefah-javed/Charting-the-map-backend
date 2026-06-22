import z from "zod";

export const AddBookValidation = z.object({
  author: z.string(),
  bookImg: z
    .string()
    .url()
    .refine(
      (url) => {
        const parsedUrl = new URL(url);
        const pathName = parsedUrl.pathname;
        const validFormat = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
        return validFormat.some((ext) => pathName.endsWith(ext));
      },
      {
        message:
          "Invalid url ,make sure image has following format 'jpg', 'jpeg', 'png', 'webp', 'svg'",
      },
    ),
  excerpt: z.string().trim(),
  content: z.string().trim(),
  genre: z.string().trim().toLowerCase(),
  language: z.array(z.enum(["French", "English"])),
  countries: z.array(z.string()),
  tags: z.array(z.string()),
  publish_year: z.string().refine(
    (year) => {
      return Number(year) > 1500 && Number(year) <= new Date().getFullYear();
    },
    { message: "Year must be between 1501 and the current year" },
  ),
  rating:z.number().min(0).max(5),
  status:z.enum(["publish", "draft"]),
  type:z.enum(["Non-Fiction", "Fiction"]),
  title:z.string().trim()
});
