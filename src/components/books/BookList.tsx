import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  quantity: number;
  isAvailable: boolean;
}

interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book Name</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.name}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell className="capitalize">{book.genre}</TableCell>
            <TableCell>{book.quantity}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${book.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {book.isAvailable ? 'Available' : 'Not Available'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookList;