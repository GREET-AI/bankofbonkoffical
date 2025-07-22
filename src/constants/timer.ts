// src/constants/timer.ts
// TODO: Replace with real TIMER mint after launch
export const TIMER_MINT = process.env.NEXT_PUBLIC_TIMER_MINT || "3T721bpRc5FNY84W36vWffxoKs4FLXhBpSaqwUCRpump";

// Real CA for after launch - replace this with your actual CA
export const BONKBANK_CA = process.env.NEXT_PUBLIC_BONKBANK_CA || "7Z1SttDgWt9UtcmSPnM9dmXztuiQS7oJS7NaYpJobonk";

// Use this for production after launch
export const getTokenMint = () => {
  return process.env.NODE_ENV === 'production' ? BONKBANK_CA : TIMER_MINT;
}; 