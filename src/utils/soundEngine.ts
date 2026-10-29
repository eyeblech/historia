import type { EraId } from '../data/historyData';

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.ensureContext();
      this.startAmbientDrone();
      this.playChime(528, 0.12);
    } else {
      this.stopAmbientDrone();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private startAmbientDrone() {
    if (!this.ctx || this.droneOsc1) return;
    const now = this.ctx.currentTime;

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, now);

    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(65.41, now); // C2 deep space drone

    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(98.0, now); // G2 fifth harmonic

    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.045, now + 1.5);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private stopAmbientDrone() {
    if (!this.ctx || !this.droneGain) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      setTimeout(() => {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
      }, 450);
    } catch {
      // ignore
    }
  }

  public setEraHarmonic(era: EraId) {
    if (this.isMuted || !this.ctx || !this.droneOsc1 || !this.droneOsc2) return;
    const now = this.ctx.currentTime;
    const map: Record<EraId, [number, number]> = {
      primordial: [55.0, 82.41],   // A1 + E2 Cosmic Void
      ancient: [65.41, 98.0],      // C2 + G2 Sacred Bronze
      classical: [73.42, 110.0],   // D2 + A2 Lyre Harmonic
      renaissance: [82.41, 123.47],// E2 + B2 Renaissance Polyphony
      revolutions: [87.31, 130.81],// F2 + C3 Industrial Drive
      modern: [98.0, 146.83],      // G2 + D3 Quantum Horizon
    };
    const [f1, f2] = map[era] || [65.41, 98.0];
    this.droneOsc1.frequency.exponentialRampToValueAtTime(f1, now + 1.2);
    this.droneOsc2.frequency.exponentialRampToValueAtTime(f2, now + 1.2);
  }

  public playNodeSelect(impactScore: number = 95) {
    if (this.isMuted) return;
    this.ensureContext();
    const baseFreq = 320 + (impactScore - 85) * 18;
    this.playChime(baseFreq, 0.11);
    setTimeout(() => this.playChime(baseFreq * 1.498, 0.08), 90);
  }

  public playHoverTick() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playChime(880, 0.02, 0.06);
  }

  private playChime(freq: number, volume: number = 0.08, duration: number = 0.7) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }
}

export const soundEngine = new CosmicAudioEngine();
