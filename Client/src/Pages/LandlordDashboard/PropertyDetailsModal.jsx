import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import apiConnector from "@/ApiConnector/connector";

// Is not being used in the current version of the project
// Will stay here for future reference
const hiddenFields = ["id", "landlordId", "lastModified", "dateAdded"];

const ViewComponent = ({ property }) => (
  <div className="space-y-2">
    {Object.entries(property).map(([key, value]) => {
      if (hiddenFields.includes(key)) return null;
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <p className="mt-1">{value.toString()}</p>
        </div>
      );
    })}
  </div>
);

const EditComponent = ({ property, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(property).filter(([key]) => !hiddenFields.includes(key))
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {Object.entries(property).map(([key, value]) => {
        if (hiddenFields.includes(key)) return null;
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === "description" ? (
              <Textarea
                {...register(key, { required: true })}
                className="mt-1 block w-full"
              />
            ) : key === "isOccupied" ? (
              <Input type="checkbox" {...register(key)} className="mt-1" />
            ) : (
              <Input
                type="text"
                {...register(key, { required: true })}
                className="mt-1 block w-full"
              />
            )}
            {errors[key] && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        );
      })}
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

const PropertyDetailsModal = ({ isOpen, onClose, property, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!property) return null;

  const handleSubmit = async (data) => {
    try {
      const updatedProperty = { ...property, ...data };
      await apiConnector.Property.update(property.id, updatedProperty);
      onUpdate(updatedProperty);
      setIsEditing(false);
      toast.success("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Property Details</Modal.Header>
      <Modal.Body>
        {isEditing ? (
          <EditComponent
            property={property}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <ViewComponent property={property} />
        )}
      </Modal.Body>
      {!isEditing && (
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={() => setIsEditing(true)} className="ml-auto">
            Edit
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default PropertyDetailsModal;
