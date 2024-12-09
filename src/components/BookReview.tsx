import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface BookReviewProps {
  bookId: number;
  bookName: string;
}

const BookReview = ({ bookId, bookName }: BookReviewProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmitReview = () => {
    // Here we would typically send this to a backend
    toast({
      title: "Review Submitted",
      description: `Your review for ${bookName} has been submitted successfully.`,
    });
    setRating(0);
    setReview("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review {bookName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`focus:outline-none ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <StarIcon className="w-6 h-6" />
            </button>
          ))}
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSubmitReview} className="w-full">
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookReview;