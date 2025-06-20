import { Schema, model, Document } from 'mongoose';
import { BookModel, IBook } from '../interfaces/book.interface';


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

bookSchema.statics.updatequantity = async function (bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  
  book.copies -= quantity;
  if (book.copies <= 0) {
    book.copies = 0;
    book.available = false;
  }

  await book.save();
};



export const Book = model<IBook, BookModel>('Book', bookSchema);
