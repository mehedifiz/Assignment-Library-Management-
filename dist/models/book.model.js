"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
bookSchema.statics.updatequantity = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        book.copies -= quantity;
        if (book.copies <= 0) {
            book.copies = 0;
            book.available = false;
        }
        yield book.save();
    });
};
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
