import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface LibraryEvent {
  id: number;
  name: string;
  date: Date;
  grades: string;
  description: string;
}

const LibraryEvents = () => {
  const [events, setEvents] = useState<LibraryEvent[]>([
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

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    grades: "",
    description: ""
  });

  const { toast } = useToast();

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.grades || !newEvent.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const event: LibraryEvent = {
      id: events.length + 1,
      name: newEvent.name,
      date: new Date(newEvent.date),
      grades: newEvent.grades,
      description: newEvent.description
    };

    setEvents([...events, event]);
    setNewEvent({ name: "", date: "", grades: "", description: "" });
    
    toast({
      title: "Success",
      description: "Event added successfully"
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Library Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="grades">Grades</Label>
                <Input
                  id="grades"
                  value={newEvent.grades}
                  onChange={(e) => setNewEvent({ ...newEvent, grades: e.target.value })}
                  placeholder="e.g., 9-12 or All Grades"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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