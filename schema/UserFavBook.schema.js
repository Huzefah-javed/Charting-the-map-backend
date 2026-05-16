import mongoose from 'mongoose';

const userFavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Book ID is required'],
    },
  },
  {
    timestamps: true, 
  }
)

userFavoriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const UserFavorite = mongoose.model('UserFavorite', userFavoriteSchema);
