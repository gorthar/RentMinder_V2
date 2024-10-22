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

export const IssueTypeField = ({ control }) => {
  return (
    <FormField
      control={control}
      name="issueType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Issue Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="appliance">Appliance</SelectItem>
              <SelectItem value="structural">Structural</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Select the type of issue you are experiencing
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

IssueTypeField.propTypes = {
  control: PropTypes.object.isRequired,
};
