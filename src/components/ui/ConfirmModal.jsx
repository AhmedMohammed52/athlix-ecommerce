import { useEffect } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmModal({
  open,
  title = "Remove address?",
  description = "Are you sure you want to remove this address? This action cannot be undone.",
  confirmText = "Remove",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isLoading = false,
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-110
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-md
          rounded-3xl
          border border-border
          bg-background
          p-6
          shadow-2xl
          md:p-7
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex size-11 shrink-0
              items-center justify-center
              rounded-full
              bg-destructive/10
              text-destructive
            "
          >
            <FiAlertTriangle size={20} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close"
            className="
              flex size-9 shrink-0
              items-center justify-center
              rounded-full
              border border-border
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FiX size={17} />
          </button>
        </div>

        <div className="mt-5">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="
              h-11
              rounded-full
              border border-border
              px-6
              text-sm font-medium
              transition
              hover:bg-muted
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              h-11
              rounded-full
              bg-destructive
              px-6
              text-sm font-semibold
              text-white
              transition
              hover:bg-destructive/90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading ? "Removing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
