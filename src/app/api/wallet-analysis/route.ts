import { NextRequest, NextResponse } from 'next/server';
import { WalletService } from '@/lib/services/wallet.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
  }

  try {
    const walletService = new WalletService();
    
    // Debug: Log the address and token mint
    console.log('🔍 DEBUG: Analyzing wallet:', address);
    console.log('🔍 DEBUG: Token mint:', walletService['TIMER_TOKEN_MINT']);
    
    const result = await walletService.analyzeWallet(address);
    
    // Debug: Log the analysis result
    console.log('🔍 DEBUG: Analysis result:', result);
    
    return NextResponse.json({
      heldForMinutes: result.analysisData.heldForMinutes,
      volume24h: result.analysisData.volume24h,
      tier: result.analysisData.tier,
      reward: result.analysisData.reward,
      solReward: result.solReward,
      bonkReward: result.bonkReward
    });
  } catch (error) {
    console.error('Error analyzing wallet:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 