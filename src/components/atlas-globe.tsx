"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return pts;
}

export function AtlasGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = seeded(42);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.6;

    const globe = new THREE.Group();
    globe.rotation.x = 0.35;
    scene.add(globe);

    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0d0e0b }),
    );
    globe.add(occluder);

    const dotPositions = fibonacciSphere(2600, 1);
    const dotGeo = new THREE.BufferGeometry().setFromPoints(dotPositions);
    const dotMat = new THREE.PointsMaterial({ color: 0xd9c9a8, size: 0.012, transparent: true, opacity: 0.75 });
    globe.add(new THREE.Points(dotGeo, dotMat));

    const nodes = Array.from({ length: 28 }, () => dotPositions[Math.floor(rand() * dotPositions.length)].clone());
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes.map((n) => n.clone().multiplyScalar(1.01)));
    const nodeMat = new THREE.PointsMaterial({ color: 0x9fd38a, size: 0.045, transparent: true, opacity: 1 });
    globe.add(new THREE.Points(nodeGeo, nodeMat));

    const ringGeo = new THREE.RingGeometry(1.32, 1.326, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd9c9a8, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    const ARC_SEGMENTS = 64;
    const arcs = Array.from({ length: 16 }, (_, i) => {
      const a = nodes[i % nodes.length];
      const b = nodes[(i * 7 + 5) % nodes.length];
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const lift = 1 + a.distanceTo(b) * 0.45;
      mid.normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(ARC_SEGMENTS));
      const mat = new THREE.LineBasicMaterial({ color: 0x9fd38a, transparent: true, opacity: 0.7 });
      const line = new THREE.Line(geo, mat);
      globe.add(line);
      return { geo, mat, offset: rand() * 3, speed: 0.35 + rand() * 0.35 };
    });

    const target = { x: 0, y: 0 };
    function onPointer(e: PointerEvent) {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    }
    window.addEventListener("pointermove", onPointer, { passive: true });

    function resize() {
      const { clientWidth: w, clientHeight: h } = container!;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const clock = new THREE.Clock();
    let raf = 0;
    let spin = 0;

    function tick() {
      const t = clock.getElapsedTime();
      if (!reduce) spin += 0.0018;
      globe.rotation.y = spin + target.x;
      globe.rotation.x += (0.35 + target.y - globe.rotation.x) * 0.05;
      ring.rotation.z = t * 0.05;

      arcs.forEach((arc) => {
        const cycle = ((t * arc.speed + arc.offset) % 2) / 2;
        const head = Math.min(1, cycle * 2);
        const tail = Math.max(0, cycle * 2 - 1);
        const start = Math.floor(tail * ARC_SEGMENTS);
        const end = Math.floor(head * ARC_SEGMENTS);
        arc.geo.setDrawRange(start, Math.max(0, end - start + 1));
      });

      nodeMat.size = 0.04 + Math.sin(t * 2) * 0.008;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      arcs.forEach((a) => {
        a.geo.dispose();
        a.mat.dispose();
      });
      dotGeo.dispose();
      dotMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      occluder.geometry.dispose();
      (occluder.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
