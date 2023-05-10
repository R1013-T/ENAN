import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

import useMarkerAr from "@/hooks/ar/useMarkerAr";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import UnderButton from "@/components/dashboard/underButton/UnderButton";

const Scan = () => {
  const router = useRouter();
  const { id } = router.query;

  const markers = ["lock", "dent"];
  const [foundMarker, setFoundMarker] = useState("");

  const {
    markerRoots,
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  }: any = useMarkerAr({
    THREE,
    markers,
  });

  useEffect(() => {
    if (
      markerRoots &&
      arToolkitSource &&
      arToolkitContext &&
      arMarkerControls
    ) {
      arSetUp();
    }
  }, [markerRoots, arToolkitSource, arToolkitContext, arMarkerControls]);

  const arSetUp = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    const camera = new THREE.PerspectiveCamera();
    const scene = new THREE.Scene();

    const lostDelay = 700;
    let timer: ReturnType<typeof setTimeout>;

    arMarkerControls[0].addEventListener("markerFound", () => {
      setFoundMarker(markers[0]);

      clearTimeout(timer);
      timer = setTimeout(
        () => arMarkerControls[0].dispatchEvent({ type: "markerLost" }),
        lostDelay
      );
    });
    arMarkerControls[0].addEventListener("markerLost", () => {
      setFoundMarker("lost");
    });

    arMarkerControls[1].addEventListener("markerFound", () => {
      setFoundMarker(markers[1]);

      clearTimeout(timer);
      timer = setTimeout(
        () => arMarkerControls[1].dispatchEvent({ type: "markerLost" }),
        lostDelay
      );
    });
    arMarkerControls[1].addEventListener("markerLost", () => {
      setFoundMarker("lost");
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
    arToolkitSource.init(() => {
      wrapper.appendChild(arToolkitSource.domElement);
      setTimeout(handleResize, 600);
    });

    for (let i = 0; i < markers.length; i++) {
      scene.add(markerRoots[i]);

      const lockLoader = new GLTFLoader();
      const lockUrl = `/ar/models/${markers[i]}/scene.gltf`;

      lockLoader.load(lockUrl, (gltf) => {
        const model = gltf.scene;

        switch (markers[i]) {
          case "lock":
            model.scale.set(10, 10, 10);
            model.position.set(0.5, 0, 1.3);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;
          case "dent":
            model.scale.set(2, 2, 2);
            model.position.set(0, 0, 0);
            model.rotation.set(0, 0, 0);
            break;

          default:
            break;
        }

        markerRoots[i].add(model);
      });
    }

    renderer.setAnimationLoop((delta) => {
      if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
      }

      renderer.render(scene, camera);
    });

    function handleResize() {
      if (arToolkitSource.ready) {
        arToolkitSource.onResize();
        arToolkitSource.copySizeTo(renderer.domElement);
      }

      renderer.setPixelRatio(window.devicePixelRatio);
    }
  };

  useEffect(() => {
    switch (foundMarker) {
      case "lost":
        console.log(`lost`);
        break;
      case "":
        break;
      default:
        console.log(`${foundMarker} found`);
        break;
    }
  }, [foundMarker]);

  const handleDashboard = () => {
    router.reload();
  };

  const startScan = () => {
    document.location.reload();
  };

  return (
    <Layout headerType="sub" title="スキャン - 名探偵エナン">
      <Script src="https://unpkg.com/three@0.127.0/build/three.min.js" />
      <main className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
        <div
          id="wrapper"
          className="wrapper w-full h-full relative overflow-hidden"
        >
          <canvas id="canvas"></canvas>
        </div>
        <button
          className="fixed left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          onClick={startScan}
        >
          Scan Start
        </button>
        <button
          className="fixed bottom-10 left-10 z-30"
          onClick={handleDashboard}
        >
          refresh
        </button>
        <Link
          className="fixed bottom-10 right-10 z-30"
          href={{ pathname: "/dashboard", query: { id: id } }}
        >
          dashboard
        </Link>
      </main>
      <UnderButton />
    </Layout>
  );
};

export default Scan;
