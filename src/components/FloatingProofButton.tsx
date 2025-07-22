"use client";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
import ProofModal from "@/components/ProofModal";
import ProofContent from "@/app/rewards-proof/ProofContent";

export default function FloatingProofButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpenRewardsPopup = () => {
      setOpen(true);
    };

    window.addEventListener('openRewardsPopup', handleOpenRewardsPopup);
    
    return () => {
      window.removeEventListener('openRewardsPopup', handleOpenRewardsPopup);
    };
  }, []);

  return (
    <>
      <button
        className="fixed z-50 bottom-6 right-6 bg-[#FFA319] hover:bg-[#FFD600] shadow-lg rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform duration-200 border-2 border-[#2B1B00]/40 hover:border-[#FFD600]"
        aria-label="Show Reward Proof"
        onClick={() => setOpen(true)}
      >
        <Shield className="w-8 h-8 text-[#1A0F00] drop-shadow-sm" />
      </button>
      <ProofModal open={open} onClose={() => setOpen(false)}>
        <ProofContent />
      </ProofModal>
    </>
  );
} 