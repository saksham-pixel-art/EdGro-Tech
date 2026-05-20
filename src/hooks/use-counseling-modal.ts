import { useState, useCallback } from "react";

/**
 * Simple hook to control the CounselingModal open state.
 * Use this in any component that needs to trigger the modal.
 */
export function useCounselingModal() {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return { open, openModal, closeModal };
}
