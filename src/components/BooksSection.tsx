import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddBookForm from "./books/AddBookForm";
import BookList from "./books/BookList";

interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  quantity: number;
  isAvailable: boolean;
}

const BooksSection = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  
  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*');
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books",
        variant: "destructive",
      });
      return;
    }

    const transformedBooks = data.map(book => ({
      id: book.Book_ID,
      name: book["Book name"],
      author: book.Author,
      genre: book.Genre || "",
      quantity: book.Quantity || 0,
      isAvailable: (book.Quantity || 0) > 0
    }));

    setBooks(transformedBooks);
  };

  useEffect(() => {
    fetchBooks();

    const subscription = supabase
      .channel('books_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'books' }, 
        () => {
          fetchBooks();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBookForm onBookAdded={fetchBooks} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Book Database</CardTitle>
        </CardHeader>
        <CardContent>
          <BookList books={books} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksSection;