import { Schema, model, Document, Types } from 'mongoose';
import { IBorrow } from '../interfaces/borrowintreface';


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



export const Borrow = model<IBorrow>('Borrow', borrowSchema);
