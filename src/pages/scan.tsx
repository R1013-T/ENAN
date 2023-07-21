import Script from "next/script";
import { useEffect, useState } from "react";
import useMarkerAr from "@/hooks/ar/useMarkerAr";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Layout } from "@/components/Layout";
import GetButton from "@/components/scan/GetButton";
import CopyrightText from "@/components/scan/CopyrightText";
import { useSounds } from "@/hooks/useSounds";

const Scan = () => {
  const { scanning, clue_detail } = useSounds();

  const markers = [
    "lock",
    "dent",
    "chair",
    "controller",
    "earrings",
    "knife",
    "water",
    "document",
  ];
  const [foundMarker, setFoundMarker] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [isStart, setIsStart] = useState(false);

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

    for (let i = 0; i < markers.length; i++) {
      arMarkerControls[i].addEventListener("markerFound", () => {
        setFoundMarker(markers[i]);

        clearTimeout(timer);
        timer = setTimeout(
          () => arMarkerControls[i].dispatchEvent({ type: "markerLost" }),
          lostDelay
        );
      });
      arMarkerControls[i].addEventListener("markerLost", () => {
        setFoundMarker("lost");
      });
    }

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

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

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
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            model.rotation.set(0, 0, 0);
            break;

          case "chair":
            model.scale.set(3, 3, 3);
            model.position.set(0, 0, 0);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;

          case "controller":
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;

          case "earrings":
            model.scale.set(0.05, 0.05, 0.05);
            model.position.set(0, 0, 0);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;

          case "knife":
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;

          case "water":
            model.scale.set(30, 30, 30);
            model.position.set(0, 0, 0);
            model.rotation.set(-Math.PI / 2, 0, 0);
            break;

          case "document":
            model.scale.set(30, 30, 30);
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
        setIsFound(false);
        break;
      case "":
        break;
      default:
        scanning();
        setIsFound(true);
        break;
    }
  }, [foundMarker]);

  return (
    <Layout headerType="sub" title="AR">
      {!isStart && (
        <div
          className="fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-bg-black/80 backdrop-blur"
          onClick={() => {
            setIsStart(true);
            scanning();
          }}
        >
          <div className="rounded border border-theme-black/60 bg-bg-black/80 p-7">
            <p className="text-center text-base">タップして スキャンスタート</p>
          </div>
        </div>
      )}
      <Script src="https://unpkg.com/three@0.127.0/build/three.min.js" />
      <main className="fixed left-0 top-0 h-screen w-screen overflow-hidden">
        <div
          id="wrapper"
          className="wrapper relative h-full w-full overflow-hidden"
        >
          <canvas id="canvas"></canvas>
        </div>
        <div
          className={`fixed bottom-28 left-5 right-5 z-40 transition ${
            isFound ? "opacity-100" : "opacity-0"
          }`}
        >
          <GetButton currentModel={foundMarker} />
          <CopyrightText currentModel={foundMarker} />
        </div>
      </main>
    </Layout>
  );
};

export default Scan;
