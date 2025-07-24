// src/constants/timer.ts
// ⚠️  WICHTIG: BonkBank Token existieren noch NICHT! 
// Für Tests verwenden wir Random Token CAs bis zum Launch!

// TODO: Replace with real BONKBANK mint after launch
export const TIMER_MINT = process.env.NEXT_PUBLIC_TIMER_MINT || "EcgC6TyVxVCpZM9Yt39DMjiWDYWWZyTsSCWCVkHpbonk";

// Real CA for after launch - replace this with your actual CA
export const BONKBANK_CA = process.env.NEXT_PUBLIC_BONKBANK_CA || "EcgC6TyVxVCpZM9Yt39DMjiWDYWWZyTsSCWCVkHpbonk";

// Use this for production after launch
export const getTokenMint = () => {
  return process.env.NODE_ENV === 'production' ? BONKBANK_CA : TIMER_MINT;
}; 