"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Shield } from 'lucide-react';

interface RewardTx {
  hash: string;
  recipient: string;
  amount: string;
  tokens: string;
  holdTimeMinutes: number;
  tier: string;
  timestamp: string;
}

interface RewardsData {
  transactions: RewardTx[];
  totalRewards: string;
  totalHolders: number;
  solPrice: number;
}

const partners = [
  { name: 'Solana', url: 'https://x.com/solana', logo: '/solana.png' },
  { name: 'Jupiter', url: 'https://x.com/JupiterExchange', logo: '/jupiter.png' },
  { name: 'letsbonk.fun', url: 'https://letsbonk.fun', logo: '/bonkbank.png' },
  { name: 'Raydium', url: 'https://x.com/RaydiumProtocol', logo: '/raydium.svg' },
  { name: 'Meteora', url: 'https://x.com/MeteoraAG', logo: '/meteora.svg' },
  { name: 'Solscan', url: 'https://x.com/solscanofficial', logo: '/solscan.svg' },
];

const TIER_ICONS: Record<string, string> = {
  Whale: '/whale.svg',
  Dolphin: '/dolphin.svg',
  Crab: '/crab.svg',
  Fish: '/fish.svg',
  Shrimp: '/shrimp.svg',
};

export default function ProofContent() {
  const [rewardsData, setRewardsData] = useState<RewardsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; color: string; size: string }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ left: string; delay: string }>>([]);

  useEffect(() => {
    fetch('/api/rewards/transactions')
      .then(res => res.json())
      .then(data => setRewardsData(data))
      .finally(() => setLoading(false));
    // Partikel und Shooting Stars wie auf how-it-works
    const newParticles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      color: Math.random() > 0.5 ? '#FFA319' : '#FFD600',
      size: `${Math.random() * 3 + 2}px`
    }));
    setParticles(newParticles);
    const newShootingStars = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1A0F00]">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#FFA319]/5 via-[#2B1B00]/10 to-[#1A0F00]/20" />
      {/* Particles & Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-sparkle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              opacity: 0.6
            }}
          />
        ))}
        {shootingStars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-shooting-star"
            style={{
              left: star.left,
              top: '-2px',
              animationDelay: star.delay,
              width: '2px',
              height: '2px',
              background: 'linear-gradient(90deg, #FFA319, transparent)',
              borderRadius: '50%',
              boxShadow: '0 0 0 1px #FFA31944'
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-4xl mx-auto pt-16 pb-8 px-4">
        {/* Logo und Headline */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/bonkbank.png" alt="Bonk Bank" width={80} height={80} className="mb-4 rounded-full shadow-lg" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFA319] mb-2 flex items-center gap-2 font-sophie">
            <Shield className="w-7 h-7 text-[#FFA319]" />
            Reward Distribution Proof
          </h1>
          <p className="text-white/80 text-base md:text-lg text-center max-w-xl mb-2 font-sophie">
            All reward payouts are transparent, verifiable and secured on-chain. Trust is our foundation: every distribution is logged and auditable for your peace of mind.
          </p>
        </div>

        {/* Stats Overview */}
        {rewardsData && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#2B1B00] border border-[#FFA319]/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#FFA319] font-sophie">{rewardsData.totalRewards}</div>
              <div className="text-white/70 text-sm font-sophie">Total Rewards (BONK)</div>
            </div>
            <div className="bg-[#2B1B00] border border-[#FFA319]/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#FFA319] font-sophie">{rewardsData.totalHolders}</div>
              <div className="text-white/70 text-sm font-sophie">Active Holders</div>
            </div>
            <div className="bg-[#2B1B00] border border-[#FFA319]/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#FFA319] font-sophie">${rewardsData.solPrice?.toFixed(2)}</div>
              <div className="text-white/70 text-sm font-sophie">SOL Price</div>
            </div>
          </div>
        )}

        {/* Partner Card */}
        <div className="bg-[#2B1B00] border border-[#FFA319]/20 rounded-lg p-5 mb-10 flex flex-col items-center">
          <h2 className="text-lg font-bold text-[#FFA319] mb-3 font-sophie">Official Partners</h2>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {partners.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group hover:scale-105 transition-transform">
                <Image src={p.logo} alt={p.name} width={40} height={40} className="rounded-full mb-1 shadow-md group-hover:shadow-[#FFA319]" />
                <span className="text-xs text-white/80 group-hover:text-[#FFA319] font-semibold font-sophie">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Tabelle */}
        <div className="bg-[#2B1B00] rounded-lg p-6 border border-[#FFA319]/30 shadow-lg">
          <h2 className="text-lg font-bold mb-6 text-[#FFA319] font-sophie">Latest Reward Transactions</h2>
          {loading ? (
            <div className="text-white/70 font-sophie">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/80">
                <thead>
                  <tr className="border-b border-[#FFA319]/20">
                    <th className="py-2 text-left font-sophie">Tx Hash</th>
                    <th className="py-2 text-left font-sophie">Recipient</th>
                    <th className="py-2 text-center font-sophie">Tier</th>
                    <th className="py-2 text-right font-sophie">Tokens</th>
                    <th className="py-2 text-right font-sophie">Hold Time</th>
                    <th className="py-2 text-right font-sophie">Reward (BONK)</th>
                    <th className="py-2 text-right font-sophie">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardsData?.transactions.map(tx => (
                    <tr key={tx.hash} className="border-b border-white/10 hover:bg-[#FFA319]/5 transition">
                      <td className="py-2 font-mono text-xs">{tx.hash}</td>
                      <td className="py-2 font-mono text-xs">{tx.recipient}</td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {TIER_ICONS[tx.tier] && (
                            <Image src={TIER_ICONS[tx.tier]} alt={tx.tier} width={16} height={16} />
                          )}
                          <span className="text-[#FFD600] font-semibold font-sophie">{tx.tier}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right font-mono text-xs">{tx.tokens}</td>
                      <td className="py-2 text-right font-mono text-xs">{tx.holdTimeMinutes}min</td>
                      <td className="py-2 text-right font-bold text-[#FFA319] font-sophie">{Number(tx.amount).toFixed(6)}</td>
                      <td className="py-2 text-right font-mono text-xs">{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 