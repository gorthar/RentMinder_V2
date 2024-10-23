import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";

export const UrgencyField = ({ control }) => {
  return (
    <FormField
      control={control}
      name="urgency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Urgency</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>How urgent is this issue?</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

UrgencyField.propTypes = {
  control: PropTypes.object.isRequired,
};
