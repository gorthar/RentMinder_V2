import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apiConnector from "@/ApiConnector/connector";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

function CreateMaintenanceRequestModal({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm();

  const handleCreateMaintenanceRequest = async (data, e) => {
    e.preventDefault();
    try {
      const maintenanceRequestData = {
        propertyAddress: data.propertyAddress,
        description: data.description,
        dateSubmitted: new Date(),
        status: "Pending",
        propertyId: data.propertyId,
      };
      await apiConnector.MaintenanceRequest.create(maintenanceRequestData);
      toast.success("Maintenance request created successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating maintenance request:", error);
      toast.error("Failed to create maintenance request. Please try again.");
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create Maintenance Request</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit((data, e) =>
            handleCreateMaintenanceRequest(data, e)
          )}
        >
          <div className="mb-4">
            <label className="block">Property Address</label>
            <input
              className="border rounded w-full p-2"
              {...register("propertyAddress", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block">Description</label>
            <input
              className="border rounded w-full p-2"
              {...register("description", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block">Property ID</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              {...register("propertyId", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default CreateMaintenanceRequestModal;
CreateMaintenanceRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
