import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import gsap from 'gsap';

/*
  Un seul nuage de particules qui change de forme selon la section visible.
  Chaque forme est précalculée dans un attribut (pos0 à pos5) ; le vertex shader
  interpole entre deux formes voisines avec un léger décalage par particule,
  ce qui donne l'effet « explosion puis recomposition ».

  0 sphère (hero, contact)   1 vague (profil)     2 double hélice (méthode)
  3 anneau (projets)         4 treillis (compétences)   5 galaxie (parcours)
*/

const TAU = Math.PI * 2;

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rnd) {
  return Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(TAU * rnd());
}

function sphere(n, rnd) {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    let R = 1.55 * (1 + (rnd() - 0.5) * 0.03);
    if (rnd() < 0.12) R *= 0.3 + rnd() * 0.55;
    out[i * 3] = Math.cos(th) * r * R;
    out[i * 3 + 1] = y * R;
    out[i * 3 + 2] = Math.sin(th) * r * R;
  }
  return out;
}

function wave(n, rnd) {
  const out = new Float32Array(n * 3);
  const cols = Math.ceil(Math.sqrt((n * 9) / 5));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    out[i * 3] = (c / (cols - 1) - 0.5) * 9.6 + (rnd() - 0.5) * 0.02;
    out[i * 3 + 1] = 0;
    out[i * 3 + 2] = (r / (rows - 1) - 0.5) * 5.6 + (rnd() - 0.5) * 0.02;
  }
  return out;
}

function helix(n, rnd) {
  const out = new Float32Array(n * 3);
  const H = 4.8;
  for (let i = 0; i < n; i++) {
    let x;
    let y;
    let z;
    if (rnd() < 0.8) {
      const strand = i % 2;
      y = (rnd() - 0.5) * H;
      const a = y * 2.1 + strand * Math.PI;
      const r = 0.85 + (rnd() - 0.5) * 0.1;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
    } else {
      const k = Math.floor(rnd() * 24);
      y = (k / 23 - 0.5) * H;
      const a = y * 2.1;
      const s = rnd() * 2 - 1;
      x = Math.cos(a) * 0.85 * s;
      z = Math.sin(a) * 0.85 * s;
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function torus(n, rnd) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = rnd() * TAU;
    if (rnd() < 0.16) {
      const R = 3.05 + (rnd() - 0.5) * 0.06;
      out[i * 3] = Math.cos(u) * R;
      out[i * 3 + 1] = Math.sin(u) * R;
      out[i * 3 + 2] = (rnd() - 0.5) * 0.05;
    } else {
      const v = rnd() * TAU;
      const r = 0.3 * Math.sqrt(rnd());
      const R = 2.3;
      out[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
      out[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      out[i * 3 + 2] = r * Math.sin(v);
    }
  }
  return out;
}

function lattice(n, rnd) {
  const out = new Float32Array(n * 3);
  const half = 1.3;
  const div = 4;
  const at = (k) => -half + (k / div) * half * 2;
  for (let i = 0; i < n; i++) {
    const axis = Math.floor(rnd() * 3);
    const a = at(Math.floor(rnd() * (div + 1)));
    const b = at(Math.floor(rnd() * (div + 1)));
    const t = (rnd() - 0.5) * half * 2;
    const p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
    out[i * 3] = p[0];
    out[i * 3 + 1] = p[1];
    out[i * 3 + 2] = p[2];
  }
  return out;
}

function galaxy(n, rnd) {
  const out = new Float32Array(n * 3);
  const arms = 3;
  const Rmax = 3.4;
  for (let i = 0; i < n; i++) {
    const core = rnd() < 0.12;
    const r = core ? Math.pow(rnd(), 2) * 0.6 : Math.pow(rnd(), 1.5) * Rmax;
    const arm = i % arms;
    const angle = arm * (TAU / arms) + r * 1.35 + (rnd() - 0.5) * 0.45;
    const spread = 0.08 + r * 0.06;
    out[i * 3] = Math.cos(angle) * r + gaussian(rnd) * spread;
    out[i * 3 + 1] = gaussian(rnd) * 0.1 * (1.2 - r / Rmax);
    out[i * 3 + 2] = Math.sin(angle) * r + gaussian(rnd) * spread;
  }
  return out;
}

const GENERATORS = [sphere, wave, helix, torus, lattice, galaxy];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uShape;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uMouseForce;

  attribute vec3 pos0;
  attribute vec3 pos1;
  attribute vec3 pos2;
  attribute vec3 pos3;
  attribute vec3 pos4;
  attribute vec3 pos5;
  attribute float aRand;
  attribute float aAccent;
  attribute float aScale;

  varying float vAccent;
  varying float vDepth;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0., -s, c, 0., 0., 0., 1.); }

  vec3 shapePos(float i) {
    if (i < 0.5) return rotY(uTime * 0.12) * pos0;
    if (i < 1.5) {
      vec3 w = pos1;
      w.y += sin(w.x * 1.3 + uTime * 0.8) * 0.18 + cos(w.z * 1.7 + uTime * 0.6) * 0.14;
      w = rotX(-1.05) * w;
      w.y -= 0.35;
      return w;
    }
    if (i < 2.5) return rotZ(0.18) * rotY(uTime * 0.35) * pos2;
    if (i < 3.5) return rotX(0.42) * rotY(-0.3) * rotZ(uTime * 0.06) * pos3;
    if (i < 4.5) return rotX(0.55) * rotY(uTime * 0.1 + 0.6) * pos4;
    return rotX(1.12) * rotY(uTime * 0.05) * pos5;
  }

  void main() {
    float s = clamp(uShape, 0.0, 5.0);
    float base = floor(s);
    float f = s - base;
    float d = aRand * 0.35;
    float k = smoothstep(d, d + 0.65, f);
    vec3 p = mix(shapePos(base), shapePos(min(base + 1.0, 5.0)), k);

    // Éclatement au milieu de la transition.
    vec3 dir = normalize(vec3(sin(aRand * 43.1), cos(aRand * 91.7), sin(aRand * 17.3 + 1.0)) + 1e-4);
    p += dir * sin(k * 3.14159) * (0.5 + aRand * 0.9);

    // Dérive lente.
    p += 0.02 * vec3(sin(uTime * 0.7 + aRand * 40.0), cos(uTime * 0.6 + aRand * 30.0), sin(uTime * 0.5 + aRand * 20.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Répulsion autour du pointeur, calculée à l'écran.
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 delta = (ndc - uMouse) * vec2(uAspect, 1.0);
    float infl = smoothstep(0.32, 0.0, length(delta)) * uMouseForce;
    mv.xy += normalize(delta + 1e-5) * infl * 0.32;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio / -mv.z;
    vAccent = aAccent;
    vDepth = smoothstep(4.2, 9.0, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uAlpha;

  varying float vAccent;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.6);
    vec3 col = mix(uColor, uAccent, vAccent);
    gl_FragColor = vec4(col, a * uAlpha * mix(1.0, 0.3, vDepth));
  }
`;

function hexToVec3(hex, target) {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  target.set(((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255);
}

export class ParticleEngine {
  constructor(canvas, { count, reduced }) {
    this.canvas = canvas;
    this.reduced = reduced;
    this.dirty = true;
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0, force: 0, target: 0 };

    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, 1, 0.1, 60);
    this.camera.position.set(0, 0, 6.5);

    const rnd = mulberry32(20260928);
    const geometry = new BufferGeometry();
    GENERATORS.forEach((gen, i) => geometry.setAttribute(`pos${i}`, new BufferAttribute(gen(count, rnd), 3)));
    geometry.setAttribute('position', geometry.getAttribute('pos0'));
    const aRand = new Float32Array(count);
    const aAccent = new Float32Array(count);
    const aScale = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      aRand[i] = rnd();
      aAccent[i] = rnd() < 0.09 ? 1 : 0;
      aScale[i] = 0.55 + Math.pow(rnd(), 3) * 1.4;
    }
    geometry.setAttribute('aRand', new BufferAttribute(aRand, 1));
    geometry.setAttribute('aAccent', new BufferAttribute(aAccent, 1));
    geometry.setAttribute('aScale', new BufferAttribute(aScale, 1));
    this.geometry = geometry;

    this.uniforms = {
      uTime: { value: 0 },
      uShape: { value: 0 },
      uSize: { value: 17 },
      uPixelRatio: { value: this.renderer.getPixelRatio() },
      uMouse: { value: new Vector2(0, 0) },
      uAspect: { value: 1 },
      uMouseForce: { value: 0 },
      uColor: { value: new Vector3(0.76, 0.8, 0.9) },
      uAccent: { value: new Vector3(0.36, 0.47, 1) },
      uAlpha: { value: 1 },
    };

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    this.group = new Group();
    this.points = new Points(geometry, this.material);
    this.points.frustumCulled = false;
    this.group.add(this.points);
    this.scene.add(this.group);

    this.tick = this.tick.bind(this);
    this.resize();
  }

  start() {
    gsap.ticker.add(this.tick);
  }

  pointer(clientX, clientY) {
    if (this.reduced) return;
    this.mouse.tx = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.ty = -((clientY / window.innerHeight) * 2 - 1);
    this.mouse.target = 1;
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.mouse.target = 0;
    }, 1200);
  }

  setTheme({ base, accent, dark }) {
    if (base) hexToVec3(base, this.uniforms.uColor.value);
    if (accent) hexToVec3(accent, this.uniforms.uAccent.value);
    this.material.blending = dark ? AdditiveBlending : NormalBlending;
    this.material.needsUpdate = true;
    this.lightBoost = dark ? 1 : 1.25;
    this.applySize();
    this.dirty = true;
  }

  setScene(cfg, immediate = false) {
    const k = immediate || this.reduced ? 0 : 1;
    const opts = { overwrite: true, onUpdate: () => (this.dirty = true) };
    gsap.to(this.uniforms.uShape, { value: cfg.shape, duration: 2.4 * k, ease: 'power2.inOut', ...opts });
    gsap.to(this.group.position, { x: cfg.x, y: cfg.y, duration: 2.2 * k, ease: 'power3.inOut', ...opts });
    gsap.to(this.group.scale, { x: cfg.scale, y: cfg.scale, z: cfg.scale, duration: 2.2 * k, ease: 'power3.inOut', ...opts });
    gsap.to(this.uniforms.uAlpha, { value: cfg.alpha, duration: 1.6 * k, ease: 'power2.inOut', ...opts });
    this.dirty = true;
  }

  applySize() {
    // La caméra recule sur écran portrait : on compense la taille des points.
    this.uniforms.uSize.value = 17 * (this.camera.position.z / 6.5) * (this.lightBoost || 1);
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.position.z = aspect < 1 ? 9.5 : 6.5;
    this.camera.updateProjectionMatrix();
    this.uniforms.uAspect.value = aspect;
    this.uniforms.uPixelRatio.value = this.renderer.getPixelRatio();
    this.applySize();
    this.dirty = true;
  }

  tick(_time, deltaMs) {
    if (this.reduced) {
      if (!this.dirty) return;
      this.dirty = false;
      this.renderer.render(this.scene, this.camera);
      return;
    }
    const dt = Math.min(deltaMs, 50) / 1000;
    const m = this.mouse;
    this.uniforms.uTime.value += dt;
    m.x += (m.tx - m.x) * 0.08;
    m.y += (m.ty - m.y) * 0.08;
    m.force += (m.target - m.force) * 0.05;
    this.uniforms.uMouse.value.set(m.x, m.y);
    this.uniforms.uMouseForce.value = m.force;
    this.points.rotation.y += (m.x * 0.16 - this.points.rotation.y) * 0.04;
    this.points.rotation.x += (-m.y * 0.1 - this.points.rotation.x) * 0.04;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    gsap.ticker.remove(this.tick);
    clearTimeout(this.idleTimer);
    gsap.killTweensOf([this.uniforms.uShape, this.uniforms.uAlpha, this.group.position, this.group.scale]);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
