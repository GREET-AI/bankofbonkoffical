"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightCircle } from 'lucide-react';

function getNextHourCountdown() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(now.getHours() + 1, 0, 0, 0); // Always countdown to next full hour
  const diff = next.getTime() - now.getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const XIcon = () => (
  <svg width="36" height="36" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
    <rect width="1200" height="1227" rx="300" fill="#000"/>
    <path d="M860 320H740L600 520L460 320H340L540 600L340 880H460L600 680L740 880H860L660 600L860 320Z" fill="#14F195"/>
  </svg>
);

export default function Timer() {
  const [countdown, setCountdown] = useState(getNextHourCountdown());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getNextHourCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animierte Partikel für Casino/Degen-Feeling
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; color: string; size: string }>>([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      color: Math.random() > 0.5 ? '#FFA319' : '#FFD600',
      size: `${Math.random() * 3 + 2}px`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#1A0F00]">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#FFA319]/5 via-[#2B1B00]/10 to-[#1A0F00]/20" />
      {/* Particles */}
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
              opacity: 0.5
            }}
          />
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-24 pb-16">
        {/* SVG Clock Icon */}
        <div className="w-40 h-40 mb-8 flex items-center justify-center">
          <Image
            src="/bonkbank.png"
            alt="Bonk Bank"
            width={180}
            height={180}
            className="drop-shadow-[0_0_40px_#FFA31999]"
            priority
          />
        </div>
        {/* Digital Countdown */}
        <div className="flex items-center gap-4 mb-2">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" stroke="#FFA319" strokeWidth="3" opacity="0.7" />
            <path d="M18 8V18L25 22" stroke="#FFA319" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-5xl md:text-6xl font-extrabold text-[#FFA319] font-mono drop-shadow-[0_0_16px_#FFA31999] tracking-widest animate-pulse-glow">{countdown}</span>
        </div>
        <div className="text-lg md:text-xl text-white/70 font-semibold tracking-wide mt-2 mb-8">Next Distribution In</div>
        <div className="mt-8 text-center max-w-xl mx-auto">
          <p className="text-white/80 text-lg md:text-xl font-sans font-semibold mb-2">Every 30 minutes, all eligible holders receive BONK rewards automatically.</p>
          <p className="text-[#FFA319] text-base md:text-lg font-sans font-medium">Stay degen. Stay on time. Don&apos;t miss the next payout!</p>
        </div>
      </div>
      {/* Social & Share Cards */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 px-4">
        {/* X Account Card */}
        <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
            <XIcon />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-[#FFA319] mt-8 font-sophie">Follow us on X</h3>
            <p className="text-white/80 mb-auto text-base font-sophie">Get the latest updates, rewards, and community vibes. Join the Bonk Bank movement on X!</p>
            <div className="flex justify-end mt-4">
              <a 
                href="https://x.com/Solana_Timer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg text-base transition-all flex items-center group border-2 border-[#1A0F00] hover:border-[#9945FF] shadow-lg relative overflow-hidden font-sophie"
                style={{ minWidth: '160px' }}
              >
                <span className="relative z-10">@Solana_Timer</span>
                <ArrowRightCircle className="w-5 h-5 ml-2 text-[#1A0F00] group-hover:text-[#9945FF] transition-colors" />
                <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:animate-gloss" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.15) 100%)', opacity: 0.7}}></span>
              </a>
            </div>
          </div>
        </div>
        {/* X Community Card */}
        <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
            <XIcon />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-[#FFA319] mt-8 font-sophie">Join our X Community</h3>
            <p className="text-white/80 mb-auto text-base font-sophie">Connect with other degens, share your rewards, and never miss a Bonk Bank event. Be part of the fastest-growing Bonk community!</p>
            <div className="flex justify-end mt-4">
              <a 
                href="https://x.com/i/communities/1947735996587774012/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A0F00] hover:bg-[#2B1B00] text-[#FFA319] font-bold px-6 py-2 rounded-lg transition-all duration-200 font-sophie hover:text-[#FFD600]"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
        {/* Dev Card */}
        <div className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
            <XIcon />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-[#FFA319] mt-8 font-sophie">Introducing the Dev</h3>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-base text-[#14F195] font-sophie">@ValentinoCrypt</span>
            </div>
            <div className="font-bold text-white mb-2 font-sophie">DeFi Developer | Crypto Enthusiast | Bonk Bank Creator</div>
            <div className="text-white/80 mb-auto text-base font-sophie">💻 Full-Stack Developer | 🧠 Next.js & TypeScript Expert | 🛰️ Building revolutionary DeFi platforms | Building the future of decentralized banking</div>
            <div className="flex justify-end mt-4">
              <a 
                href="https://x.com/ValentinoCrypt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg text-base transition-all flex items-center group border-2 border-[#1A0F00] hover:border-[#14F195] shadow-lg relative overflow-hidden font-sophie"
                style={{ minWidth: '160px' }}
              >
                <span className="relative z-10">View on X</span>
                <ArrowRightCircle className="w-5 h-5 ml-2 text-[#1A0F00] group-hover:text-[#14F195] transition-colors" />
                <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:animate-gloss" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.15) 100%)', opacity: 0.7}}></span>
              </a>
            </div>
          </div>
        </div>
        {/* Share on X Card (populär & animiert) */}
        <div className="bg-[#2B1B00] border-4 border-[#FFA319] animate-pulse-glow shadow-2xl rounded-xl p-8 relative overflow-hidden group flex flex-col min-h-[340px] scale-105 hover:scale-110 transition-transform duration-300">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFA319]/30 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12 animate-bounce-slow">
            <XIcon />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-3xl font-extrabold mb-4 text-[#FFA319] mt-8 animate-bounce font-sophie">🚀 Share & Win Rewards!</h3>
            <p className="text-white/90 mb-2 text-lg font-bold animate-pulse font-sophie">Share your excitement about Bonk Bank on X and win exclusive rewards every hour!</p>
            <p className="text-[#FFD600] text-base font-semibold mb-auto animate-pulse font-sophie">The more you share, the higher your chances!<br/>Let&apos;s make Bonk Bank go viral!</p>
            <div className="flex justify-end mt-6">
              <a 
                href={`https://x.com/intent/tweet?text=${encodeURIComponent('🔥 Check out Bonk Bank – earn BONK every 30 minutes just for holding! Powered by @pumpdotfun & @BonkBank. Join the degen revolution: https://bonkbank.io #Bonk #Crypto #Airdrop')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-extrabold px-8 py-4 rounded-lg text-xl transition-all flex items-center group border-2 border-[#1A0F00] hover:border-[#14F195] shadow-2xl relative overflow-hidden font-sophie animate-bounce"
                style={{ minWidth: '200px', boxShadow: '0 0 32px #FFA31999, 0 0 64px #FFD60055' }}
              >
                <span className="relative z-10 animate-pulse">🔥 Share on X</span>
                <ArrowRightCircle className="w-7 h-7 ml-3 text-[#1A0F00] group-hover:text-[#14F195] transition-colors animate-bounce" />
                <span className="absolute inset-0 rounded-lg pointer-events-none group-hover:animate-gloss" style={{background: 'linear-gradient(120deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.35) 50%,rgba(255,255,255,0.15) 100%)', opacity: 0.7}}></span>
              </a>
            </div>
            <div className="text-xs text-white/80 mt-4 text-center animate-pulse font-sophie">Every hour, we pick random sharers for exclusive rewards. Don&apos;t miss out – share now and boost your luck!</div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#FFA319] via-[#FFD600] to-[#FFA319] blur-md opacity-80 animate-gradient-slow z-20" />
    </div>
  );
}
// Füge in deine CSS ein:
// @keyframes pulseGlow { 0% { text-shadow: 0 0 8px #14F195, 0 0 16px #14F195; } 100% { text-shadow: 0 0 24px #14F195, 0 0 48px #14F195; } }
// .animate-pulse-glow { animation: pulseGlow 2s infinite alternate; } 