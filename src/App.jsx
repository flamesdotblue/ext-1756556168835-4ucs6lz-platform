import React from 'react';
import HeroSpline from './components/HeroSpline';
import RetrogradeAnswer from './components/RetrogradeAnswer';
import ConstellationCanvas from './components/ConstellationCanvas';
import FooterCharm from './components/FooterCharm';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <section className="relative h-screen w-full">
        <HeroSpline />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl px-6 text-center">
            <h1 className="font-extrabold tracking-tight text-4xl sm:text-6xl md:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow">Is Mercury in retrograde?</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              We consulted the stars, the vibes, and that one crystal that won’t stop buzzing.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </section>

      <section className="relative w-full py-24 sm:py-28 md:py-32 bg-black">
        <div className="absolute inset-0 opacity-60">
          <ConstellationCanvas />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <RetrogradeAnswer />
        </div>
      </section>

      <FooterCharm />
    </div>
  );
}
