'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export function CalendarForm({
  type,
  orderId,
  sailDate,
}: {
  type: string;
  orderId: number;
  sailDate: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: sailDate ? new Date(sailDate) : undefined, // Set the initial value if sailDate exists
    },
  });

  console.log(sailDate, 'sailDate');
  const closePopover = () => {
    setIsOpen(false);
    onSubmit(form.getValues());
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Form Submitted:', data);
    console.log(orderId, 'orderId');

    try {
      const updateSailDate = await axios.put(
        `/api/v1/dashboard/orders/${orderId}`,
        {
          sailDate: data.dob,
        }
      );
      console.log(updateSailDate);
    } catch (error) {
      console.error('Error updating sail date:', error);
      // Handle error
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form.getValues());
          closePopover();
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      console.log(date);
                      type !== 'submit' && setIsOpen(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                  {type === 'submit' && (
                    <Button className="w-full" onClick={closePopover}>
                      Submit
                    </Button>
                  )}
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
