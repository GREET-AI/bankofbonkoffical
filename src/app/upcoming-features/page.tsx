"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightCircle, Gift, Share2, Calendar, Trophy, Users, Star } from "lucide-react";

export default function UpcomingFeatures() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; color: string; size: string }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ left: string; delay: string }>>([]);
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{ id: number; value: string; left: string; top: string; delay: string; color: string }>>([]);
  const [floatingLogos, setFloatingLogos] = useState<Array<{ id: number; left: string; top: string; delay: string; scale: string; opacity: string }>>([]);

  useEffect(() => {
    // Particles
    const newParticles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      color: Math.random() > 0.5 ? '#FFA319' : '#FFD600',
      size: `${Math.random() * 3 + 2}px`
    }));
    setParticles(newParticles);

    // Shooting Stars mit Währungssymbolen
    const newShootingStars = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);

    // Floating BONK numbers
    const generateNumber = () => {
      const newNumber = {
        id: Date.now() + Math.random(),
        value: Math.random() > 0.5 ? 'BONK' : 'BANK',
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 2}s`,
        color: Math.random() > 0.5 ? '#FFA319' : '#FFD600'
      };

      setFloatingNumbers(prev => [...prev, newNumber]);

      setTimeout(() => {
        setFloatingNumbers(prev => prev.filter(num => num.id !== newNumber.id));
      }, 3000);
    };

    // Floating BONK logos
    const generateLogo = () => {
      const newLogo = {
        id: Date.now(),
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 2}s`,
        scale: `${Math.random() * 0.5 + 0.5}`,
        opacity: `${Math.random() * 0.3 + 0.1}`
      };

      setFloatingLogos(prev => [...prev, newLogo]);

      setTimeout(() => {
        setFloatingLogos(prev => prev.filter(logo => logo.id !== newLogo.id));
      }, 4000);
    };

    // Generate new numbers and logos periodically
    const numberInterval = setInterval(generateNumber, 2000);
    const logoInterval = setInterval(generateLogo, 3000);

    return () => {
      clearInterval(numberInterval);
      clearInterval(logoInterval);
    };
  }, []);

  const features = [
    {
      title: "Airdrops & Giveaways",
      description: "Regular BONK airdrops for active community members. Participate in weekly giveaways and earn free tokens!",
      icon: Gift,
      color: "#FFA319",
      details: [
        "Weekly BONK airdrops",
        "Community giveaways",
        "Early adopter rewards",
        "Referral bonuses"
      ]
    },
    {
      title: "Share to Earn",
      description: "Share your BONK gains on social media and earn rewards. The more you share, the more you earn!",
      icon: Share2,
      color: "#FFD600",
      details: [
        "Social media rewards",
        "Content creation bonuses",
        "Viral post multipliers",
        "Community engagement rewards"
      ]
    },
    {
      title: "Community Events",
      description: "Join exclusive community events, AMAs, and live trading sessions with the Bonk Bank team.",
      icon: Calendar,
      color: "#FFA319",
      details: [
        "Live trading sessions",
        "AMA with developers",
        "Community meetups",
        "Exclusive events"
      ]
    },
    {
      title: "Trading Competitions",
      description: "Compete with other degens in weekly trading competitions and win massive BONK prizes!",
      icon: Trophy,
      color: "#FFD600",
      details: [
        "Weekly trading contests",
        "Leaderboard rewards",
        "Skill-based prizes",
        "Community challenges"
      ]
    },
    {
      title: "NFT Marketplace",
      description: "Trade exclusive Bonk Bank NFTs and collect rare digital assets from our community.",
      icon: Star,
      color: "#FFD600",
      details: [
        "Exclusive NFT drops",
        "Community collections",
        "Rare digital assets",
        "NFT staking rewards"
      ]
    },
    {
      title: "Community Governance",
      description: "Participate in community governance and vote on important platform decisions.",
      icon: Users,
      color: "#FFD600",
      details: [
        "DAO governance",
        "Community voting",
        "Proposal system",
        "Transparent decision making"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A0F00]">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#FFA319]/5 via-[#2B1B00]/10 to-[#1A0F00]/20" />
      
      {/* Background Chart */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 400"
          className="text-green-400"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA319" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD600" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Chart line */}
          <path
            d="M 0 350 L 50 320 L 100 280 L 150 250 L 200 220 L 250 180 L 300 150 L 350 120 L 400 100 L 450 80 L 500 60 L 550 40 L 600 30 L 650 20 L 700 15 L 750 10 L 800 8 L 850 5 L 900 3 L 950 2 L 1000 1"
            stroke="url(#chartGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          
          {/* Chart area fill */}
          <path
            d="M 0 350 L 50 320 L 100 280 L 150 250 L 200 220 L 250 180 L 300 150 L 350 120 L 400 100 L 450 80 L 500 60 L 550 40 L 600 30 L 650 20 L 700 15 L 750 10 L 800 8 L 850 5 L 900 3 L 950 2 L 1000 1 L 1000 400 L 0 400 Z"
            fill="url(#chartGradient)"
            opacity="0.2"
          />
        </svg>
      </div>

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
        {shootingStars.map((star, i) => {
          const moneySymbols = ['$', '€', '¥', '£', '₿', '💎', '💰', '💵'];
          const symbol = moneySymbols[i % moneySymbols.length];
          const colors = ['#FFA319', '#FFD600', '#FFA319', '#FFD600', '#FFA319', '#FFD600', '#FFA319', '#FFD600'];
          const color = colors[i % colors.length];
          
          return (
            <div
              key={`star-${i}`}
              className="absolute animate-shooting-star font-sophie text-lg"
              style={{
                left: star.left,
                top: '-20px',
                animationDelay: star.delay,
                color: color,
                opacity: 0.8
              }}
            >
              {symbol}
            </div>
          );
        })}
      </div>

      {/* Floating BONK numbers */}
      {floatingNumbers.map((num) => (
        <div
          key={num.id}
          className="absolute animate-float-formula font-sophie font-bold text-sm pointer-events-none"
          style={{
            left: num.left,
            top: num.top,
            animationDelay: num.delay,
            color: num.color,
            opacity: 0.7
          }}
        >
          {num.value}
        </div>
      ))}

      {/* Floating BONK logos */}
      {floatingLogos.map((logo) => (
        <div
          key={logo.id}
          className="absolute animate-float-formula pointer-events-none"
          style={{
            left: logo.left,
            top: logo.top,
            animationDelay: logo.delay,
            transform: `scale(${logo.scale})`,
            opacity: logo.opacity
          }}
        >
          <Image
            src="/bonkbank.png"
            alt="Bonk Bank"
            width={20}
            height={20}
            className="rounded-full"
          />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto pt-16 pb-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/bonkbank.png"
              alt="Bonk Bank"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sophie">
            Upcoming Features
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-sophie">
            Discover the exciting features that will make The Bank of Bonk the ultimate meme community platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center transform -rotate-12">
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-[#FFA319] font-sophie mt-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 mb-6 text-base font-sophie">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-white/70 text-sm font-sophie">
                        <div className="w-2 h-2 bg-[#FFA319] rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#FFA319]/20 to-[#FFD600]/20 rounded-lg p-8 border border-[#FFA319]/40">
            <h2 className="text-3xl font-bold text-white mb-4 font-sophie">
              Ready to Join the Revolution?
            </h2>
            <p className="text-white/80 text-lg mb-6 font-sophie">
              Be part of the fastest-growing meme community and earn rewards while having fun!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://x.com/i/communities/1947735996587774012/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-8 py-3 rounded-lg text-lg transition-all flex items-center justify-center group"
              >
                <span className="mr-2">Join Community</span>
                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="bg-transparent border-2 border-[#FFA319] hover:border-[#FFD600] text-[#FFA319] hover:text-[#FFD600] font-bold px-8 py-3 rounded-lg text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 