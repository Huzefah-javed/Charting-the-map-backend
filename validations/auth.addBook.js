import z from "zod";

export const AddBookValidation = z.object({
  author: z.string().trim().min(1),
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
  excerpt: z.string().trim().min(1),
  content: z.string().trim().min(1),
  genre: z.string().trim().toLowerCase().min(1),
  language: z.array(z.enum(["French", "English"])),
  countries: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
  publish_year: z.string().refine(
    (year) => {
      return Number(year) > 1500 && Number(year) <= new Date().getFullYear();
    },
    { message: "Year must be between 1501 and the current year" },
  ),
  rating: z.number().min(0).max(5),
  status: z.enum(["publish", "draft"]),
  type: z.enum(["Non-Fiction", "Fiction"]),
  title: z.string().trim().min(1),
});
