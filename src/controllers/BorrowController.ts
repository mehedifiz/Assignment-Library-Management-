import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';

export  const borrowrouter = express.Router();


borrowrouter.post("/" , async(req ,res)=>{

    try {
    const borrow = await Borrow.create(req.body);  

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message || error,
    });
  }

})

borrowrouter.get("/" , async(req,res)=>{

    try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: "$quantity" }
           }
      },
      {
        $lookup: {
          from: "books",  
          localField: "_id",
           foreignField: "_id",
          as: "bookdata"
        }
      },
      {
        $unwind: "$bookdata"
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookdata.title",
            isbn: "$bookdata.isbn"
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "books summary retrieved successfully",
      data
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error.message || error
    });
  }

})

