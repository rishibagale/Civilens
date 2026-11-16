/**
 * ambientAudio.ts
 *
 * Procedural Web Audio Ambient Harmonics ("Harmony of the Spheres").
 * 100% mathematical zero-asset audio synthesis:
 * - 432 Hz celestial sub-harmonic drone with breathing LFO filter
 * - Orbital velocity wind resonance reacting to globe spin
 * - Resonant crystalline astrolabe arrival chime on locus discovery
 *
 * Persists user mute preference in localStorage.
 */

type SoundStateListener = (enabled: boolean) => void;

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isEnabled = false;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private windGain: GainNode | null = null;
  private listeners: Set<SoundStateListener> = new Set();
  private hasInitialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("curios_sound_enabled");
      this.isEnabled = stored === "true";
    }
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  public subscribe(listener: SoundStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isEnabled);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isEnabled));
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private initGraph() {
    if (this.hasInitialized) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    // Master Gain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isEnabled ? 0.35 : 0, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    // ── 1. Planetary Sub-Harmonic Drone (108Hz, 216Hz, 324Hz, 432Hz) ──
    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.22, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(280, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    // Ultra-slow breathing LFO (0.04 Hz)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.04, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(120, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Harmonics chord
    const freqs = [108, 216, 324, 432];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.18 / (idx + 1), ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
    });

    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    // ── 2. Orbital Velocity Wind Synthesizer ──
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = "bandpass";
    this.windFilter.frequency.setValueAtTime(220, ctx.currentTime);
    this.windFilter.Q.setValueAtTime(3.0, ctx.currentTime);

    this.windGain = ctx.createGain();
    this.windGain.gain.setValueAtTime(0.0, ctx.currentTime);

    whiteNoise.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);
    whiteNoise.start();

    this.hasInitialized = true;
  }

  public toggleSound(): boolean {
    const next = !this.isEnabled;
    this.isEnabled = next;
    if (typeof window !== "undefined") {
      localStorage.setItem("curios_sound_enabled", String(next));
    }

    if (next) {
      this.initGraph();
      const ctx = this.ensureContext();
      if (ctx && this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.2);
      }
    } else {
      const ctx = this.ctx;
      if (ctx && this.masterGain) {
        this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      }
    }

    this.notify();
    return this.isEnabled;
  }

  /**
   * Modulate wind filter based on inertial drag velocity
   * @param speed rad/sec or px/frame
   */
  public setOrbitSpeed(speed: number) {
    if (!this.isEnabled || !this.ctx || !this.windFilter || !this.windGain) return;
    const clampedSpeed = Math.min(1.0, Math.max(0, speed * 2.5));
    const now = this.ctx.currentTime;
    const targetFreq = 180 + clampedSpeed * 750;
    const targetGain = clampedSpeed * 0.12;

    this.windFilter.frequency.setTargetAtTime(targetFreq, now, 0.08);
    this.windGain.gain.setTargetAtTime(targetGain, now, 0.08);
  }

  /**
   * Crystalline Tibetan Bell / Astrolabe Arrival Chime
   * Triggered upon landing at an ancient excavation locus
   */
  public playArrivalChime() {
    if (!this.isEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const chimeOsc = ctx.createOscillator();
    const chimeOsc2 = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    // 528 Hz (Love / Solfeggio frequency) + 1056 Hz upper celestial harmonic
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(528, now);

    chimeOsc2.type = "sine";
    chimeOsc2.frequency.setValueAtTime(1056, now);

    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    chimeOsc.connect(chimeGain);
    chimeOsc2.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chimeOsc.start(now);
    chimeOsc2.start(now);
    chimeOsc.stop(now + 2.7);
    chimeOsc2.stop(now + 2.7);
  }
}

export const ambientAudio = new AmbientAudioEngine();
