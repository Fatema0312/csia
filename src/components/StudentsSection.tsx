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
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BookAssignment from "./student/BookAssignment";
import BookHistory from "./student/BookHistory";

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
}

const StudentsSection = () => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const { toast } = useToast();

  const fetchStudents = async () => {
    let query = supabase.from("profiles").select("*");

    if (selectedGrade) {
      query = query.eq("grade", selectedGrade);
    }
    if (selectedSection) {
      query = query.eq("section", selectedSection);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
      return;
    }

    setStudents(data || []);
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedGrade, selectedSection]);

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
            <TabsTrigger value="current">Students</TabsTrigger>
            <TabsTrigger value="history">Book History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>Grade {student.grade}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      <BookAssignment
                        studentId={student.id}
                        studentName={student.name}
                        onAssignBook={fetchStudents}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id}>
                  <h3 className="font-semibold mb-2">{student.name}</h3>
                  <BookHistory studentId={student.id} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentsSection;