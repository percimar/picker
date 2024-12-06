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
import { createPicker } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  things: z
    .string({ message: "Enter at least one item" })
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      things: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const picker = await createPicker(values.things);
    toast.success("Picker Created!");
    navigate(`/picker/${picker.id}`);
    setLoading(false);
  };

  return (
    <div className="root-container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-8"
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
                    placeholder={`Option A\nOption B\nOption C`}
                    className="resize-none text-black"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Creating" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
