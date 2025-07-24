import { NextResponse } from 'next/server';
import { BONKBANK_CA } from '@/constants/timer';

interface TokenData {
  mint: string;
  amount: number;
  name?: string;
  symbol?: string;
}

// Helper function to calculate rewards
function calculateReward(tokens: number, holdTimeMinutes: number, volume24h: number, solPrice: number = 200) {
  const FEE_PERCENT = 0.04; // 4% Platform Fee
  const REWARD_SHARE = 1.0; // 100%
  const REWARD_CYCLE_MINUTES = 30;
  
  // Token multipliers
  const TOKEN_MULTIPLIERS = [
    { min: 10_000_000, mult: 1.5, name: "Whale" },
    { min: 5_000_000, mult: 1.3, name: "Dolphin" },
    { min: 1_000_000, mult: 1.2, name: "Crab" },
    { min: 500_000, mult: 1.1, name: "Fish" },
    { min: 100_000, mult: 1.0, name: "Shrimp" },
  ];

  // Time multipliers
  const TIME_MULTIPLIERS = [
    { min: 24 * 60, mult: 1.5 },
    { min: 12 * 60, mult: 1.4 },
    { min: 4 * 60, mult: 1.3 },
    { min: 2 * 60, mult: 1.2 },
    { min: 1 * 60, mult: 1.1 },
    { min: 30, mult: 1.0 },
  ];

  function getTokenMultiplier(tokens: number) {
    for (const t of TOKEN_MULTIPLIERS) if (tokens >= t.min) return t.mult;
    return 0;
  }

  function getTimeMultiplier(minutes: number) {
    for (const t of TIME_MULTIPLIERS) if (minutes >= t.min) return t.mult;
    return 0;
  }

  const cyclesPerDay = (24 * 60) / REWARD_CYCLE_MINUTES;
  const totalFees = volume24h * FEE_PERCENT;
  const rewardPoolUsd = totalFees * REWARD_SHARE;
  const rewardPoolSol = rewardPoolUsd / solPrice / cyclesPerDay;
  const tokenMult = getTokenMultiplier(tokens);
  const timeMult = getTimeMultiplier(holdTimeMinutes);
  
  return rewardPoolSol * tokenMult * timeMult;
}

export async function GET() {
  try {
    // Get SOL price
    const solPriceRes = await fetch('http://localhost:3002/api/sol-price');
    const solPriceData = await solPriceRes.json();
    const solPrice = solPriceData.price || 200;

    // Real holder addresses that we know have tokens
    const realHolders = [
      "xSR9uxCRmeVG1U3X9wygLh4kpCbFzYAuzA3cSScYxCv", // Has BONKBANK tokens - 14 days holding
      "5RQEcWJZdhkxRMbwjSq32RaocgYPaWDhi3ztimWUcrwo", // From screenshot - 24h holding
      "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", // Test wallet - 8 days holding
    ];

    // Add some simulated holders for demonstration
    const simulatedHolders = [
      { address: "7XQHvPwP9JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq", tokens: 5000000, holdTime: 1440, volume: 0.5 },
      { address: "8YQHvPwP9JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq", tokens: 15000000, holdTime: 2880, volume: 0.8 },
      { address: "9ZQHvPwP9JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq", tokens: 2000000, holdTime: 720, volume: 0.3 },
    ];

    const transactions = [];
    let totalRewards = 0;

    // Process real holders
    for (let i = 0; i < realHolders.length; i++) {
      const address = realHolders[i];
      
      try {
        // Get wallet tokens
        const tokensRes = await fetch(`http://localhost:3002/api/wallet-tokens?address=${address}`);
        const tokensData = await tokensRes.json();
        
        // Get wallet analysis
        const analysisRes = await fetch(`http://localhost:3002/api/wallet-analysis?address=${address}`);
        const analysisData = await analysisRes.json();

        // Find BONKBANK tokens
        const bonkbankToken = tokensData.tokens?.find((t: TokenData) => 
          t.mint === BONKBANK_CA || t.mint === "EcgC6TyVxVCpZM9Yt39DMjiWDYWWZyTsSCWCVkHpbonk"
        );

        if (bonkbankToken && bonkbankToken.amount > 0) {
          const reward = calculateReward(
            bonkbankToken.amount,
            analysisData.heldForMinutes || 0,
            analysisData.volume24h || 0,
            solPrice
          );

          if (reward > 0) {
            totalRewards += reward;
            transactions.push({
              hash: `TX${i + 1}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
              recipient: address,
              amount: reward.toFixed(6),
              tokens: bonkbankToken.amount.toLocaleString(),
              holdTimeMinutes: analysisData.heldForMinutes || 0,
              tier: analysisData.tier || "Unknown",
              timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
            });
          }
        }
      } catch (error) {
        console.error(`Error processing holder ${address}:`, error);
      }
    }

    // Process simulated holders
    for (let i = 0; i < simulatedHolders.length; i++) {
      const holder = simulatedHolders[i];
      const reward = calculateReward(
        holder.tokens,
        holder.holdTime,
        holder.volume,
        solPrice
      );

      if (reward > 0) {
        totalRewards += reward;
        transactions.push({
          hash: `TX${realHolders.length + i + 1}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          recipient: holder.address,
          amount: reward.toFixed(6),
          tokens: holder.tokens.toLocaleString(),
          holdTimeMinutes: holder.holdTime,
          tier: holder.tokens >= 10000000 ? "Whale" : holder.tokens >= 5000000 ? "Dolphin" : "Crab",
          timestamp: new Date(Date.now() - (realHolders.length + i) * 60 * 60 * 1000).toISOString(),
        });
      }
    }

    return NextResponse.json({ 
      transactions,
      totalRewards: totalRewards.toFixed(6),
      totalHolders: transactions.length,
      solPrice
    });
  } catch (error) {
    console.error('Error in rewards API:', error);
    return NextResponse.json({ 
      transactions: [],
      totalRewards: "0.000000",
      totalHolders: 0,
      solPrice: 200
    });
  }
} 