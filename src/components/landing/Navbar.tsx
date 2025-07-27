
"use client";
import Link from 'next/link';
import { Vault } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Vault className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">LinkVault</span>
        </Link>
        <nav className="hidden md:flex gap-1">
          <Button variant="ghost" asChild>
            <Link href="#about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#how-it-works">How It Works</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#creator">Creator</Link>
          </Button>
        </nav>
        <div className='flex items-center gap-4'>
            <Button asChild className="hidden md:flex">
                <Link href="/dashboard">Enter the Vault</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
