import React from 'react';
import { Rocket, Star } from 'lucide-react';

export default function FooterCharm() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-black/70">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_40%_at_50%_120%,rgba(168,85,247,0.15),rgba(0,0,0,0))]" />
      <div className="relative mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-white">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70">An ironic–spiritual service</div>
            <div className="text-xs text-white/50">Crystals charged. Wi‑Fi saged.</div>
          </div>
        </div>
        <div className="text-xs text-white/50 flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          <span>Made with stardust, sarcasm, and React</span>
        </div>
      </div>
    </footer>
  );
}
