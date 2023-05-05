import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

import useMarkerAr from "../../utils/ar/useMarkerAr";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Home() {
  const [cubeMarkerState, setCubeMarkerState] = useState(false);
  const [sphereMarkerState, setSphereMarkerState] = useState(false);

  const {
    markerRootCube,
    markerRootSphere,
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  }: any = useMarkerAr({
    THREE,
  });

  useEffect(() => {
    if (
      markerRootCube &&
      markerRootSphere &&
      arToolkitSource &&
      arToolkitContext &&
      arMarkerControls
    ) {
      arSetUp();
    }
  }, [
    markerRootCube,
    markerRootSphere,
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  ]);

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
      setCubeMarkerState(true);

      clearTimeout(timer);
      timer = setTimeout(
        () => arMarkerControls[0].dispatchEvent({ type: "markerLost" }),
        lostDelay
      );
    });
    arMarkerControls[0].addEventListener("markerLost", () => {
      setCubeMarkerState(false);
    });

    arMarkerControls[1].addEventListener("markerFound", () => {
      setSphereMarkerState(true);

      clearTimeout(timer);
      timer = setTimeout(
        () => arMarkerControls[1].dispatchEvent({ type: "markerLost" }),
        lostDelay
      );
    });
    arMarkerControls[1].addEventListener("markerLost", () => {
      setSphereMarkerState(false);
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
      setTimeout(handleResize, 400);
    });

    scene.add(markerRootCube);
    scene.add(markerRootSphere);

    const lockLoader = new GLTFLoader();
    const lockUrl = "/ar/models/lock/scene.gltf";

    lockLoader.load(lockUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(10, 10, 10);
      model.position.set(0.5, 0, 1.3);
      model.rotation.set(-Math.PI / 2, 0, 0);
      markerRootCube.add(model);
    });

    const dentLoader = new GLTFLoader();
    const dentUrl = "/ar/models/dent/scene.gltf";

    dentLoader.load(dentUrl, (gltf) => {
      const model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.set(0, 0, 0);
      model.rotation.set(0, 0, 0);
      markerRootSphere.add(model);
    });

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
    if (cubeMarkerState) {
      console.log("cube found");
    } else {
      console.log("cube lost");
    }
  }, [cubeMarkerState]);

  useEffect(() => {
    if (sphereMarkerState) {
      console.log("sphere found");
    } else {
      console.log("sphere lost");
    }
  }, [sphereMarkerState]);

  return (
    <>
      <Head>
        <title>AR.js THREE.js NEXT.js TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://unpkg.com/three@0.127.0/build/three.min.js" />
      <main className="w-screen h-screen overflow-hidden">
        <div id="wrapper" className="wrapper w-full h-full relative overflow-hidden">
          <canvas id="canvas"></canvas>
        </div>
      </main>
    </>
  );
}
