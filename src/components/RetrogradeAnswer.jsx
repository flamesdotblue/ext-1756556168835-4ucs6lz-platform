import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

function CosmicSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative h-16 w-16 rounded-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-indigo-500 opacity-70 blur" />
        <div className="absolute inset-[6px] rounded-full bg-black" />
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_20px_4px_rgba(99,102,241,0.6)]"
          animate={{ y: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

function GlitchText({ text, yes }) {
  const color = yes ? 'from-fuchsia-300 via-rose-300 to-amber-200' : 'from-cyan-300 via-indigo-300 to-emerald-200';
  return (
    <div className="relative inline-block select-none">
      <span className={`relative z-10 bg-gradient-to-r ${color} bg-clip-text text-transparent font-extrabold tracking-tight`}>{text}</span>
      <span className="absolute left-0 top-0 text-white/50 blur-[1px]" aria-hidden>{text}</span>
      <span className="absolute left-[1px] top-[-1px] text-fuchsia-400/60" aria-hidden>{text}</span>
      <span className="absolute left-[-1px] top-[1px] text-cyan-400/60" aria-hidden>{text}</span>
      <style>{`
        @keyframes jitter { 0%{transform:translate(0,0)} 25%{transform:translate(0.5px,-0.6px)} 50%{transform:translate(-0.6px,0.7px)} 75%{transform:translate(0.7px,0.3px)} 100%{transform:translate(0,0)} }
        .glitch-jitter > span { animation: jitter 1200ms steps(2,end) infinite; }
      `}</style>
    </div>
  );
}

export default function RetrogradeAnswer() {
  const [data, setData] = useState({ loading: true, error: null, isRetro: null, sign: null, date: null });

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    async function getRetro() {
      try {
        const res = await fetch('https://mercuryretrogradeapi.com/', { signal: controller.signal });
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        if (mounted) {
          setData({ loading: false, error: null, isRetro: Boolean(json.is_retrograde), sign: json.sign || null, date: json.date || null });
        }
      } catch (err) {
        if (mounted) {
          // Chaotic fallback: pseudo-random based on day to keep it deterministic per day
          const seed = new Date().toISOString().slice(0, 10);
          const hash = Array.from(seed).reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0), 0);
          const chaos = Math.abs(hash) % 7;
          const fallbackRetro = chaos < 3; // ~43% chance, because vibes
          setData({ loading: false, error: err.message, isRetro: fallbackRetro, sign: null, date: null });
        }
      }
    }
    getRetro();
    return () => { mounted = false; controller.abort(); };
  }, []);

  const vibe = useMemo(() => {
    if (data.loading) return { title: 'Consulting the cosmos…', subtitle: 'Spinning up a tiny universe. Hold your auras.', yes: null };
    if (data.isRetro) return { title: 'YES', subtitle: 'Hide your texts. Back up your feelings. Double-save your tabs.', yes: true };
    return { title: 'NO', subtitle: 'Breathe. It’s just you this time. The stars are off the hook.', yes: false };
  }, [data.loading, data.isRetro]);

  return (
    <div className="relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        {data.loading ? (
          <div className="flex flex-col items-center gap-6">
            <CosmicSpinner />
            <p className="text-white/80">{vibe.subtitle}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glitch-jitter">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="text-7xl sm:text-8xl md:text-[8rem] font-black leading-none"
              >
                <GlitchText text={vibe.title} yes={vibe.yes} />
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80"
            >
              {vibe.subtitle}
            </motion.p>

            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-white/60">
              <Sparkles className="h-4 w-4" />
              {data.error ? (
                <span>Astro link was moody. Generated a vibe-based reading instead.</span>
              ) : (
                <span>
                  {data.isRetro ? 'Mercury appears to move backward' : 'Mercury is minding its orbit'}
                  {data.sign ? ` — in ${data.sign}` : ''}
                  {data.date ? ` as of ${new Date(data.date).toLocaleString()}` : ''}.
                </span>
              )}
              <Star className="h-4 w-4" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                <div className="rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 p-4">
                  <div className="text-sm uppercase tracking-widest text-white/60">Communication</div>
                  <div className="font-semibold mt-1">{data.isRetro ? 'Speak in drafts' : 'Green lights'}</div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-4">
                  <div className="text-sm uppercase tracking-widest text-white/60">Tech Gremlins</div>
                  <div className="font-semibold mt-1">{data.isRetro ? 'Befriend the glitch' : 'Gremlins asleep'}</div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 p-4">
                  <div className="text-sm uppercase tracking-widest text-white/60">Travel</div>
                  <div className="font-semibold mt-1">{data.isRetro ? 'Offer your GPS a crystal' : 'Cosmic smooth sailing'}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
