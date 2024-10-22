import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import PropTypes from "prop-types";

export const DescriptionField = ({ control }) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe the issue in detail"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>Provide as much detail as possible</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DescriptionField.propTypes = {
  control: PropTypes.object.isRequired,
};
