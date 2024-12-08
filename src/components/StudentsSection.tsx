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
import { useState } from "react";

// Mock data for demonstration
const mockStudents = [
  {
    id: "STD001",
    name: "John Smith",
    grade: "1",
    section: "Ekam",
    books: [
      {
        title: "Mathematics Grade 1",
        borrowDate: "2024-03-15",
        returnDate: "2024-04-15",
      },
    ],
  },
  {
    id: "STD002",
    name: "Emma Davis",
    grade: "2",
    section: "Eins",
    books: [
      {
        title: "Science Explorer",
        borrowDate: "2024-03-10",
        returnDate: "2024-04-10",
      },
    ],
  },
];

const StudentsSection = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

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

        <div className="rounded-md border">
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
              {mockStudents.map((student) =>
                student.books.map((book, bookIndex) => (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsSection;