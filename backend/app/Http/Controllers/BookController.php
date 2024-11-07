<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // List all books
    public function index()
    {
        return response()->json(Book::get(), 200);
    }

    // Show details of a specific book
    public function show($id)
    {
        $book = Book::find($id);
        if ($book) {
            return response()->json($book, 200);
        }
        return response()->json(['message' => 'Book not found'], 404);
    }

    // Create a new book
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'genre' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $book = Book::create($validatedData);
        return response()->json($book, 200);
    }

    // Update an existing book
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if ($book) {
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'author' => 'sometimes|required|string|max:255',
                'published_year' => 'sometimes|required|integer',
                'genre' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
            ]);

            $book->update($validatedData);
            return response()->json($book, 200);
        }

        return response()->json(['message' => 'Book not found'], 404);
    }

    // Delete a book
    public function destroy($id)
    {
        $book = Book::find($id);
        if ($book) {
            $book->delete();
            return response()->json(['message' => 'Book deleted successfully'], 200);
        }

        return response()->json(['message' => 'Book not found'], 404);
    }
}
