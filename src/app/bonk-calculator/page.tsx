"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import WalletAnalyzer from "@/components/WalletAnalyzer";
import { TIMER_MINT, BONKBANK_CA } from '@/constants/timer';

const FEE_PERCENT = 0.04; // 4% for BonkRewards pool
const REWARD_SHARE = 1.0; // 100%
const REWARD_CYCLE_MINUTES = 30;

const TOKEN_MULTIPLIERS = [
  { min: 10_000_000, mult: 1.5, name: "Whale" },
  { min: 5_000_000, mult: 1.3, name: "Dolphin" },
  { min: 1_000_000, mult: 1.2, name: "Crab" },
  { min: 500_000, mult: 1.1, name: "Fish" },
  { min: 100_000, mult: 1.0, name: "Shrimp" },
];

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
function getTierName(tokens: number) {
  for (const t of TOKEN_MULTIPLIERS) if (tokens >= t.min) return t.name;
  return "Unknown";
}

// Typdefinitionen für Token und RewardInfo
interface TokenData {
  amount: number;
  mint: string;
  name?: string;
}
interface RewardInfo {
  tokens: number;
  holdTimeMinutes: number;
  tier: string;
  reward: number;
}

// Floating formula type
interface FloatingFormula {
  id: string;
  value: string;
  left: string;
  top: string;
  delay: string;
  color: string;
  size: string;
  opacity: number;
}

// Hilfsfunktion für dynamische Schrittweite
function getStep(value: number) {
  if (value < 100_000) return 1_000;
  if (value < 1_000_000) return 10_000;
  if (value < 10_000_000) return 100_000;
  return 1_000_000;
}

// SVG-Icons für die Tiers
const TIER_ICONS: Record<string, string> = {
  Whale: '/whale.svg',
  Dolphin: '/dolphin.svg',
  Crab: '/crab.svg',
  Fish: '/fish.svg',
  Shrimp: '/shrimp.svg',
};

interface AnalysisData {
  heldForMinutes: number;
  volume24h: number;
  tier: string;
  reward: number;
}

function useSolPrice() {
  const [solPrice, setSolPrice] = useState(200);
  useEffect(() => {
    let isMounted = true;
    async function fetchPrice() {
      try {
        const res = await fetch('/api/sol-price');
        const data = await res.json();
        if (isMounted && data.price) setSolPrice(Number(data.price));
      } catch {}
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);
  return solPrice;
}

export default function CalculatorPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenData, setTokenData] = useState<TokenData | null>(null); // API-Daten für aktuelle Wallet
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null); // Analyse-Daten von neuer API
  const [dailyVolumeUsd, setDailyVolumeUsd] = useState<number | null>(null); // Jetzt dynamisch!
  const [error, setError] = useState<string | null>(null);
  const [tokenName, setTokenName] = useState("BONKBANK");
  const [simVolume, setSimVolume] = useState(0); // Default 0 USD
  const [simHoldings, setSimHoldings] = useState(0); // Default 0 BONKBANK
  // Floating formulas state
  const [floatingFormulas, setFloatingFormulas] = useState<FloatingFormula[]>([]);
  const solPrice = useSolPrice();

  // Get the correct token mint based on environment


  // Fetch token holdings for the current wallet
  useEffect(() => {
    if (!walletAddress || error) return;
    // Hole Token-Metadaten wie bisher
    fetch(`/api/wallet-tokens?address=${walletAddress}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        // Check for both TIMER and BONKBANK tokens
        const timerToken = (data.tokens || []).find((t: TokenData) => 
          t.mint === TIMER_MINT || t.mint === BONKBANK_CA
        );
        setTokenData(timerToken || null);
        setTokenName(timerToken?.name || "BONKBANK");
      })
      .catch(() => setTokenData(null));
    // Hole Analyse-Daten (Tier, Reward, Haltezeit, Volumen)
    fetch(`/api/wallet-analysis?address=${walletAddress}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setAnalysis(data);
        if (typeof data.volume24h === 'number') setDailyVolumeUsd(data.volume24h);
      })
      .catch(() => {
        setAnalysis(null);
        setDailyVolumeUsd(null);
      });
  }, [walletAddress, error]);

  // Calculate reward and tier for the current wallet
  let rewardInfo: RewardInfo | null = null;
  let rewardPerCycle = 0;
  if (tokenData && tokenData.amount && dailyVolumeUsd !== null && analysis) {
    const holdTimeMinutes = analysis.heldForMinutes ?? 0; // ECHTE Haltezeit anzeigen
    const cyclesPerDay = (24 * 60) / REWARD_CYCLE_MINUTES;
    const totalFees = dailyVolumeUsd * FEE_PERCENT;
    const rewardPoolUsd = totalFees * REWARD_SHARE;
    const rewardPoolSol = rewardPoolUsd / solPrice / cyclesPerDay;
    const tokens = tokenData.amount;
    const tokenMult = getTokenMultiplier(tokens);
    // Reward per cycle immer so, als hätte man mindestens 30 Minuten gehalten (timeMult = 1)
    const timeMult = 1;
    rewardPerCycle = rewardPoolSol * tokenMult * timeMult;
    rewardInfo = {
      tokens,
      holdTimeMinutes,
      tier: getTierName(tokens),
      reward: Number(rewardPerCycle.toFixed(6)),
    };
  }

  // Reward-Simulation für die Slider
  const simHoldTimeMinutes = 24 * 60; // 24h als Beispiel
  const simTokenMult = getTokenMultiplier(simHoldings);
  const simTimeMult = getTimeMultiplier(simHoldTimeMinutes);
  const cyclesPerDay = (24 * 60) / REWARD_CYCLE_MINUTES;
  const simTotalFees = simVolume * FEE_PERCENT;
  const simRewardPoolUsd = simTotalFees * REWARD_SHARE;
  const simRewardPoolSol = simRewardPoolUsd / solPrice / cyclesPerDay;
  const simRewardPerCycle = simRewardPoolSol * simTokenMult * simTimeMult;
  const simRewardDaily = simRewardPerCycle * cyclesPerDay;
  const simRewardMonthly = simRewardDaily * 30;
  const simTier = getTierName(simHoldings);

  // Generate random mathematical formula
  const generateRandomFormula = () => {
    const formulas = [
      "E = mc²",
      "∑(n²) = n(n+1)(2n+1)/6",
      "∫f(x)dx = F(x) + C",
      "π = 3.14159265359",
      "(x + y)² = x² + 2xy + y²",
      "y = mx + b",
      "a² + b² = c²",
      "∞ → ∞",
      "δy/δx = f'(x)",
      "f'(x) = lim[h→0] [f(x+h) - f(x)]/h",
      "∮ E·dl = -dΦB/dt",
      "∇ × B = μ₀J + μ₀ε₀∂E/∂t",
      "eiπ + 1 = 0",
      "P(A|B) = P(B|A)P(A)/P(B)",
      "F = G(m₁m₂)/r²",
      "∇ · E = ρ/ε₀",
      "dS ≥ 0",
      "ψ(x,t) = Ae^(i(kx-ωt))",
      "∫e^x dx = e^x + C",
      "sin²θ + cos²θ = 1",
      "∇²ψ + (2m/ℏ²)(E-V)ψ = 0",
      "ds² = gμνdxᵘdxᵛ",
      "R_μν - (R/2)g_μν = 8πGT_μν",
      "[x,p] = iℏ",
      "∂ψ/∂t = -(iℏ/2m)∇²ψ",
      "S = k_B ln(W)",
      "F = ma",
      "E = hf",
      "PV = nRT",
      "dQ = TdS"
    ];
    return formulas[Math.floor(Math.random() * formulas.length)];
  };

  // Floating formulas Effekt: nur einmal beim Mount ausführen!
  useEffect(() => {
    const generateFormula = () => {
      const newFormula = {
        id: `${Date.now()}-${Math.random()}`,
        value: generateRandomFormula(),
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 1}s`,
        color: Math.random() > 0.5 ? '#FFA319' : '#FFD600',
        size: `${Math.random() * 0.5 + 0.8}rem`,
        opacity: Math.random() * 0.3 + 0.1
      };
      setFloatingFormulas(prev => [...prev, newFormula]);
      setTimeout(() => {
        setFloatingFormulas(prev => prev.filter(formula => formula.id !== newFormula.id));
      }, 3000);
    };
    const interval = setInterval(generateFormula, 400);
    for (let i = 0; i < 30; i++) {
      generateFormula();
    }
    return () => {
      clearInterval(interval);
    };
  }, []); // <--- WICHTIG: leeres Dependency-Array!

  // Error handling for address
  const handleAnalyze = () => {
    if (!walletAddress || walletAddress.length < 32) {
      setError("Please enter a valid Solana address.");
      setTokenData(null);
      setAnalysis(null);
      return;
    }
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A0F00]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B1B00] via-[#1A0F00] to-[#2B1B00]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating sparkles */}
        <div className="absolute w-2 h-2 bg-[#FFA319] rounded-full animate-sparkle" style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-[#FFD600] rounded-full animate-sparkle" style={{ left: '80%', top: '60%', animationDelay: '1s' }} />
        <div className="absolute w-3 h-3 bg-[#FFA319] rounded-full animate-sparkle" style={{ left: '50%', top: '80%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 bg-[#FFD600] rounded-full animate-sparkle" style={{ left: '20%', top: '40%', animationDelay: '3s' }} />
        <div className="absolute w-2 h-2 bg-[#FFA319] rounded-full animate-sparkle" style={{ left: '90%', top: '10%', animationDelay: '4s' }} />
        
        {/* Shooting stars */}
        <div className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star" style={{ left: '0%', top: '30%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-[#FFA319] rounded-full animate-shooting-star" style={{ left: '0%', top: '70%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 bg-[#FFD600] rounded-full animate-shooting-star" style={{ left: '0%', top: '50%', animationDelay: '4s' }} />
      </div>

      {/* Floating Formulas */}
      {floatingFormulas.map((formula) => (
        <div
          key={formula.id}
          className="absolute animate-float-formula font-sophie"
          style={{
            left: formula.left,
            top: formula.top,
            animationDelay: formula.delay,
            color: formula.color,
            opacity: formula.opacity,
            fontSize: formula.size
          }}
        >
          {formula.value}
        </div>
      ))}

      <div className="pt-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-[-30%] bg-gradient-to-r from-[#FFA319]/40 via-yellow-400/20 to-[#FFD600]/40 rounded-full blur-2xl animate-pulse" />
            <Image
              src="/bonkbank.png"
              alt="Bonk Bank"
              width={128}
              height={128}
              className="relative rounded-full"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight relative font-sophie">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFA319]/20 to-[#FFD600]/20 blur-lg opacity-30" />
                <span className="relative bg-gradient-to-r from-[#FFA319] to-[#FFD600] bg-clip-text text-transparent">
                  $BONK Calculator
                </span>
              </span>
            </h1>
            <p className="text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium font-sophie">
              Calculate your potential BONK rewards based on your holding patterns and market impact.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex gap-2">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your Solana wallet address"
                className="w-full bg-black/30 border border-[#FFA319]/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFA319]/50 font-mono text-base"
              />
              <button
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-3 rounded-lg transition-all duration-200 font-sophie"
                onClick={handleAnalyze}
              >
                Calculate
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-base mt-2 font-sophie">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Übergib rewardInfo an WalletAnalyzer */}
      {walletAddress && !error && (
        <WalletAnalyzer
          address={walletAddress}
          rewardInfo={rewardInfo}
          tokenName={tokenName}
        />
      )}

      {/* Rewards Calculator Section - Always visible */}
      <div className="max-w-2xl mx-auto mt-16 mb-20 bg-[#2B1B00] border border-[#FFA319]/40 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-[#FFA319] mb-6 font-sophie">$BONK Calculator</h2>
        <div className="mb-8">
          <label className="block text-white/80 mb-2 font-semibold font-sophie">Daily Platform Revenue (USD)</label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={200000000}
              step={getStep(simVolume)}
              value={simVolume}
              onChange={e => setSimVolume(Number(e.target.value))}
              className="w-full accent-[#FFA319] h-2 rounded-lg appearance-none bg-[#FFA319]/20"
            />
            <input
              type="number"
              min={0}
              max={200000000}
              step={getStep(simVolume)}
              value={simVolume}
              onChange={e => setSimVolume(Number(e.target.value))}
              className="w-32 bg-black/30 border border-[#FFA319]/20 rounded-lg px-2 py-1 text-white text-right font-mono text-base"
            />
          </div>
          <div className="flex justify-between text-sm text-white/60 mt-1 font-sophie">
            <span>$0</span>
            <span>${simVolume.toLocaleString()}</span>
            <span>$200M</span>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-white/80 mb-2 font-semibold font-sophie">Your BONKBANK Holdings</label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={0}
              max={1000000000}
              step={getStep(simHoldings)}
              value={simHoldings}
              onChange={e => setSimHoldings(Number(e.target.value))}
              className="w-full accent-[#FFD600] h-2 rounded-lg appearance-none bg-[#FFD600]/20"
            />
            <input
              type="number"
              min={0}
              max={1000000000}
              step={getStep(simHoldings)}
              value={simHoldings}
              onChange={e => setSimHoldings(Number(e.target.value))}
              className="w-32 bg-black/30 border border-[#FFA319]/20 rounded-lg px-2 py-1 text-white text-right font-mono text-base"
            />
          </div>
          <div className="flex justify-between text-sm text-white/60 mt-1 font-sophie">
            <span>0</span>
            <span>{simHoldings.toLocaleString()} BONKBANK</span>
            <span>1B</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-black/40 border border-[#FFA319]/20 rounded-lg p-5 flex flex-col gap-2">
            <div className="text-white/70 text-base font-sophie">Reward per cycle (30min)</div>
            <div className="text-2xl font-bold text-[#FFA319] font-sophie">{simRewardPerCycle > 0 ? simRewardPerCycle.toFixed(6) : '0.000000'} BONK</div>
            <div className="text-white/70 text-base mt-2 font-sophie">Daily Rewards</div>
            <div className="text-lg font-semibold text-[#FFA319] font-sophie">{simRewardDaily > 0 ? simRewardDaily.toFixed(4) : '0.0000'} BONK</div>
            <div className="text-white/70 text-base mt-2 font-sophie">Monthly Projection</div>
            <div className="text-lg font-semibold text-[#FFA319] font-sophie">{simRewardMonthly > 0 ? simRewardMonthly.toFixed(2) : '0.00'} BONK</div>
          </div>
          <div className="bg-black/40 border border-[#FFA319]/20 rounded-lg p-5 flex flex-col gap-2">
            <div className="text-white/70 text-base font-sophie">Tier</div>
            <div className="flex items-center gap-2">
              {TIER_ICONS[simTier] && (
                <Image src={TIER_ICONS[simTier]} alt={simTier} width={28} height={28} />
              )}
              <span className="text-xl font-bold text-[#FFD600] font-sophie">{simTier}</span>
            </div>
            <div className="text-white/70 text-base mt-2 font-sophie">Token Multiplier</div>
            <div className="text-lg font-semibold text-[#FFA319] font-sophie">{simTokenMult}x</div>
            <div className="text-white/70 text-base mt-2 font-sophie">Time Multiplier (24h)</div>
            <div className="text-lg font-semibold text-[#FFA319] font-sophie">{simTimeMult}x</div>
          </div>
        </div>
        <div className="text-sm text-white/40 mt-6 font-sophie">* Calculations based on current platform revenue</div>
      </div>
    </div>
  );
} 