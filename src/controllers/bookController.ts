import { z } from 'zod';
import { Book } from './../models/book.model';
import express, { Request, Response } from 'express';

export  const bookrouter = express.Router();


const createBookZod = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    isbn: z.string(),
    description: z.string(),
    copies: z.number(),
    available: z.boolean(),
    

})

bookrouter.post('/', async(req : Request , res : Response)=>{
     try {
    const validatedbook = createBookZod.parse(req.body);
    const newBook = new Book(validatedbook);
    const result = await newBook.save();
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });


    // const result = await Book.create(req.body);
    // res.status(201).json({
    //   success: true,
    //   message: 'Book created successfully',
    //   data: result,
    // });
  } catch (error : any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error:error,
    });
  }
});


// All books
bookrouter.get('/', async (req: Request, res: Response) => {
  try {
    const {
      filter, sort = "asc",limit = 10, } = req.query;

    let Books ; 

    if (filter) {
      Books = await Book.find({genre : filter}).limit(3)
    } else{
        Books = await Book.find({})
            .sort({ createdAt : sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
    }

     
    

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: Books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieve books',
      error: error.message || error,
    });
  }
});

bookrouter.get("/:id" , async (req , res)=>{

   try {
    const book = await Book.findById(req.params.id)

    console.log(book);
    if(book){
      res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      });
    } else{
      res.json({
        success: false,
        message: 'Book not found',
      });
    }
    
    
   } catch (error) {
    
   }

} )


bookrouter.put("/:id" , async(req ,res)=>{
  try {

    // console.log(req.body);

   const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,})

      // console.log(book);
      if(book){
        res.json({
          success: true,
          message: 'Book updated successfully',
          data: book,
        }); 
      }else{
      res.json({
        success: false,
        message: 'Book not found',
      });
    }
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
    
  }
})
 


bookrouter.delete("/:id" , async(req ,res)=>{
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (book) {
      res.json({
        success: true,
        message: "Book deleted successfully",
        "data": book
      });
    } else {
      res.json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
})

