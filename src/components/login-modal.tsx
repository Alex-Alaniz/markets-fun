import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

const WalletOption = ({ name, icon, onConnect }: { name: string; icon: string; onConnect: () => void }) => (
  <button onClick={onConnect} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center">
      <img src={icon} alt={name} className="w-8 h-8 mr-3" />
      <span className="font-medium">{name}</span>
    </div>
  </button>
);

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');

  const connectWallet = async (walletName: string) => {
    try {
      if (walletName === 'MetaMask') {
        if (typeof window !== 'undefined' && 'ethereum' in window) {
          const provider = new ethers.BrowserProvider(window.ethereum as any);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          console.log(`Connected to ${walletName}: ${address}`);
        } else {
          console.error("Please install MetaMask.");
        }
      } else if (walletName === 'Coinbase Wallet') {
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: 'MarketFun',
          appLogoUrl: 'https://example.com/logo.png',
        });

        const provider = coinbaseWallet.makeWeb3Provider();
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        const address = await signer.getAddress();
        console.log(`Connected to ${walletName}: ${address}`);
      } else if (walletName === 'Phantom') {
        const provider = (window as any).solana;
        if (provider?.isPhantom) {
          const response = await provider.connect();
          const publicKey = response.publicKey.toString();
          console.log(`Connected to ${walletName}: ${publicKey}`);
        } else {
          console.error("Please install Phantom Wallet.");
        }
      } else if (walletName === 'WalletConnect') {
        const connector = new WalletConnectProvider({
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        });
        await connector.enable();
        const ethersProvider = new ethers.BrowserProvider(connector);
        const signer = await ethersProvider.getSigner();
        const address = await signer.getAddress();
        console.log(`Connected to ${walletName}: ${address}`);
      }
    } catch (error) {
      // Only log errors, do not set error messages in the modal
      console.error("Connection failed:", error);
    }
  };

  const handleEmailSignUp = () => {
    console.log("Email sign-up for:", email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Log in</DialogTitle>
          <Button className="absolute right-4 top-4 rounded-sm opacity-70" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={handleEmailSignUp}>
            <img src="/google-icon-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <div className="flex items-center space-x-2">
            <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="button" onClick={handleEmailSignUp}>Continue</Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="space-y-2">
            <WalletOption name="MetaMask" icon="/MetaMask.png" onConnect={() => connectWallet('MetaMask')} />
            <WalletOption name="Coinbase Wallet" icon="/cbw.svg" onConnect={() => connectWallet('Coinbase Wallet')} />
            <WalletOption name="Phantom" icon="/phantom.png" onConnect={() => connectWallet('Phantom')} />
            <WalletOption name="WalletConnect" icon="/wc.svg" onConnect={() => connectWallet('WalletConnect')} />
          </div>
          <div className="text-center text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacy</a>
            {' · '}
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}