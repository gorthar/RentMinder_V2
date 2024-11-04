import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiConnector from "@/ApiConnector/connector";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  lease: z.string().min(1, "Property selection is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export const PaymentForm = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tenantDashboard"],
    queryFn: apiConnector.TenantDashboard.getTenantDashboard,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      lease: "",
      paymentMethod: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      await apiConnector.Payment.create({
        amount: parseFloat(formData.amount),
        leaseId: formData.lease,
        paymentMethod: formData.paymentMethod,
      });

      setIsPaymentSuccessful(true);
      form.reset();
    } catch (error) {
      console.error("Payment submission failed:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">Loading payment form...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="text-red-600">
            Error loading payment form. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Make a Payment
        </CardTitle>
        <CardDescription>
          Submit a new payment for rent or other fees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="1000.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you want to pay
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="lease"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Property</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.activeLeases?.length > 0 ? (
                        data.activeLeases.map((lease) => (
                          <SelectItem
                            key={`lease-${lease.leaseId}`}
                            value={lease.leaseId.toString()}
                          >
                            {lease.propertyAddress}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem key="no-properties" value="" disabled>
                          No properties available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the lease you would like to make payment for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="paymentMethod"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="bank_transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your preferred payment method
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
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

export default PaymentForm;
