"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calculator, Timer, FunctionSquare, Info, Menu, Gift, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Bank of Bonk", href: "/bank-of-bonk", icon: Info },
  { name: "Bonk Dividend Thesis", href: "/bonk-dividend-thesis", icon: FunctionSquare },
  { name: "$BONK Calculator", href: "/bonk-calculator", icon: Calculator },
  { name: "Timer", href: "/timer", icon: Timer },
  { name: "Rewards", href: "#", icon: Gift, isRewards: true },
  { name: "Upcoming Features", href: "/upcoming-features", icon: Sparkles },
  { name: "Dev & Team", href: "/dev-and-team", icon: Users },
];

function getNextHourCountdown() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(now.getHours() + 1, 0, 0, 0); // Always countdown to next full hour
  const diff = next.getTime() - now.getTime();
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getNextHourCountdown());
    const timer = setInterval(() => {
      setTimeLeft(getNextHourCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3 -mt-2 relative overflow-hidden text-center">
      <div className="flex items-center justify-center mb-1">
        <Timer className="w-6 h-6 text-black mr-2" />
        <span className="font-sophie text-3xl text-black font-bold">
          {timeLeft}
        </span>
      </div>
      <p className="text-sm text-black/70 font-sophie">Next Bank of Bonk Distribution</p>
    </div>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 bg-black/95 backdrop-blur-sm border-r border-white/20">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="space-y-4 py-4 relative">
          <div className="px-3 py-2">
            <Link href="/" className="block">
              <div className="flex items-center justify-center mb-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA319]/50 via-yellow-400/30 to-[#FFD600]/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse opacity-75" />
                <Image
                  src="/bonkbank.png"
                  alt="Bonk Bank Logo"
                  width={80}
                  height={80}
                  priority
                  className="rounded-full relative hover:scale-105 transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <h2 className="mb-2 px-4 text-2xl font-bold text-center tracking-wide bg-clip-text text-transparent solana-gradient-text">
                Bonk Bank
              </h2>
            </Link>

            <CountdownTimer />

            <nav className="space-y-2 mt-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                if (item.isRewards) {
                  return (
                    <Button 
                      key={item.name}
                      variant="ghost" 
                      onClick={() => {
                        // Trigger rewards popup
                        const event = new CustomEvent('openRewardsPopup');
                        window.dispatchEvent(event);
                      }}
                      className="w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6 hover:bg-gradient-to-r hover:from-transparent hover:to-[#FFD600]/30 text-white/80 hover:text-white"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                      <Icon className="h-6 w-6 transition-all duration-300 transform group-hover:scale-110 text-white/70 group-hover:text-white" />
                      <span className="relative z-10">{item.name}</span>
                    </Button>
                  );
                }
                
                return (
                  <Link key={item.name} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6",
                        isActive 
                          ? "bg-gradient-to-r from-transparent to-[#FFA319]/40 text-white font-medium" 
                          : "hover:bg-gradient-to-r hover:from-transparent hover:to-[#FFD600]/30 text-white/80 hover:text-white"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                      <Icon className={cn(
                        "h-6 w-6 transition-all duration-300 transform group-hover:scale-110",
                        isActive ? "text-white" : "text-white/70 group-hover:text-white"
                      )} />
                      <span className="relative z-10">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Join Community Button - Mobile */}
            <div className="mt-6 px-3">
              <a 
                href="https://x.com/i/communities/1947735996587774012/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6 bg-[#1A0F00] text-[#FFA319] border-2 border-[#FFA319] hover:border-[#FFD600] hover:text-[#FFD600] shadow-[0_0_10px_rgba(255,163,25,0.5)] hover:shadow-[0_0_15px_rgba(255,214,0,0.7)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                  <svg className="h-6 w-6 transition-all duration-300 transform group-hover:scale-110 text-[#FFA319] group-hover:text-[#FFD600]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="relative z-10">Join the Community</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      <MobileNav />
      <div className={cn("pb-12 border-r border-[#FFA319]/30 relative overflow-hidden backdrop-blur-md bg-[#FFA319] shadow-xl", className)}>
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFA319]/90 via-[#FFD600]/80 to-[#FFA319]/90" />
        {/* Subtle glow right edge */}
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-l from-[#FFD600]/60 to-transparent opacity-80 pointer-events-none" />
        
        {/* Animated LED border */}
        <div className="absolute right-0 top-0 w-[2px] h-full">
          <div className="absolute inset-0 animate-led-flow">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFA319] via-yellow-400 to-[#FFD600] opacity-90 blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFA319] via-yellow-400 to-[#FFD600]" />
          </div>
          <div className="absolute inset-0 animate-led-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-70 blur-sm" />
          </div>
        </div>

        <div className="space-y-4 py-4 relative">
          <div className="px-3 py-2">
            <Link href="/" className="block">
              <div className="flex items-center justify-center mb-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA319]/80 via-yellow-400/60 to-[#FFD600]/80 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse opacity-90" />
                <Image
                  src="/bonkbank.png"
                  alt="Bonk Bank Logo"
                  width={80}
                  height={80}
                  priority
                  className="rounded-full relative hover:scale-105 transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <h2 className="mb-2 px-4 text-2xl font-bold text-center tracking-wide bg-clip-text text-transparent solana-gradient-text">
                Bonk Bank
              </h2>
            </Link>

            {/* Add CountdownTimer here */}
            <CountdownTimer />

            <nav className="space-y-2 mt-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                if (item.isRewards) {
                  return (
                    <Button 
                      key={item.name}
                      variant="ghost" 
                      onClick={() => {
                        // Trigger rewards popup
                        const event = new CustomEvent('openRewardsPopup');
                        window.dispatchEvent(event);
                      }}
                      className="w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6 hover:bg-gradient-to-r hover:from-transparent hover:to-[#FFD600]/30 text-black/80 hover:text-black md:drop-shadow-lg md:hover:drop-shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                      <Icon className="h-6 w-6 transition-all duration-300 transform group-hover:scale-110 text-black/70 group-hover:text-black" />
                      <span className="relative z-10">{item.name}</span>
                    </Button>
                  );
                }
                
                return (
                  <Link key={item.name} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6 md:drop-shadow-lg md:hover:drop-shadow-xl",
                        item.name === "$BONK Calculator" 
                          ? "bg-gradient-to-r from-[#FFA319]/20 to-[#FFD600]/20 border-2 border-[#FFA319]/40 hover:border-[#FFD600]/60 text-black font-bold shadow-[0_0_8px_rgba(255,163,25,0.3)] hover:shadow-[0_0_12px_rgba(255,214,0,0.5)]"
                          : isActive 
                            ? "bg-gradient-to-r from-transparent to-[#FFA319]/40 text-black font-medium" 
                            : "hover:bg-gradient-to-r hover:from-transparent hover:to-[#FFD600]/30 text-black/80 hover:text-black"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                      <Icon className={cn(
                        "h-6 w-6 transition-all duration-300 transform group-hover:scale-110",
                        item.name === "$BONK Calculator" 
                          ? "text-black font-bold" 
                          : isActive ? "text-black" : "text-black/70 group-hover:text-black"
                      )} />
                      <span className="relative z-10">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Join Community Button - Desktop Only */}
            <div className="mt-6 px-3">
              <a 
                href="https://x.com/i/communities/1947735996587774012/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 transition-all duration-300 relative overflow-hidden group tracking-wide text-lg py-6 bg-[#1A0F00] text-[#FFA319] border-2 border-[#FFA319] hover:border-[#FFD600] hover:text-[#FFD600] md:drop-shadow-lg md:hover:drop-shadow-xl shadow-[0_0_10px_rgba(255,163,25,0.5)] hover:shadow-[0_0_15px_rgba(255,214,0,0.7)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFA319]/10 to-[#FFD600]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />
                  <svg className="h-6 w-6 transition-all duration-300 transform group-hover:scale-110 text-[#FFA319] group-hover:text-[#FFD600]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="relative z-10">Join the Community</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 