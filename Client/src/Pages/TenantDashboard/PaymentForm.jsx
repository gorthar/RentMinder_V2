import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "./DatePicker";
import { DollarSign } from "lucide-react";
import { toast } from "react-toastify";

export const PaymentForm = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const form = useForm({
    defaultValues: {
      amount: "",
      paymentDate: new Date(),
    },
  });

  const onSubmit = (data) => {
    toast({
      title: "Payment Submitted",
      description: `Your payment of $${data.amount} has been submitted.`,
    });
    setIsPaymentSuccessful(true);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Pay Rent
        </CardTitle>
        <CardDescription>Submit your monthly rent payment</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="1000.00" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you want to pay
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Payment Date Field */}
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Date</FormLabel>
                  <DatePicker field={field} />
                  <FormDescription>
                    Choose the date for your payment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Payment
            </Button>
          </form>
        </Form>
      </CardContent>
      {isPaymentSuccessful && (
        <CardFooter>
          <p className="text-green-600">Payment submitted successfully!</p>
        </CardFooter>
      )}
    </Card>
  );
};
