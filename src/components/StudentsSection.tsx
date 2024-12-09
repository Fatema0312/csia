import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { pipeline } from "@huggingface/transformers";
import { useToast } from "@/hooks/use-toast";

interface BookRecord {
  title: string;
  borrowDate: string;
  returnDate: string;
  returned?: boolean;
  fine?: number;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  currentBooks: BookRecord[];
  bookHistory: BookRecord[];
  totalFine: number;
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: "STD001",
    name: "John Smith",
    grade: "1",
    section: "Ekam",
    currentBooks: [
      {
        title: "Mathematics Grade 1",
        borrowDate: "2024-03-15",
        returnDate: "2024-04-15",
        fine: 0,
      },
    ],
    bookHistory: [
      {
        title: "English Basics",
        borrowDate: "2024-02-01",
        returnDate: "2024-03-01",
        returned: true,
        fine: 0,
      },
    ],
    totalFine: 0,
  },
  {
    id: "STD002",
    name: "Emma Davis",
    grade: "2",
    section: "Eins",
    currentBooks: [
      {
        title: "Science Explorer",
        borrowDate: "2024-03-10",
        returnDate: "2024-04-10",
        fine: 5,
      },
    ],
    bookHistory: [
      {
        title: "History Tales",
        borrowDate: "2024-01-15",
        returnDate: "2024-02-15",
        returned: true,
        fine: 2,
      },
    ],
    totalFine: 7,
  },
];

const StudentsSection = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const { toast } = useToast();

  const generateRecommendations = async (student: Student) => {
    try {
      const classifier = await pipeline("text-classification");

      // Combine all book titles for analysis
      const bookHistory = [...student.currentBooks, ...student.bookHistory]
        .map((book) => book.title)
        .join(" ");

      // Predefined book categories based on student's grade and reading history
      const potentialBooks = [
        "Advanced Mathematics",
        "Science Adventures",
        "World History",
        "Literature Classics",
        "Geography Explorer",
      ];

      // Get recommendations based on reading history
      const results = await Promise.all(
        potentialBooks.map(async (book) => {
          const result = await classifier(bookHistory, {
            labels: ["relevant", "not_relevant"],
          });
          
          return {
            book,
            score: Array.isArray(result) ? 
              result[0]?.score || 0 : 
              'score' in result ? result.score : 0
          };
        })
      );

      // Sort and get top 3 recommendations
      const topRecommendations = results
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((item) => item.book);

      setRecommendations(topRecommendations);
      
      toast({
        title: "Recommendations Generated",
        description: "Book recommendations have been updated based on reading history.",
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate book recommendations.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="w-48">
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ekam">Ekam</SelectItem>
                <SelectItem value="eins">Eins</SelectItem>
                <SelectItem value="out">Out</SelectItem>
                <SelectItem value="ena">Ena</SelectItem>
                <SelectItem value="uno">Uno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Books</TabsTrigger>
            <TabsTrigger value="history">Book History</TabsTrigger>
            <TabsTrigger value="fines">Fines</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) =>
                  student.currentBooks.map((book, bookIndex) => (
                    <TableRow key={`${student.id}-${bookIndex}`}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>Grade {student.grade}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.borrowDate}</TableCell>
                      <TableCell>{book.returnDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) =>
                  student.bookHistory.map((book, bookIndex) => (
                    <TableRow key={`${student.id}-history-${bookIndex}`}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.borrowDate}</TableCell>
                      <TableCell>{book.returnDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          book.returned
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {book.returned ? "Returned" : "Pending"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="fines">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Book Title</TableHead>
                  <TableHead>Fine Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) =>
                  [...student.currentBooks, ...student.bookHistory]
                    .filter((book) => book.fine && book.fine > 0)
                    .map((book, bookIndex) => (
                      <TableRow key={`${student.id}-fine-${bookIndex}`}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>${book.fine?.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                            Unpaid
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-4">
              {students.map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-500">ID: {student.id}</p>
                    </div>
                    <button
                      onClick={() => generateRecommendations(student)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                      Generate Recommendations
                    </button>
                  </div>
                  {recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Recommended Books:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {recommendations.map((book, index) => (
                          <li key={index} className="text-sm">{book}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentsSection;
