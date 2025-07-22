"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Github, Users, Zap, Star, Crown } from "lucide-react";

export default function DevAndTeam() {
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

  const teamMembers = [
    {
      name: "Valentino",
      handle: "@ValentinoCrypt",
      role: "Lead Developer & Founder",
      bio: "The cutest SOL trader onchain 🥺 slowly retiring off trading memecoins and having fun while doing so. Founder of @goatkol - the GOAT of all KOLs!",
      story: "Legend has it that Valentino was born with a keyboard in one hand and a SOL wallet in the other. When he's not making 1000x gains on memecoins, he's probably coding the next revolutionary DeFi protocol or teaching his cat to trade. Known for his signature move: buying the absolute bottom and selling the absolute top. Some say he can predict market movements by reading tea leaves, but we know it's just pure degen intuition! 🚀",
      image: "/valentino.png",
      social: {
        twitter: "https://x.com/ValentinoCrypt",
        telegram: "https://t.me/GOATkol",
      },
      stats: {
        followers: "864",
        trades: "∞",
        gains: "1000x+"
      },
      xData: {
        joined: "June 2025",
        following: "57",
        followers: "864",
        bio: "slowly retiring off trading memecoins and having fun while doing so. you may know me as the cutest SOL trader onchain. founder @goatkol"
      }
    },
    {
      name: "Effect | Crypto",
      handle: "@EffectxCrypto",
      role: "Community Manager & Meme Lord",
      bio: "Effect | Cryptotrader, Memes, Tekk, #nofud - The master of memes and the guardian of community vibes!",
      story: "Effect is the kind of person who can turn any FUD into pure comedy gold. When the market is crashing, he's the one posting memes that make everyone laugh instead of panic. His secret weapon? Unlimited supply of dank memes and an uncanny ability to spot the next 100x gem before anyone else. Rumor has it he has a secret folder with 10,000 memes ready for any market situation. The community's emotional support animal and resident meme therapist! 😂",
      image: "/effect.png",
      social: {
        twitter: "https://x.com/EffectxCrypto",
        telegram: "https://t.me/GOATkol",
      },
      stats: {
        followers: "1,142",
        memes: "∞",
        vibes: "100%"
      },
      xData: {
        joined: "February 2025",
        following: "6",
        followers: "1,142",
        bio: "Effect | Cryptotrader, Memes, Tekk, #nofud"
      }
    },
    {
      name: "崔师傅",
      handle: "@Cuibythewind",
      role: "Tech Lead & Innovation Wizard",
      bio: "寻找下一个Bonk - Always hunting for the next big thing in crypto! The tech wizard behind the scenes making magic happen.",
      story: "崔师傅 is the mysterious tech wizard who speaks in code and dreams in blockchain. When he's not hunting for the next Bonk, he's probably building something that will revolutionize DeFi. His coding sessions are legendary - some say he can debug complex smart contracts while simultaneously trading memecoins and making perfect coffee. The kind of developer who writes code so clean it makes other developers cry tears of joy. His secret? He treats every line of code like it's a potential 1000x trade! 💻✨",
              image: "/Cuibythewind.jpg",
      social: {
        twitter: "https://x.com/Cuibythewind",
        github: "#",
      },
      stats: {
        followers: "4,692",
        commits: "∞",
        bugs: "0"
      },
      xData: {
        joined: "September 2014",
        following: "6",
        followers: "4,692",
        bio: "寻找下一个Bonk"
      }
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
            Meet the Dev & Team
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-sophie">
            The legendary degens behind The Bank of Bonk - versierte tech liebhaber who turned memes into millions! 🚀
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const Icon = index === 0 ? Crown : index === 1 ? Star : Zap;
            return (
              <div
                key={index}
                className="bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center transform -rotate-12">
                  <Icon className="w-8 h-8 text-[#FFA319]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-[#FFA319] shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#FFA319] font-sophie text-center">
                    {member.name}
                  </h3>
                  <p className="text-lg text-[#FFD600] mb-1 font-sophie text-center">
                    {member.handle}
                  </p>
                  <p className="text-white/90 mb-4 font-sophie text-center">
                    {member.role}
                  </p>
                  <p className="text-white/80 mb-6 text-2xl font-sophie text-center">
                    {member.bio}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(member.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-[#FFA319] font-sophie">{value}</div>
                        <div className="text-xs text-white/60 font-sophie capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* X Profile Data */}
                  <div className="bg-[#1A0F00]/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[#FFA319] font-bold font-sophie">X Profile</h4>
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#FFD600] hover:text-[#FFA319] text-sm font-sophie transition-colors"
                      >
                        View Profile →
                      </a>
                    </div>
                    <div className="space-y-2 text-lg font-sophie">
                      <div className="flex justify-between">
                        <span className="text-white/60">Joined:</span>
                        <span className="text-white/80">{member.xData.joined}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Following:</span>
                        <span className="text-white/80">{member.xData.following}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Followers:</span>
                        <span className="text-white/80">{member.xData.followers}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <span className="text-white/60 block mb-1">Bio:</span>
                        <span className="text-white/80 text-base leading-relaxed font-sophie">{member.xData.bio}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="bg-[#1A0F00]/50 rounded-lg p-4 mb-6">
                    <p className="text-white/70 text-xl font-sophie leading-relaxed">
                      {member.story.split(' ').map((word, index) => {
                        if (index === 0) {
                          return <span key={index} className="text-[#FFA319] animate-pulse font-bold">{word} </span>;
                        }
                        return <span key={index}>{word} </span>;
                      })}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {member.social.twitter && (
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] p-3 rounded-full transition-all duration-200 hover:scale-110"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.telegram && (
                      <a 
                        href={member.social.telegram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] p-3 rounded-full transition-all duration-200 hover:scale-110"
                      >
                        <Users className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a 
                        href={member.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] p-3 rounded-full transition-all duration-200 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#FFA319]/20 to-[#FFD600]/20 rounded-lg p-8 border border-[#FFA319]/40">
            <h2 className="text-3xl font-bold text-white mb-4 font-sophie">
              Ready to Join the Legendary Team?
            </h2>
            <p className="text-white/80 text-lg mb-6 font-sophie">
              Follow our team on X and become part of the most degen community in crypto! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://x.com/ValentinoCrypt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-8 py-3 rounded-lg text-lg transition-all flex items-center justify-center group"
              >
                <span className="mr-2">Follow Dev</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/GOATkol"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-[#FFA319] hover:border-[#FFD600] text-[#FFA319] hover:text-[#FFD600] font-bold px-8 py-3 rounded-lg text-lg transition-all"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 