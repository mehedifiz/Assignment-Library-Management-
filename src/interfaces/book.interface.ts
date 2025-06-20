import { Model, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}


export interface BookModel extends Model<IBook> {
  updatequantity(bookId: Types.ObjectId, quantity: number): void ;
}