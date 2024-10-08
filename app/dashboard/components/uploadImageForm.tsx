"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const formSchema = z.object({
  enhance: z.enum(["1","2", "4", "8"], {
    required_error: "Select an enhancement factor",
  }),
  colorize: z.enum(["yes", "no"], {
    required_error: "Opt in or out of colorization",
  }),
});

export type formType = z.infer<typeof formSchema>;

export default function UploadImageForm({handleUpload}: {handleUpload: SubmitHandler<formType>}) {
  //set default values
  const defaultValues: formType = {
    enhance: "1",
    colorize: "no",
  };

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form id="upload-form" onSubmit={form.handleSubmit(handleUpload)} className="w-2/3 ">

        <FormField
          control={form.control}
          name="enhance"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel>Enhance</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid-flow-col"
                >
                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="1"/>
                    </FormControl>
                    <FormLabel className="font-normal">none</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">2x</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">4x</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="8"/>
                    </FormControl>
                    <FormLabel className="font-normal">8x</FormLabel>
                  </FormItem>

                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colorize"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel>Colorize</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex "
                >
                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="no"/>
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>

                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Restore</Button>
      </form>
    </Form>
  )
}
