import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface LibraryEvent {
  id: number;
  name: string;
  date: Date;
  grades: string;
  description: string;
}

const LibraryEvents = () => {
  const [events] = useState<LibraryEvent[]>([
    {
      id: 1,
      name: "Book Fair",
      date: new Date("2024-04-15"),
      grades: "All Grades",
      description: "Annual book fair featuring new releases and classic literature."
    },
    {
      id: 2,
      name: "Reading Challenge",
      date: new Date("2024-04-20"),
      grades: "6-8",
      description: "Middle school reading competition with prizes."
    },
    {
      id: 3,
      name: "Author Visit",
      date: new Date("2024-05-01"),
      grades: "9-12",
      description: "Meet and greet with bestselling young adult author."
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Library Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Grades</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{format(event.date, "MMMM dd, yyyy")}</TableCell>
                  <TableCell>{event.grades}</TableCell>
                  <TableCell>{event.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryEvents;