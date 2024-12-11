import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen } from "lucide-react";

interface BookAssignmentProps {
  studentId: string;
  studentName: string;
  onAssignBook: () => void;
}

interface Book {
  Book_ID: number;
  "Book name": string;
  Author: string;
  Quantity: number;
}

const BookAssignment = ({ studentId, studentName, onAssignBook }: BookAssignmentProps) => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const fetchAvailableBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .gt("Quantity", 0);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch available books",
        variant: "destructive",
      });
      return;
    }

    setBooks(data || []);
  };

  const handleAssignBook = async () => {
    if (!selectedBook) {
      toast({
        title: "Error",
        description: "Please select a book",
        variant: "destructive",
      });
      return;
    }

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 30); // Set return date to 30 days from now

    const { error } = await supabase.from("student_books").insert([
      {
        user_id: studentId,
        book_id: parseInt(selectedBook),
        return_date: returnDate.toISOString(),
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to assign book",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Book assigned successfully",
    });
    
    onAssignBook();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen) {
        fetchAvailableBooks();
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          Assign Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Book to {studentName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book.Book_ID} value={book.Book_ID.toString()}>
                  {book["Book name"]} by {book.Author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAssignBook} className="w-full">
            Assign Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookAssignment;