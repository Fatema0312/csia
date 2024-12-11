import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

interface BookHistoryProps {
  studentId: string;
}

interface BookRecord {
  id: string;
  book: {
    "Book name": string;
    Author: string;
  };
  borrow_date: string;
  return_date: string;
  returned: boolean;
}

const BookHistory = ({ studentId }: BookHistoryProps) => {
  const [bookHistory, setBookHistory] = useState<BookRecord[]>([]);
  const { toast } = useToast();

  const fetchBookHistory = async () => {
    const { data, error } = await supabase
      .from("student_books")
      .select(`
        id,
        borrow_date,
        return_date,
        returned,
        book:books (
          "Book name",
          Author
        )
      `)
      .eq("user_id", studentId)
      .order("borrow_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch book history",
        variant: "destructive",
      });
      return;
    }

    setBookHistory(data || []);
  };

  useEffect(() => {
    fetchBookHistory();
  }, [studentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookHistory.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h4 className="font-medium">{record.book["Book name"]}</h4>
                <p className="text-sm text-gray-500">by {record.book.Author}</p>
                <p className="text-sm text-gray-500">
                  Borrowed: {new Date(record.borrow_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(record.return_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {record.returned ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5 mr-1" />
                    Returned
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <X className="h-5 w-5 mr-1" />
                    Not Returned
                  </div>
                )}
              </div>
            </div>
          ))}
          {bookHistory.length === 0 && (
            <p className="text-center text-gray-500">No book history available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookHistory;