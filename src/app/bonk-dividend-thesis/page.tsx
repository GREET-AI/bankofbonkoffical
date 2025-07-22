"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightCircle, Calculator } from 'lucide-react';

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

export default function BonkDividendThesis() {
  const [floatingFormulas, setFloatingFormulas] = useState<FloatingFormula[]>([]);

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

  useEffect(() => {
    // Generate floating formulas periodically
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

    // Generate formulas more frequently
    const interval = setInterval(generateFormula, 400);

    // Initial set of formulas
    for (let i = 0; i < 30; i++) {
      generateFormula();
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

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

      {/* Content wrapper with floating formulas */}
      <div className="relative z-10">
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

        {/* Hero Section */}
        <div className="pt-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
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
                    Bonk Dividend Thesis
                  </span>
                </span>
              </h1>
              
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium font-sophie">
                Explore the mathematical foundation behind our revolutionary BONK dividend system.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 relative">
              {/* Market Cap Multiplier Card */}
              <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 mb-8 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                  <Calculator className="w-8 h-8 text-[#FFA319]" />
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                  <Image
                    src="/bonkbank.png"
                    alt="Bonk Bank"
                    width={48}
                    height={48}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold mb-6 text-[#FFA319] mt-8 font-sophie">Reward Calculation</h2>
                  <div className="space-y-4 mb-auto">
                    <div className="bg-black/50 rounded-lg p-4 border border-[#FFA319]/20">
                      <h3 className="text-xl font-semibold text-[#FFA319] mb-2 font-sophie">Reward per cycle (in BONK)</h3>
                      <pre className="text-lg font-mono bg-black/70 p-3 rounded overflow-x-auto text-white/90">
const reward = (dailyPlatformRevenue * 0.04 / 48)
  * (yourTokens / totalTokens)
  * timeMultiplier
  * tierMultiplier;
                      </pre>
                                              <p className="text-white/80 mt-3 text-lg font-sophie">
                        Your reward depends on your share of the pool, your holding duration, and your tier. Rewards are distributed every 30 minutes and all multipliers update live.
                      </p>
                    </div>
                    <div className="bg-black/40 border border-[#FFA319]/20 rounded-lg p-5 mt-6">
                      <div className="font-bold text-[#FFA319] mb-1 font-sophie">Example</div>
                                              <div className="text-white/90 text-lg font-sophie">
                                                If you hold 200,000 BONKBANK for 4 hours with daily platform revenue of $50,000:<br/>
                        <span className="font-mono text-base text-[#FFA319]/70">
                          - Your share: 200,000 / 1,000,000,000 = 0.02%<br/>
                          - Daily Platform Revenue: $50,000<br/>
                          - BonkRewards Pool (4%): $2,000<br/>
                          - Reward Pool per cycle: $2,000 / 48 ≈ $41.67<br/>
                          - Tier Multiplier: 1.1x (Fish)<br/>
                          - Time Multiplier: 1.3x (4h holding)<br/>
                          → Reward: $41.67 × 0.0002 × 1.1 × 1.3 ≈ <b className="text-[#FFA319]">$0.12 BONK</b> per cycle<br/>
                          → Daily: $0.12 × 48 cycles = <b className="text-[#FFA319]">$5.76 BONK</b>
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4 border border-[#FFA319]/20">
                      <h3 className="text-xl font-semibold text-[#FFA319] mb-2 font-sophie">Multipliers</h3>
                      <ul className="list-disc list-inside text-white/80 space-y-2 text-lg font-sophie">
                        <li><b>Tier Multiplier:</b> Shrimp 1x (100k), Fish 1.1x (500k), Crab 1.2x (1M), Dolphin 1.3x (5M), Whale 1.5x (10M)</li>
                        <li><b>Time Multiplier:</b> 30min 1x, 1h 1.1x, 2h 1.2x, 4h 1.3x, 12h 1.4x, 24h 1.5x</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <a 
                      href="/calculator"
                      className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg text-base transition-all flex items-center group border-2 border-[#1A0F00] hover:border-[#9945FF] shadow-lg relative overflow-hidden font-sophie"
                      style={{ minWidth: '160px' }}
                    >
                      <span className="relative z-10">Run calculator</span>
                      <ArrowRightCircle className="w-5 h-5 ml-2 text-[#1A0F00] group-hover:text-[#9945FF] transition-colors" />
                      <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:animate-gloss" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.15) 100%)', opacity: 0.7}}></span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Time Multiplier Card */}
              <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[420px]">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                  <Image
                    src="/bonkbank.png"
                    alt="Bonk Bank"
                    width={48}
                    height={48}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold mb-6 text-[#FFA319] mt-8 font-sophie">Time Multipliers</h2>
                  <div className="space-y-4 mb-auto">
                    <div className="bg-black/30 rounded-lg p-4 border border-[#FFA319]/20">
                      <h3 className="text-lg font-semibold text-[#FFA319] mb-2 font-sophie">Time-Based Rewards</h3>
                      <pre className="text-base font-mono bg-black/50 p-3 rounded overflow-x-auto text-white/90">
{`function calculateTimeMultiplier(
  firstSeen: Date,
  currentTime: Date
): number {
  const holdingDays = 
    (currentTime - firstSeen) / (1000 * 60 * 60 * 24);
  
  // Increase multiplier based on holding time
  const timeBonus = Math.min(
    holdingDays * DAILY_BONUS,
    MAX_TIME_MULTIPLIER
  );
  
  return BASE_MULTIPLIER + timeBonus;
}`}
                      </pre>
                      <p className="text-white/80 mt-3 text-base font-sophie">
                        Diamond hands get rewarded - hold longer, earn more.
                      </p>
                    </div>
                    <div className="bg-[#14F195]/10 rounded-lg p-4 border border-[#FFA319]/20">
                      <h3 className="text-lg font-semibold text-[#FFA319] mb-2 font-sophie">Reward Schedule</h3>
                      <ul className="list-disc list-inside text-white/80 space-y-2 text-base font-sophie">
                        <li>Base multiplier: 1.0x</li>
                        <li>+0.1x per week held</li>
                        <li>Maximum bonus: 2.5x</li>
                        <li>Continuous tracking</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Distribution System Card */}
            <div className="mt-8">
              <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Automated Distribution System</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-black/30 rounded-lg p-4 border border-[#FFA319]/20">
                        <h3 className="text-lg font-semibold text-[#FFA319] mb-2 font-sophie">Distribution Process</h3>
                        <pre className="text-base font-mono bg-black/50 p-3 rounded overflow-x-auto text-white/90">
{`async function processRewards() {
  // Get all token holders from letsbonk.fun
  const holders = await fetchBonkHolders();
  const rewardPool = await getRewardPool();

  for (const holder of holders) {
    // Calculate time & market multipliers
    const timeMultiplier = 
      calculateTimeMultiplier(
        holder.firstSeen,
        new Date()
      );
    
    const marketMultiplier = 
      calculateMarketMultiplier(
        holder.balance,
        holder.totalSupply
      );
    
    // Calculate final reward
    const reward = 
      holder.balance * 
      timeMultiplier * 
      marketMultiplier;
    
    // Queue reward for distribution
    await queueReward(holder.address, reward);
  }
}`}
                        </pre>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-[#14F195]/10 rounded-lg p-4 border border-[#FFA319]/20">
                        <h3 className="text-lg font-semibold text-[#FFA319] mb-2 font-sophie">System Features</h3>
                        <ul className="list-disc list-inside text-white/80 space-y-2 text-lg font-sophie">
                          <li>letsbonk.fun API integration</li>
                          <li>30-minute distribution cycles</li>
                          <li>Automatic balance tracking</li>
                          <li>Holding time calculation</li>
                          <li>Reward pool management</li>
                          <li>Transaction verification</li>
                        </ul>
                      </div>
                      <div className="bg-[#14F195]/10 rounded-lg p-4 border border-[#FFA319]/20">
                        <h3 className="text-lg font-semibold text-[#FFA319] mb-2 font-sophie">Technical Stack</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 text-lg font-sophie">
                          <li>letsbonk.fun token tracking</li>
                          <li>Node.js distribution system</li>
                          <li>Redis for holder data</li>
                          <li>Automated BONK transfers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 