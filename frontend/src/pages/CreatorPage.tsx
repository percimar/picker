import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  things: z
    .string()
    .min(1, "Enter at least one item")
    .transform((value) =>
      value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    ),
});
type FormValues = z.infer<typeof formSchema>;

export const CreatorPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      things: [],
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-purple-glow container mx-auto my-8 min-w-96 max-w-max space-y-4 rounded-lg bg-slate-900 p-4 text-white md:my-16 md:space-y-8 md:p-8"
      >
        <div>
          <div className="text-2xl font-semibold tracking-tight">Picker</div>
          <div className="text-sm font-light text-gray-300">
            Preferential voting made easy
          </div>
        </div>
        <FormField
          control={form.control}
          name="things"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Choices</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Option A
Option B
Option C`}
                  className="resize-none text-black"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Create
        </Button>
      </form>
    </Form>
  );
};
