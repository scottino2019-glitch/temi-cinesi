// Synthesized paper rustle using Web Audio API (no external audio files required)
let audioCtx: AudioContext | null = null;

export function playPageFlipSound(volume: number = 0.3) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const duration = 0.18;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate textured pink-filtered noise resembling paper friction
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      const pink = b0 + b1 + b2 + white * 0.5362;
      
      // Envelope: quick attack, smooth decay
      const progress = i / bufferSize;
      const env = Math.sin(progress * Math.PI) * Math.exp(-progress * 3.5);
      data[i] = pink * env * volume * 0.25;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    // Filter to paper swish frequencies
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

    source.connect(filter);
    filter.connect(audioCtx.destination);

    source.start();
  } catch {
    // Graceful fallback if audio context is not allowed before user gesture
  }
}
