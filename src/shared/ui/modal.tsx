"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative mx-4 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
