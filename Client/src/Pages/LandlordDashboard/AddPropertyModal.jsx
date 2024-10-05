import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apiConnector from "@/ApiConnector/connector";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

function AddPropertyModal({ isOpen, onClose, onPropertyAdded }) {
  const { register, handleSubmit, reset } = useForm();

  async function handleAddProperty(data, e) {
    e.preventDefault();
    console.log("handleAddProperty called", data);
    try {
      const propertyData = {
        address: data.address,
        description: data.description,
        numberOfBedrooms: data.numberOfBedrooms,
        numberOfBathrooms: data.numberOfBathrooms,
        squareFootage: data.squareFootage,
        isOccupied: data.isOccupied === "true",
      };
      await apiConnector.Property.create(propertyData);
      toast.success("Property added successfully!");
      reset();
      onPropertyAdded();
      onClose();
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property. Please try again.");
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add Property</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit((data, e) => handleAddProperty(data, e))}>
          <div className="mb-4">
            <label className="block">Address</label>
            <input
              className="border rounded w-full p-2"
              {...register("address", { required: true })}
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
            <label className="block">Number of Bedrooms</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              {...register("numberOfBedrooms", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block">Number of Bathrooms</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              {...register("numberOfBathrooms", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block">Square Footage</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              {...register("squareFootage", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block">Is Occupied</label>
            <select
              className="border rounded w-full p-2"
              {...register("isOccupied")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddPropertyModal;
AddPropertyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPropertyAdded: PropTypes.func.isRequired,
};
