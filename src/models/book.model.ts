import { Schema, model, Document } from 'mongoose';
import { IBook } from '../interfaces/book.interface';


const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
 required: [true, "book title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    genre: {
      type: String,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      required: true,
      uppercase: true
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true
     
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook>('Book', bookSchema);
