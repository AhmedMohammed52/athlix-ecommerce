import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AddresseCard from "./AddresseCard";
import AddressModal from "./AddressModal";
import ConfirmModal from "../../ui/ConfirmModal";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../../services/apiAddresses";

import Loader from "../../ui/Loader";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function loadAddresses() {
    try {
      setIsLoading(true);

      const data = await getAddresses();

      setAddresses(data);
    } catch (error) {
      toast.error(error.message || "Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  // =========================
  // Add Address
  // =========================

  function handleAdd() {
    setEditingAddress(null);
    setIsModalOpen(true);
  }

  function handleEdit(address) {
    setEditingAddress(address);
    setIsModalOpen(true);
  }

  async function handleSubmit(formData) {
    try {
      setIsSaving(true);

      if (editingAddress) {
        await updateAddress(editingAddress.id, formData);

        toast.success("Address updated successfully.");
      } else {
        await createAddress(formData);

        toast.success("Address added successfully.");
      }

      setIsModalOpen(false);
      setEditingAddress(null);

      await loadAddresses();
    } catch (error) {
      toast.error(error.message || "Failed to save address.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleDelete(address) {
    setAddressToDelete(address);
    setIsDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (!addressToDelete) return;

    try {
      setIsDeleting(true);

      await deleteAddress(addressToDelete.id);

      toast.success("Address removed successfully.");

      setIsDeleteModalOpen(false);
      setAddressToDelete(null);

      await loadAddresses();
    } catch (error) {
      toast.error(error.message || "Failed to remove address.");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleCloseDeleteModal() {
    if (isDeleting) return;

    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  }

  async function handleSetDefault(addressId) {
    try {
      await setDefaultAddress(addressId);

      toast.success("Default address updated.");

      await loadAddresses();
    } catch (error) {
      toast.error(error.message || "Failed to update default address.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <AddresseCard
            key={address.id}
            address={address}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="
            flex
            min-h-40
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-border
            p-8
            text-sm
            text-muted-foreground
            transition
            hover:border-foreground
            hover:text-foreground
          "
        >
          + Add new address
        </button>
      </div>

      <AddressModal
        open={isModalOpen}
        address={editingAddress}
        onClose={() => {
          if (isSaving) return;

          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />

      <ConfirmModal
        open={isDeleteModalOpen}
        title="Remove this address?"
        description={
          addressToDelete
            ? `Are you sure you want to remove your ${
                addressToDelete.label?.toLowerCase() || "saved"
              } address? This action cannot be undone.`
            : "Are you sure you want to remove this address?"
        }
        confirmText="Remove address"
        cancelText="Keep address"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
