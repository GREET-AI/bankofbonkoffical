// src/constants/timer.ts
// ⚠️  WICHTIG: Timer Token existieren noch NICHT! 
// Diese Adressen sind PLACEHOLDER bis zum Launch!

// TODO: Replace with real TIMER mint after launch
export const TIMER_MINT = process.env.NEXT_PUBLIC_TIMER_MINT || "TIMER_TOKEN_PLACEHOLDER_UNTIL_LAUNCH";

// Real CA for after launch - replace this with your actual CA
export const BONKBANK_CA = process.env.NEXT_PUBLIC_BONKBANK_CA || "BONKBANK_TOKEN_PLACEHOLDER_UNTIL_LAUNCH";

// Use this for production after launch
export const getTokenMint = () => {
  return process.env.NODE_ENV === 'production' ? BONKBANK_CA : TIMER_MINT;
}; 