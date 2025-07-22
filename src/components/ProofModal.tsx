"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function ProofModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in py-4 md:py-12" onClick={onClose}>
      <div className="relative w-full max-w-3xl mx-auto bg-[#2B1B00]/95 rounded-2xl shadow-2xl border border-[#FFA319]/20 p-0 overflow-hidden animate-pop-in max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 z-10 bg-[#FFA319] hover:bg-[#FFD600] rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform border-2 border-[#1A0F00]/40 hover:border-[#FFA319]"
          aria-label="Close Proof Modal"
          onClick={onClose}
        >
          <X className="w-7 h-7 text-[#1A0F00]" />
        </button>
        <div className="p-0 md:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 