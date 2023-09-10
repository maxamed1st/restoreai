"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  image: z.instanceof(File, {
    message: "You must upload an image",
  }),
  enhance: z.enum(["2x", "4x", "8x", "no"], {
    required_error: "You need to select an enhancement factor",
  }),
  colorize: z.enum(["yes", "no"], {
    required_error: "You must choose Yes or No regarding colorization of the picture",
  }),
})

export default function UploadImageForm({image}: {image: string}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 ">

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="file" accept="image/jpg, image/jpeg, image/png" value={image}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

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
                      <RadioGroupItem value="2x" id="2"/>
                    </FormControl>
                    <FormLabel className="font-normal">2x</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="4x" />
                    </FormControl>
                    <FormLabel className="font-normal">4x</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="8x" />
                    </FormControl>
                    <FormLabel className="font-normal">8x</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center ">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
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
                      <RadioGroupItem value="no" />
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
