import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      default: "Unknown Author",
      trim: true,
    },
    book_cover_img_url: {
      type: String,
      required: [true, "Book Image is required"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Fiction", "Non-Fiction"],
    },
    languages: {
      type: [String],
      default: ["English"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    publish_year: {
      type: String,
      default: "N/A",
    },
    genre: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    countries: {
      type: [String],
      default: [],
    },
    book_url: {
      type: String,
      default: "",
    },
    review_html: {
      type: String,
      required: [true, "Review body content is required"],
    },
    excerpt: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum:["publish", "draft"]
    },
  },
  {
    timestamps: true,
  },
);

bookSchema.index({ tags: 1 });
bookSchema.index({ countries: 1 });
bookSchema.index({ languages: 1 });
bookSchema.index({ genre: 1 });
bookSchema.index({ category: 1 });
bookSchema.index({ rating: -1 });
bookSchema.index({ publish_year: 1 });
bookSchema.index({ title: "text" });

export const Books = mongoose.model("Books_Review", bookSchema);
