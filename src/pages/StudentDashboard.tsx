import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookReview from "@/components/BookReview";
import { useState } from "react";

interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  borrowDate?: string;
  returnDate?: string;
}

const StudentDashboard = () => {
  const [currentBooks] = useState<Book[]>([
    {
      id: 1,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      borrowDate: "2024-03-01",
      returnDate: "2024-04-01",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Books</TabsTrigger>
          <TabsTrigger value="history">Book History</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentBooks.map((book) => (
                  <Card key={book.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{book.name}</h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                        <p className="text-sm">Return by: {book.returnDate}</p>
                      </div>
                      <BookReview bookId={book.id} bookName={book.name} />
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Book History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your reading history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your book reviews will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Books</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Book recommendations based on your reading history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;