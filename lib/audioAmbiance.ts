// Web Audio API procedural sound synthesizer for architectural ambiance

class AudioAmbianceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private waterGain: GainNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Create Wind / Air Resonator
    this.createWindGenerator();
    // Create Water Ripple Synthesizer
    this.createWaterGenerator();
  }

  private createWindGenerator() {
    if (!this.ctx || !this.masterGain) return;

    // Pink Noise for wind
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.02; // Keep soft
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter for soft wind movement
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 320;
    filter.Q.value = 3.0;

    // LFO for modulating filter frequency (breeze variation)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15; // slow breeze cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 180;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0.15;

    whiteNoise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();
  }

  private createWaterGenerator() {
    if (!this.ctx || !this.masterGain) return;

    this.waterGain = this.ctx.createGain();
    this.waterGain.gain.value = 0.05;

    // Filtered soft low hum for pool water resonance
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 55; // low architectural room/pool resonance

    const oscGain = this.ctx.createGain();
    oscGain.gain.value = 0.08;

    osc.connect(this.waterGain);
    this.waterGain.connect(this.masterGain);
    osc.start();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      this.isPlaying = false;
    } else {
      // Fade in
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 1.5);
      this.isPlaying = true;
    }

    return this.isPlaying;
  }

  public setRoomAcoustics(isInterior: boolean) {
    if (!this.ctx || !this.windGain || !this.waterGain) return;
    const now = this.ctx.currentTime;
    if (isInterior) {
      // Shorter reverb, lower wind, warmer room tone
      this.windGain.gain.exponentialRampToValueAtTime(0.04, now + 1.0);
      this.waterGain.gain.exponentialRampToValueAtTime(0.12, now + 1.0);
    } else {
      // Exterior: higher wind breeze
      this.windGain.gain.exponentialRampToValueAtTime(0.18, now + 1.0);
      this.waterGain.gain.exponentialRampToValueAtTime(0.05, now + 1.0);
    }
  }

  public getState(): boolean {
    return this.isPlaying;
  }
}

export const audioAmbiance = new AudioAmbianceEngine();
