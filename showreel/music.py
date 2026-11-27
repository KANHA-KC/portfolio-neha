"""Original soundtrack for the showreel: 120 BPM warm house, Am7–Fmaj7–Cmaj7/G–G6, 70 s.
Every section boundary sits on a 4-bar line so the edit can cut on the downbeats:
  0–8 intro (pad, arp, riser) · 8 drop · 24 lead enters · 40–44 breakdown · 44 full drop · 64 final hit + tail.
Writes music.wav (44.1 kHz stereo)."""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
DUR = 70.0
N = int(DUR * SR)
rng = np.random.default_rng(7)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
def t_(n): return np.arange(n) / SR
def lp(x, fc, order=2): return sosfilt(butter(order, fc, "low", fs=SR, output="sos"), x)
def hp(x, fc, order=2): return sosfilt(butter(order, fc, "high", fs=SR, output="sos"), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)

def adsr(n, a=0.005, d=0.1, s=0.7, r=0.1):
    e = np.full(n, s, dtype=float)
    na, nd, nr = int(a * SR), int(d * SR), int(r * SR)
    na = min(na, n); e[:na] = np.linspace(0, 1, na, endpoint=False)
    nd = min(nd, n - na); e[na:na + nd] = np.linspace(1, s, nd, endpoint=False)
    if nr and n > nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e

def add(buf, x, start_s, pan=0.0):
    i = int(start_s * SR)
    if i >= N: return
    x = x[: N - i]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[0, i:i + len(x)] += x * l * 1.414
    buf[1, i:i + len(x)] += x * r * 1.414

def saw(f, n, phase=0.0):
    t = t_(n); return 2 * ((f * t + phase) % 1.0) - 1

# ---------- harmony ----------
CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 60, 64], [55, 59, 62, 64]]  # Am7 Fmaj7 Cmaj7/G G6
ROOTS = [45, 41, 48, 43]
def chord(bar): return CHORDS[bar % 4]
NBARS = int(DUR / BAR) + 1

# ---------- instruments ----------
def kick():
    n = int(0.45 * SR); t = t_(n)
    f = 46 + 110 * np.exp(-t / 0.035)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.28)
    click = hp(rng.standard_normal(n), 2500) * np.exp(-t / 0.004) * 0.25
    return np.tanh(1.6 * (body + click)) * 0.62

def clap():
    n = int(0.4 * SR); t = t_(n); x = rng.standard_normal(n)
    env = np.zeros(n)
    for k, o in enumerate([0, 0.011, 0.022]):
        i = int(o * SR); env[i:] += np.exp(-(t[: n - i]) / 0.008) * (0.8 if k < 2 else 1)
    env += np.exp(-np.maximum(t - 0.022, 0) / 0.12) * (t > 0.022) * 0.5
    return bp(x, 900, 3200) * env * 0.55

def hat(open_=False):
    n = int((0.25 if open_ else 0.06) * SR); t = t_(n)
    x = hp(rng.standard_normal(n), 7500, 4)
    return x * np.exp(-t / (0.09 if open_ else 0.018)) * (0.22 if open_ else 0.18)

def shaker():
    n = int(0.08 * SR); t = t_(n)
    x = bp(rng.standard_normal(n), 5000, 11000)
    return x * np.sin(np.pi * np.minimum(t / 0.06, 1)) ** 2 * 0.07

def pad_note(m, n, bright=1.0):
    out = np.zeros(n)
    for d in np.linspace(-0.11, 0.11, 7):
        out += saw(hz(m) * 2 ** (d / 12), n, rng.random())
    out /= 7
    out = lp(out, 900 + 2200 * bright, 2)
    return out * adsr(n, a=0.35, d=0.4, s=0.85, r=0.6)

def epiano(m, n, vel=1.0):  # FM electric piano / bell
    t = t_(n); f = hz(m)
    idx = 2.2 * np.exp(-t / 0.25) * vel
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    x += 0.25 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / 0.15)
    return x * adsr(n, a=0.003, d=0.3, s=0.35, r=0.12) * vel

def lead(m, n):
    t = t_(n); f = hz(m)
    vib = 1 + 0.004 * np.sin(2 * np.pi * 5.2 * t) * np.minimum(t / 0.3, 1)
    ph = np.cumsum(f * vib) / SR
    x = 0.6 * (2 * (ph % 1) - 1) + 0.4 * np.sign(np.sin(2 * np.pi * ph))
    # brightness envelope: blend a filtered copy with a darker one
    bright, dark = lp(x, 3800), lp(x, 900)
    e = np.exp(-t / 0.18)
    return (bright * e + dark * (1 - e)) * adsr(n, a=0.01, d=0.2, s=0.6, r=0.08) * 0.5

def bass(m, n):
    t = t_(n); f = hz(m)
    x = np.sin(2 * np.pi * f * t) + 0.35 * lp(saw(f, n), 420)
    return np.tanh(1.4 * x) * adsr(n, a=0.004, d=0.12, s=0.75, r=0.05) * 0.55

def riser(dur):
    n = int(dur * SR); t = t_(n); p = t / dur
    noise = rng.standard_normal(n)
    # sweep a band-pass upward by processing in short blocks
    out = np.zeros(n); blk = 2048
    for i in range(0, n, blk):
        c = 400 * (14000 / 400) ** (i / n)
        out[i:i + blk] = bp(noise[i:i + blk + 0], c * 0.7, min(c * 1.4, SR / 2 - 100))
    tone = np.sin(2 * np.pi * np.cumsum(110 * 2 ** (3 * p)) / SR) * 0.25
    return (out * 0.5 + tone) * p ** 2.2 * 0.6

def impact():
    n = int(3.5 * SR); t = t_(n)
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / 0.08)) / SR) * np.exp(-t / 0.9)
    crash = hp(rng.standard_normal(n), 3000) * np.exp(-t / 0.7) * 0.25
    return np.tanh(1.3 * boom) * 0.9 + crash

def reverse_cymbal(dur):
    n = int(dur * SR); t = t_(n)
    x = hp(rng.standard_normal(n), 4000) * np.exp(-(dur - t) / (dur / 3))
    return x * 0.18

# ---------- arrangement ----------
dry = np.zeros((2, N)); verb_send = np.zeros((2, N)); pad_bus = np.zeros((2, N)); bass_bus = np.zeros((2, N))
K, C, HC, HO, SH = kick(), clap(), hat(), hat(True), shaker()

def section(b):
    s = b * BAR
    if s < 8: return "intro"
    if s < 24: return "A"
    if s < 40: return "B"
    if s < 44: return "break"
    if s < 64: return "drop"
    return "outro"

kick_times = []
for b in range(NBARS):
    s0 = b * BAR; sec = section(b)
    if s0 >= DUR: break
    ch = chord(b)
    # pad: whole bar chord, opens up through the intro
    if sec != "outro" or s0 == 64:
        hold = BAR * (3 if s0 == 64 else 1) + 0.6
        bright = {"intro": 0.15 + 0.2 * b, "break": 0.35}.get(sec, 0.9)
        for j, m in enumerate(ch):
            x = pad_note(m, int(hold * SR), bright) * (0.3 if sec != "break" else 0.36)
            add(pad_bus, x, s0, pan=(-0.5 + j / 3) * 0.8)
            add(verb_send, x * 0.5, s0)
    # arp: 8ths over chord tones an octave up (16ths in the drops)
    if s0 >= 2 and s0 < 66:
        step = BEAT / (4 if sec in ("drop",) else 2)
        pat = [0, 1, 2, 3, 2, 1, 3, 2]
        steps = int(BAR / step)
        for k in range(steps):
            m = ch[pat[k % 8]] + 12
            vel = 0.55 + 0.45 * (k % 2 == 0)
            if sec == "intro": vel *= 0.35 + 0.15 * b
            x = epiano(m, int(0.45 * SR), vel) * 0.16
            add(dry, x, s0 + k * step, pan=0.35 * np.sin(k * 1.3))
            add(verb_send, x * 0.6, s0 + k * step)
    # drums
    if sec in ("A", "B", "drop"):
        for q in range(4):
            add(dry, K, s0 + q * BEAT); kick_times.append(s0 + q * BEAT)
            add(dry, HC * (1.0 if sec != "A" else 0.8), s0 + q * BEAT + BEAT / 2, pan=0.25)
            if sec != "A": add(dry, HO * 0.6, s0 + q * BEAT + BEAT / 2, pan=-0.2)
        for q in (1, 3):
            add(dry, C, s0 + q * BEAT); add(verb_send, C * 0.5, s0 + q * BEAT)
        if sec in ("B", "drop"):
            for k in range(16): add(dry, SH * (1.2 if k % 4 == 2 else 0.7), s0 + k * BEAT / 4, pan=-0.45)
    # bass: off-beat house pattern + root on 1
    if sec in ("A", "B", "drop"):
        r = ROOTS[b % 4]
        for k, (o, ln) in enumerate([(0, 0.2), (0.75, 0.2), (1.5, 0.2), (1.75, 0.2)]):
            add(bass_bus, bass(r + (12 if k == 3 else 0), int(ln * SR)), s0 + o)
    if sec == "break":
        r = ROOTS[b % 4]
        add(bass_bus, bass(r, int(BAR * SR)) * 0.6, s0)

# lead melody (4-bar phrase on the 8th grid) from 24 s, and over the breakdown/drop
MEL = [(0, 76, 3), (3, 74, 1), (4, 72, 2), (6, 69, 2), (8, 72, 3), (11, 74, 1), (12, 76, 2), (14, 79, 2),
       (16, 76, 3), (19, 74, 1), (20, 72, 2), (22, 71, 2), (24, 74, 4), (28, 72, 2), (30, 71, 2)]
for start in (24, 32, 40, 44, 52):
    gain = 0.75 if start == 40 else 1.0
    phrase = MEL if start != 40 else MEL[:8]
    for st, m, ln in phrase:
        x = lead(m, int(ln * BEAT / 2 * SR * 0.95)) * 0.26 * gain
        if start == 40: x = lp(x, 1400)
        add(dry, x, start + st * BEAT / 2, pan=0.1)
        add(verb_send, x * 0.7, start + st * BEAT / 2)
# answer phrase an octave up on the last drop
for st, m, ln in MEL:
    if 56 + st * BEAT / 2 >= 64: break
    x = lead(m + 12, int(ln * BEAT / 2 * SR * 0.9)) * 0.09
    add(dry, x, 56 + st * BEAT / 2, pan=-0.3); add(verb_send, x, 56 + st * BEAT / 2)

# snare roll into the second drop
for k in range(16):
    tt = 42 + k * BEAT / 4
    add(dry, C * (0.15 + 0.6 * k / 15), tt, pan=0.0)
# transitions
add(dry, riser(4.0), 4.0); add(dry, reverse_cymbal(2.0), 6.0)
add(dry, riser(4.0), 40.0); add(dry, reverse_cymbal(2.0), 42.0)
add(dry, reverse_cymbal(2.0), 22.0)
add(dry, reverse_cymbal(2.0), 62.0)
for tt, g in ((0.0, 0.5), (8.0, 1.0), (24.0, 0.6), (44.0, 1.0), (64.0, 1.1)):
    x = impact() * g; add(dry, x * 0.7, tt); add(verb_send, x * 0.35, tt)

# sidechain pump on pad + bass from every kick
env = np.ones(N); t = t_(N)
for kt in kick_times:
    i = int(kt * SR); n = min(int(0.4 * SR), N - i)
    env[i:i + n] = np.minimum(env[i:i + n], 1 - 0.65 * np.exp(-t[:n] / 0.11))
pad_bus *= env; bass_bus *= (0.35 + 0.65 * env)

# reverb: stereo exponentially decaying noise IR (2.4 s)
nir = int(2.4 * SR); tir = t_(nir)
ir = np.stack([lp(rng.standard_normal(nir), 6000) * np.exp(-tir / 0.55) for _ in range(2)])
ir[:, : int(0.012 * SR)] = 0
ir /= np.sqrt((ir ** 2).sum(axis=1, keepdims=True))  # unit-energy IR
wet = np.stack([fftconvolve(hp(verb_send[c], 250), ir[c])[:N] for c in range(2)]) * 0.9

mix = dry + pad_bus + bass_bus + wet
for nm, b in (('dry', dry), ('pad', pad_bus), ('bass', bass_bus), ('wet', wet)): print(nm, round(float(np.sqrt((b ** 2).mean())), 4))
# master: gentle glue, soft clip, fades
mix = np.tanh(mix * 1.15) / np.tanh(1.15)
fade_in = np.minimum(t / 0.05, 1); fade_out = np.clip((DUR - t) / 3.0, 0, 1) ** 1.5
mix *= fade_in * fade_out
mix /= np.max(np.abs(mix)) / 0.89

import wave
pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
with wave.open("music.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print("music.wav", DUR, "s")
