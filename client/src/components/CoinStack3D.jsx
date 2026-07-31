import { useEffect, useRef } from "react";
import * as THREE from "three";

// Height of the coin stack scales with total spend, capped so it never
// overflows the card. Purely decorative — a tactile echo of the receipt
// theme ("your spend, stacked up").
export default function CoinStack3D({ totalSpend }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 220;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(3.2, 2.4, 4.2);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff4d6, 1.1);
    key.position.set(4, 6, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8ac6a0, 0.4);
    rim.position.set(-3, 2, -3);
    scene.add(rim);

    // Coin stack — count derived from total spend, clamped to a sane range
    const coinCount = Math.max(3, Math.min(14, Math.round(3 + totalSpend / 500)));
    const coinGeo = new THREE.CylinderGeometry(1, 1, 0.16, 40);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xc79a3d,
      metalness: 0.55,
      roughness: 0.35,
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x9c7a2e,
      metalness: 0.5,
      roughness: 0.4,
    });

    const group = new THREE.Group();
    for (let i = 0; i < coinCount; i++) {
      const coin = new THREE.Mesh(coinGeo, i % 3 === 0 ? edgeMat : coinMat);
      coin.position.y = i * 0.17;
      coin.rotation.y = Math.random() * 0.15;
      group.add(coin);
    }
    group.position.y = -(coinCount * 0.17) / 2 + 0.3;
    scene.add(group);

    // Subtle ground shadow disc
    const shadowGeo = new THREE.CircleGeometry(1.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x1c2521,
      transparent: true,
      opacity: 0.08,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -(coinCount * 0.17) / 2 + 0.14;
    scene.add(shadow);

    let frameId;
    function animate() {
      group.rotation.y += 0.006;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      coinGeo.dispose();
      coinMat.dispose();
      edgeMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [totalSpend]);

  return <div className="coin-stack-canvas" ref={containerRef} />;
}