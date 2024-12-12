import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddBookFormProps {
  onBookAdded: () => void;
}

const AddBookForm = ({ onBookAdded }: AddBookFormProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      bookName: "",
      author: "",
      genre: "",
      quantity: "1",
    },
  });

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from('books')
      .insert([{
        "Book name": data.bookName,
        Author: data.author,
        Book_ID: Date.now(),
        Genre: data.genre,
        Quantity: parseInt(data.quantity),
      }]);

    if (error) {
      console.error('Error adding book:', error);
      toast({
        title: "Error",
        description: "Failed to add book: " + error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: `Successfully added ${data.bookName} to the library.`,
    });
    
    form.reset();
    onBookAdded();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bookName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter book name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="biography">Biography</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="poetry">Poetry</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Add Book</Button>
      </form>
    </Form>
  );
};

export default AddBookForm;