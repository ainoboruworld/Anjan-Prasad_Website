/**
 * A short, soft two-note chime synthesised with the Web Audio API, so no
 * audio asset has to load. Called right after a form submits successfully,
 * which follows a user gesture, so autoplay policy allows it. Fails silently
 * where audio is unavailable.
 */
export function playSuccessChime() {
  if (typeof window === "undefined") return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const t0 = ctx.currentTime + 0.02;
    const notes: [number, number][] = [
      [659.25, 0], // E5
      [987.77, 0.16], // B5
    ];
    for (const [freq, at] of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0 + at);
      gain.gain.exponentialRampToValueAtTime(0.35, t0 + at + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.9);
      osc.connect(gain).connect(master);
      osc.start(t0 + at);
      osc.stop(t0 + at + 1);
    }
    master.gain.exponentialRampToValueAtTime(0.6, t0 + 0.03);
    window.setTimeout(() => void ctx.close().catch(() => undefined), 1500);
  } catch {
    /* no audio: the visual confirmation is enough */
  }
}
