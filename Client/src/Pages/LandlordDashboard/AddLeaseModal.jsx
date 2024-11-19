import { Modal } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import apiConnector from "@/ApiConnector/connector";

function AddLeaseModal({ isOpen, onClose, onLeaseAdded, propertyId }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      monthlyRent: "",
      securityDeposit: "",
      propertyId: propertyId,
      tenantEmail: "",
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await apiConnector.Lease.create(data); // Replace with actual API call
      toast.success("Lease added successfully!");
      reset();
      onLeaseAdded();
      onClose();
    } catch (error) {
      console.log("Error adding lease:", error);
      toast.error(`Failed to add lease. ${error.response.data}`);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add Lease</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <Input id="startDate" type="date" {...field} />
                )}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: "End date is required" }}
                render={({ field }) => (
                  <Input id="endDate" type="date" {...field} />
                )}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
              <Controller
                name="monthlyRent"
                control={control}
                rules={{
                  required: "Monthly rent is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid amount",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="monthlyRent"
                    type="number"
                    step="0.01"
                    {...field}
                  />
                )}
              />
              {errors.monthlyRent && (
                <p className="text-sm text-red-500">
                  {errors.monthlyRent.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
              <Controller
                name="securityDeposit"
                control={control}
                rules={{
                  required: "Security deposit is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid amount",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="securityDeposit"
                    type="number"
                    step="0.01"
                    {...field}
                  />
                )}
              />
              {errors.securityDeposit && (
                <p className="text-sm text-red-500">
                  {errors.securityDeposit.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenantEmail">Tenant Email</Label>
            <Controller
              name="tenantEmail"
              control={control}
              rules={{
                required: "Tenant email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input id="tenantEmail" type="email" {...field} />
              )}
            />
            {errors.tenantEmail && (
              <p className="text-sm text-red-500">
                {errors.tenantEmail.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Add Lease
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddLeaseModal;

AddLeaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeaseAdded: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
};
