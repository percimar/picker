import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { LinkToCopy } from "@/components/ui/LinkToCopy";
import { Textarea } from "@/components/ui/Textarea";
import { createPicker, CreatePickerResponse } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  const [picker, setPicker] = useState<CreatePickerResponse | null>();

  const onSubmit = async (values: FormValues) => {
    const createdPicker = await createPicker(values.things);
    setPicker(createdPicker);
    toast.success("Picker Created!");
  };

  return (
    <div className="root-container">
      {picker ? (
        <div className="space-y-4 md:space-y-8">
          <div className="text-2xl font-semibold tracking-tight">
            Picker Details
          </div>
          <LinkToCopy label="Voter Link" value={picker.voterLink} />
          <LinkToCopy label="Results Link" value={picker.resultsLink} />
          {/* TODO: Back to home */}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-8"
          >
            <div>
              <div className="text-2xl font-semibold tracking-tight">
                Picker
              </div>
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
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Create
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
