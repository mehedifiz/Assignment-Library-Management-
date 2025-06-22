"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./controllers/bookController");
const BorrowController_1 = require("./controllers/BorrowController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING");
});
app.use("/api/books", bookController_1.bookrouter);
app.use("/api/borrow", BorrowController_1.borrowrouter);
// not found
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
exports.default = app;
