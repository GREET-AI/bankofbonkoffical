"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRightCircle, CheckCircle } from 'lucide-react';

interface FloatingNumber {
  id: number;
  value: string;
  left: string;
  top: string;
  delay: string;
  color: string;
}

interface FloatingLogo {
  id: number;
  left: string;
  top: string;
  delay: string;
  scale: string;
  opacity: string;
}



export default function BankOfBonk() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; color: string; size: string }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ left: string; delay: string }>>([]);
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [floatingLogos, setFloatingLogos] = useState<FloatingLogo[]>([]);
  const [floatingCharts, setFloatingCharts] = useState<Array<{ id: string; left: string; top: string; delay: string; direction: string }>>([]);
  const [floatingMoney, setFloatingMoney] = useState<Array<{ id: string; left: string; top: string; delay: string; symbol: string }>>([]);
  const [backgroundChartData, setBackgroundChartData] = useState<number[]>([]);
  const [candlesticks, setCandlesticks] = useState<Array<{ id: string; left: string; height: number; delay: string; open: number; close: number; high: number; low: number }>>([]);

  // Generate random timer value
  const generateRandomTime = () => {
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Get random Bonk color
  const getRandomBonkColor = () => {
    return Math.random() > 0.5 ? '#FFA319' : '#FFD600';
  };

  // Generate candlestick data
  const generateCandlestick = () => {
    const basePrice = 100 + Math.random() * 50;
    const open = basePrice;
    const close = basePrice + (Math.random() * 20 - 10);
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    const height = Math.abs(close - open) + 40; // Much taller - was +5, now +40
    
    return {
      id: `candlestick-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      left: `${Math.random() * 90 + 5}%`,
      height: height,
      delay: `${Math.random() * 3}s`,
      open: open,
      close: close,
      high: high,
      low: low
    };
  };

  // Generate background chart data
  const generateChartData = () => {
    const newData = Array.from({ length: 50 }, (_, i) => {
      // Start at 100 and create a living chart with spikes and dips
      const baseValue = 100 + (i * 3);
      
      // Add random spikes and dips to make it more alive
      let spike = 0;
      if (Math.random() > 0.7) {
        // 30% chance of a spike
        spike = Math.random() * 40 + 20; // 20-60 point spike
      } else if (Math.random() > 0.8) {
        // 10% chance of a dip
        spike = -(Math.random() * 20 + 10); // 10-30 point dip
      }
      
      const finalValue = baseValue + spike;
      return Math.max(50, Math.min(300, finalValue));
    });
    setBackgroundChartData(newData);
  };

  useEffect(() => {
    // Initial chart data
    generateChartData();

    // Generate initial candlesticks
    const initialCandlesticks = Array.from({ length: 15 }, () => generateCandlestick());
    setCandlesticks(initialCandlesticks);

    // Update chart data every 2 seconds
    const chartInterval = setInterval(() => {
      setBackgroundChartData(prev => {
        const newData = [...prev.slice(1)]; // Remove first point
        const lastValue = newData[newData.length - 1] || 100;
        
        // Create a new point with random spikes and dips
        let newValue = lastValue + 3; // Base increase
        
        // Add random spikes and dips to make it more alive
        if (Math.random() > 0.7) {
          // 30% chance of a spike
          newValue += Math.random() * 40 + 20; // 20-60 point spike
        } else if (Math.random() > 0.8) {
          // 10% chance of a dip
          newValue -= Math.random() * 20 + 10; // 10-30 point dip
        }
        
        newData.push(Math.max(50, Math.min(300, newValue))); // Add new point with variation
        return newData;
      });
    }, 1500); // Update faster

    // Generate new candlesticks every 1.5 seconds
    const candlestickInterval = setInterval(() => {
      setCandlesticks(prev => {
        const newCandlesticks = [...prev.slice(1)]; // Remove oldest
        newCandlesticks.push(generateCandlestick());
        return newCandlesticks;
      });
    }, 1500);

    return () => {
      clearInterval(chartInterval);
      clearInterval(candlestickInterval);
    };
  }, []);

  useEffect(() => {
    // Generate particles (sparkles) - jetzt als Geld-Symbole
    const newParticles = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      color: Math.random() > 0.5 ? '#FFA319' : '#FFD600',
      size: `${Math.random() * 3 + 2}px`
    }));
    setParticles(newParticles);

    // Generate shooting stars - jetzt als aufsteigende Charts
    const newShootingStars = Array.from({ length: 6 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);

    // Floating charts (aufsteigende Linien)
    const newFloatingCharts = Array.from({ length: 8 }, (_, index) => ({
      id: `chart-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      direction: Math.random() > 0.5 ? 'up' : 'down'
    }));
    setFloatingCharts(newFloatingCharts);

    // Floating money symbols
    const moneySymbols = ['$', '€', '¥', '£', '₿', '💎', '💰', '💵'];
    const newFloatingMoney = Array.from({ length: 12 }, (_, index) => ({
      id: `money-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      symbol: moneySymbols[Math.floor(Math.random() * moneySymbols.length)]
    }));
    setFloatingMoney(newFloatingMoney);

    // Floating numbers logic
    const generateNumber = () => {
      const newNumber = {
        id: Date.now(),
        value: generateRandomTime(),
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 2}s`,
        color: getRandomBonkColor()
      };

      setFloatingNumbers(prev => [...prev, newNumber]);

      setTimeout(() => {
        setFloatingNumbers(prev => prev.filter(num => num.id !== newNumber.id));
      }, 3000);
    };

    // Floating BONK logos logic
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
            d={backgroundChartData.length > 0 ? 
              `M 0 ${400 - backgroundChartData[0] * 1.5} ` + 
              backgroundChartData.map((value, index) => 
                `L ${(index + 1) * 20} ${400 - value * 1.5}`
              ).join(' ') : ''}
            stroke="url(#chartGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
          
          {/* Chart area fill */}
          <path
            d={backgroundChartData.length > 0 ? 
              `M 0 ${400 - backgroundChartData[0] * 1.5} ` + 
              backgroundChartData.map((value, index) => 
                `L ${(index + 1) * 20} ${400 - value * 1.5}`
              ).join(' ') + 
              ` L ${backgroundChartData.length * 20} 400 L 0 400 Z` : ''}
            fill="url(#chartGradient)"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Candlesticks */}
      <div className="absolute inset-0 pointer-events-none z-0 md:left-72">
        {candlesticks.map((candle) => (
          <div
            key={candle.id}
            className="absolute animate-candlestick-grow"
            style={{
              left: candle.left,
              bottom: '0',
              animationDelay: candle.delay,
              opacity: 0.8
            }}
          >
            {/* Wick */}
            <div 
              className="bg-green-300 absolute left-1/2 transform -translate-x-1/2" 
              style={{
                width: '2px',
                height: `${Math.abs(candle.high - candle.low) + 10}px`,
                bottom: `${candle.height}px`,
                boxShadow: '0 0 5px #22c55e'
              }}
            />
            {/* Body */}
            <div
              className="bg-green-400 rounded-sm"
              style={{
                width: '10px',
                height: `${candle.height}px`,
                boxShadow: '0 0 10px #4ade80, 0 0 20px #22c55e'
              }}
            />
          </div>
        ))}
      </div>

      {/* Content wrapper with particles */}
      <div className="relative z-10">
        {/* Floating Numbers */}
        {floatingNumbers.map((number) => (
          <div
            key={number.id}
            className="absolute animate-float-number font-sophie text-lg"
            style={{
              left: number.left,
              top: number.top,
              animationDelay: number.delay,
              color: number.color,
              opacity: 0.4
            }}
          >
            {number.value}
          </div>
        ))}

        {/* Floating BONK Logos */}
        {floatingLogos.map((logo) => (
          <div
            key={logo.id}
            className="absolute animate-float-logo"
            style={{
              left: logo.left,
              top: logo.top,
              animationDelay: logo.delay,
              opacity: logo.opacity,
              transform: `scale(${logo.scale})`
            }}
          >
            <Image
              src="/bonkbank.png"
              alt="Bonk Bank"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        ))}

        {/* Floating Charts */}
        {floatingCharts.map((chart) => (
          <div
            key={chart.id}
            className="absolute animate-float-chart"
            style={{
              left: chart.left,
              top: chart.top,
              animationDelay: chart.delay,
              opacity: 0.4
            }}
          >
            <svg 
              width="50" 
              height="25" 
              viewBox="0 0 50 25"
              className={chart.direction === 'up' ? 'text-green-400' : 'text-red-400'}
            >
              {chart.direction === 'up' ? (
                // Pump Chart - massive Ausschläge nach oben
                <path
                  d="M0 20 L2 18 L4 15 L6 12 L8 8 L10 5 L12 3 L14 1 L16 0 L18 2 L20 0 L22 1 L24 0 L26 2 L28 0 L30 1 L32 0 L34 2 L36 0 L38 1 L40 0 L42 2 L44 0 L46 1 L48 0 L50 1"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                // Bear Chart - mit kleinen Pumps
                <path
                  d="M0 5 L2 7 L4 5 L6 8 L8 6 L10 9 L12 7 L14 10 L16 8 L18 11 L20 9 L22 12 L24 10 L26 13 L28 11 L30 14 L32 12 L34 15 L36 13 L38 16 L40 14 L42 17 L44 15 L46 18 L48 16 L50 19"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        ))}

        {/* Floating Money Symbols */}
        {floatingMoney.map((money) => (
          <div
            key={money.id}
            className="absolute animate-float-money font-sophie text-xl"
            style={{
              left: money.left,
              top: money.top,
              animationDelay: money.delay,
              color: '#FFD600',
              opacity: 0.4
            }}
          >
            {money.symbol}
          </div>
        ))}

        {/* Animated particles (sparkles) and shooting stars container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
              <h1 className="text-6xl font-bold tracking-tight relative">
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FFA319]/20 to-[#FFD600]/20 blur-lg opacity-30" />
                  <span className="relative bg-gradient-to-r from-[#FFA319] to-[#FFD600] bg-clip-text text-transparent">
                    Welcome to The Bank of Bonk!
                  </span>
                </span>
              </h1>
              
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
                In The Bank of Bonk, every BONK counts—because rewards are the currency of growth.
              </p>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3 relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 w-full hidden md:block">
                <div className="h-0.5 bg-gradient-to-r from-[#14F195]/20 to-[#14F195]/20 w-full"></div>
              </div>

              {/* Step 1 */}
              <div className="bg-[#2B1B00] rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                  1
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                  <Image
                    src="/phantom.png"
                    alt="Phantom"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FFA319]">
                  Set Up Your wallet
                </h3>
                <ul className="space-y-3 text-white text-sm mb-auto">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Create Phantom or Solflare wallet
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Save seed phrase securely
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Receive BONK rewards automatically
                  </li>
                </ul>
                <a
                  href="https://phantom.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg transition-all duration-200 text-center font-sophie"
                >
                  Download
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-[#2B1B00] rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                  2
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                  <Image
                    src="/jupiter.png"
                    alt="Jupiter"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FFA319]">
                  Fund Your wallet
                </h3>
                <ul className="space-y-3 text-white text-sm mb-auto">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Buy Solana on major exchanges
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Or swap via Jupiter (jup.ag)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> We recommend buying enough Solana to get started and cover fees.
                  </li>
                </ul>
                <a
                  href="https://jup.ag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg transition-all duration-200 text-center font-sophie"
                >
                  Trade
                </a>
              </div>

              {/* Step 3 */}
              <div className="bg-[#2B1B00] rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                  3
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                  <Image
                    src="/letsbonkfun.png"
                    alt="LetsBonk.fun"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FFA319]">
                  Buy on letsbonk.fun
                </h3>
                <ul className="space-y-3 text-white text-sm mb-auto">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Visit letsbonk.fun
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Connect your wallet
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#FFD600] mr-2" /> Buy min. 100k BONKBANK
                  </li>
                </ul>
                <a 
                  href="https://letsbonk.fun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg transition-all duration-200 text-center font-sophie"
                >
                  Visit
                </a>
              </div>
            </div>

            {/* Then you start earning... text */}
            <div className="text-center mt-12 mb-8">
              <div className="inline-block bg-[#14F195]/10 rounded-lg px-6 py-3">
                <p className="text-xl text-white/90">Then you start earning...</p>
              </div>
            </div>

            {/* Reward System Card */}
            <div className="mt-12 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300 flex flex-col min-h-[320px]">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#FFA319] transform -rotate-12">
                $
              </div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FFA319]/5 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
                <Image
                  src="/bonkbank.png"
                  alt="Bonk Bank"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-[#FFA319]">
                  Reward System
                </h3>
                <ul className="space-y-3 text-white text-sm mb-auto">
                  <li className="flex items-start">
                    <ArrowRightCircle className="w-4 h-4 mr-2 mt-0.5 text-[#FFD600]" />
                    <span>LetsBONK.fun collects trading fees and distributes revenue strategically.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRightCircle className="w-4 h-4 mr-2 mt-0.5 text-[#FFD600]" />
                    <span>4% of platform revenue goes to the BonkRewards pool for BONKBANK holders.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRightCircle className="w-4 h-4 mr-2 mt-0.5 text-[#FFD600]" />
                    <span>To qualify, you must hold at least 100,000 BONKBANK for at least 30 minutes.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRightCircle className="w-4 h-4 mr-2 mt-0.5 text-[#FFD600]" />
                    <span>Rewards = (Your BONKBANK / Total BONKBANK) × BonkRewards Pool × Tier Multiplier × Time Multiplier</span>
                  </li>
                </ul>
                <div className="flex justify-end mt-4">
                  <button className="bg-[#FFA319] hover:bg-[#FFD600] text-[#1A0F00] font-bold px-6 py-2 rounded-lg transition-all duration-200 font-sophie">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Multipliers Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Multipliers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#FFA319]/20 rounded-lg p-4 text-center hover:bg-[#FFA319]/30 transition-all duration-200">
                    <div className="text-3xl mb-2">🐟</div>
                    <div className="text-white font-bold">1.1x</div>
                    <div className="text-white/70 text-sm">Fish</div>
                  </div>
                  <div className="bg-[#FFA319]/20 rounded-lg p-4 text-center hover:bg-[#FFA319]/30 transition-all duration-200">
                    <div className="text-3xl mb-2">🦀</div>
                    <div className="text-white font-bold">1.2x</div>
                    <div className="text-white/70 text-sm">Crab</div>
                  </div>
                  <div className="bg-[#FFA319]/20 rounded-lg p-4 text-center hover:bg-[#FFA319]/30 transition-all duration-200">
                    <div className="text-3xl mb-2">🐬</div>
                    <div className="text-white font-bold">1.3x</div>
                    <div className="text-white/70 text-sm">Dolphin</div>
                  </div>
                  <div className="bg-[#FFA319]/20 rounded-lg p-4 text-center hover:bg-[#FFA319]/30 transition-all duration-200">
                    <div className="text-3xl mb-2">🐋</div>
                    <div className="text-white font-bold">1.5x</div>
                    <div className="text-white/70 text-sm">Whale</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Multipliers Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Time Multipliers</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">30 minutes</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.0x</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">1 hour</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.1x</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">2 hours</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.2x</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">4 hours</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.3x</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">12 hours</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.4x</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      <span className="text-white font-semibold">24 hours</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1.5x</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mt-4">
                  Diamond hands get rewarded - hold longer, earn more BONK rewards!
                </p>
              </div>
            </div>

            {/* Tiers Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Tiers</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🦐</span>
                      <span className="text-white font-semibold">Shrimp</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">100k BONKBANK</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🐟</span>
                      <span className="text-white font-semibold">Fish</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">500k BONKBANK</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🦀</span>
                      <span className="text-white font-semibold">Crab</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">1M BONKBANK</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🐬</span>
                      <span className="text-white font-semibold">Dolphin</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">5M BONKBANK</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#FFA319]/10 rounded-lg p-4 hover:bg-[#FFA319]/20 transition-all duration-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🐋</span>
                      <span className="text-white font-semibold">Whale</span>
                    </div>
                    <span className="text-[#FFD600] font-bold text-lg font-sophie">10M+ BONKBANK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Example</h3>
                <div className="space-y-4 text-white">
                  <p className="text-white/80 mb-4 text-sm font-sophie">
                    If you hold 200,000 BONKBANK for 4 hours with daily platform revenue of $50,000:
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Your BONKBANK:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        200,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Total BONKBANK:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1,000,000,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Daily Platform Revenue:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $50,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">BonkRewards Pool (4%):</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $2,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Reward Pool per cycle:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $41.67
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Your Share:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        0.2%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Tier Multiplier:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1.1x (Fish)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Time Multiplier:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1.3x (4h holding)
                      </span>
                    </div>
                    <div className="border-t border-[#FFA319]/20 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#FFA319] font-bold text-lg font-sophie">
                          Your BONK Reward:
                        </span>
                        <span className="text-[#FFD600] font-bold text-xl font-sophie">
                          $0.12 BONK
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-[#FFA319]/20 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Daily (48 cycles):</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $5.76 BONK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Weekly:</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $40.32 BONK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Monthly:</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $172.80 BONK
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Example Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Example 2: Whale Holder</h3>
                <div className="space-y-4 text-white">
                  <p className="text-white/80 mb-4 text-sm font-sophie">
                    If you hold 5,000,000 BONKBANK for 24 hours with daily platform revenue of $100,000:
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Your BONKBANK:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        5,000,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Total BONKBANK:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1,000,000,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Daily Platform Revenue:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $100,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">BonkRewards Pool (4%):</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $4,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Reward Pool per cycle:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        $83.33
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Your Share:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        0.5%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Tier Multiplier:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1.3x (Dolphin)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/90 font-sophie">Time Multiplier:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">
                        1.5x (24h holding)
                      </span>
                    </div>
                    <div className="border-t border-[#FFA319]/20 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#FFA319] font-bold text-lg font-sophie">
                          Your BONK Reward:
                        </span>
                        <span className="text-[#FFD600] font-bold text-xl font-sophie">
                          $0.81 BONK
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-[#FFA319]/20 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Daily (48 cycles):</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $38.88 BONK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Weekly:</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $272.16 BONK
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 font-sophie">Monthly:</span>
                        <span className="text-[#FFD600] font-bold text-lg font-sophie">
                          $1,166.40 BONK
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Rewards Card */}
            <div className="mt-8 bg-[#2B1B00] backdrop-blur-sm rounded-lg p-8 border border-[#FFA319]/40 relative overflow-hidden group hover:border-[#FFD600]/60 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/10 via-[#2B1B00]/20 to-[#FFD600]/10 animate-gradient-slow group-hover:from-[#FFA319]/20 group-hover:to-[#FFD600]/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-[#FFA319] font-sophie">Live Rewards</h3>
                <div className="space-y-4 text-white">
                  <p className="text-sm">BONK rewards grow live in the app with animated popups. The longer you hold BONKBANK, the faster your BONK rewards grow!</p>
                  <div className="bg-[#FFA319]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span>Current BONK Reward:</span>
                      <span className="text-[#FFD600] font-bold animate-pulse text-lg font-sophie">$12.45 BONK</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span>BONKBANK Held:</span>
                      <span className="text-[#FFD600] font-bold text-lg font-sophie">200,000</span>
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