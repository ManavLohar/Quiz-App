import { useEffect } from "react";

type UseCloseModalProps<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  onClose: () => void;
  enabled?: boolean;
};

export function useCloseOnOutsideOrEsc<T extends HTMLElement>({
  ref,
  onClose,
  enabled = true,
}: UseCloseModalProps<T>) {
  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onClose, enabled]);
}
