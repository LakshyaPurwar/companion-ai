"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { Category, Companion } from "@prisma/client";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(200, {
    message: "Instruction requires atleast 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed requires atleast 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export function CompanionForm({ initialData, categories }: CompanionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const { toast } = useToast();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        //Then we must update the data with a patch request
        await axios.patch(`api/companion/${initialData.id}`, values);
        toast({
          title: "Success",
          description: "Companion was updated successfully!",
        });
      } else {
        await axios.put("api/companion", values);
        toast({
          title: "Success",
          description: "Companion was created successfully!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: "Something went wrong!",
      });
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information about your companion
              </p>
            </div>
          </div>
          <Separator className="bg-primary/10" />
          <FormField
            control={form.control}
            name="src"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Source</FormLabel> */}
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Cristiano Ronaldo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Cristiano Ronaldo , caption of National Soccer Team Portugal"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short Description for your AI Companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Id</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => {
                        return (
                          <SelectItem value={category.id}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Your AI companion shall belong to the chosen category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions to configure your AI Companion.
              </p>
            </div>
          </div>
          <Separator className="bg-primary/10" />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={PREAMBLE}
                    className="resize-y h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  These instructions will be used to configure your AI
                  Companion.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seed</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-y h-[400px]"
                    placeholder={SEED_CHAT}
                    // className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mention how you want your AI Companion to chat with you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your companion" : "Create your companion"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
