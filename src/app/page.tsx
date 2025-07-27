
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import VaultAnimation from '@/components/landing/VaultAnimation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% -20%,rgba(255,60,199,0.15), hsla(0,0%,100%,0))'
      }}></div>
      
      <VaultAnimation />

      <h1 className="font-headline mt-8 text-5xl md:text-7xl font-bold text-glow tracking-tighter">
        LinkVault
      </h1>
      <p className="mt-4 max-w-lg text-lg text-foreground/80">
        Save and Organize Links in Your Cyber Vault. Visually, securely, and with style.
      </p>

      <div className="mt-8">
        <Button asChild size="lg" className="font-bold text-lg neon-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_theme(colors.primary)]">
          <Link href="/dashboard">Enter the Vault</Link>
        </Button>
      </div>
    </main>
  );
}
