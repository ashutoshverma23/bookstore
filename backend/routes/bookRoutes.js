import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


//books ko get karne ke liye
//working with mongoose is asynchronous process so we add a async here

//so post here is used to send data to the database
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }
        //creating a new book oblject
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });
        //saving the book
        const savedBook = await newBook.save();

        //sending the saved book as response
        return res.status(201).json(savedBook);

    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ error: 'Database error' });
    }
});

//Routing all the books from the database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        //we can change here how we want to receive the data
        //like we can send only the title of the book
        return res.status(200).json({
            count: books.length,
            books: books,
        });
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ error: 'Database error' });
    }
});

//Getting a single book by id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ error: 'Database error' });
    }
});

//Updating a book by id
//put is used to update the data in the database
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book updated successfully' });
    }
    catch (error) {
        console.log('Error:', error);
        response.status(500).json({ error: 'Database error' });
    }
});

//Deleting a book by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        console.log('Error:', error);
        response.status(500).json({ error: 'Database error' });
    }
});

export default router;