
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import VaultAnimation from '@/components/landing/VaultAnimation';
import Navbar from '@/components/landing/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
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
      <section id="about" className="py-20 px-4 container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-headline text-glow">About LinkVault</h2>
        <p className="mt-4 text-lg text-foreground/80">
          LinkVault is your personal space to save, organize, and quickly access your most important links. Say goodbye to cluttered bookmarks and hello to a visually organized vault.
        </p>
      </section>
      <section id="how-it-works" className="py-20 px-4 bg-card/50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-headline text-glow">How It Works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-primary/20 rounded-lg">
              <h3 className="text-2xl font-bold text-primary">1. Add Links</h3>
              <p className="mt-2 text-foreground/80">Easily add any link with a title, description, and category.</p>
            </div>
            <div className="p-6 border border-primary/20 rounded-lg">
              <h3 className="text-2xl font-bold text-primary">2. Organize</h3>
              <p className="mt-2 text-foreground/80">Categorize your links to keep your vault tidy and searchable.</p>
            </div>
            <div className="p-6 border border-primary/20 rounded-lg">
              <h3 className="text-2xl font-bold text-primary">3. Access</h3>
              <p className="mt-2 text-foreground/80">Quickly find what you need with powerful search and filtering.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="creator" className="py-20 px-4 container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-headline text-glow">About the Creator</h2>
        <div className="mt-8 flex flex-col items-center">
          <p className="mt-4 text-lg text-foreground/80">
            This app was created by Hamza, a passionate second-year BSAI student.
          </p>
        </div>
      </section>
    </>
  );
}
