import { Schema, model, Document, Types } from 'mongoose';
import { IBorrow } from '../interfaces/borrowintreface';
import { Book } from './book.model';


const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, "Book  is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 1
    },
    dueDate: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  {
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {

console.log(this.book );
  const book = await Book.findById(this.book);
  console.log("book", book);
  if (!book) {
    console.log("Book not found");
    
   return next(new Error('Book not found'));
  }

  if (book.copies < this.quantity) {
    return next(new Error("Not enough copy available"));
  }
next()

})

borrowSchema.post('save', async function (doc) {
  const book = await Book.findById(doc.book);

  console.log(book);
   

  book.copies -= doc.quantity;
  if (book.copies <= 0) {
    book.available = false;
    book.copies = 0;
  }

  await book.save();
});



export const Borrow = model<IBorrow>('Borrow', borrowSchema);
