
"use client";

import { Lock } from 'lucide-react';

const VaultAnimation = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow"></div>
      <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse-slow [animation-delay:200ms]"></div>
      
      <div className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-primary/50 neon-border animate-pulse-glow">
        <div className="w-[75%] h-[75%] rounded-full flex items-center justify-center border-2 border-primary/40">
           <div className="w-[50%] h-[50%] rounded-full flex items-center justify-center border border-primary/30">
             <Lock className="w-16 h-16 text-primary neon-glow" />
           </div>
        </div>
        <div className="absolute w-full h-full">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute w-2 h-4 bg-secondary rounded-full" style={{
                    transform: `rotate(${i * 60}deg) translateY(calc(-50% - 1rem))`,
                    top: '50%',
                    left: '50%',
                    marginTop: '-0.5rem',
                    marginLeft: '-0.25rem',
                    transformOrigin: '0.25rem calc(50% + 1rem)',
                    boxShadow: '0 0 5px hsl(var(--secondary))'
                }}></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VaultAnimation;
