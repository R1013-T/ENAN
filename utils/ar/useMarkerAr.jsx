import { useEffect, useState } from "react";

export default function useMarkerAr({ THREE }) {
  const [THREEx, setTHREEx] = useState(null);
  const [markerRootCube, setMarkerRootCube] = useState(null);
  const [markerRootSphere, setMarkerRootSphere] = useState(null);
  const [arToolkitSource, setArToolkitSource] = useState(null);
  const [arToolkitContext, setArToolkitContext] = useState(null);
  const [arMarkerControls, setArMarkerControls] = useState(null);

  useEffect(() => {
    if (process.browser) {
      if (window.THREE) {
        window.THREE = THREE;
      }

      if (!window.THREEx) {
        const script = document.createElement("script");

        script.onload = () => {
          setTHREEx(window.THREEx);
          document.body.removeChild(script);
        };
        script.src =
          "https://raw.githack.com/AR-js-org/AR.js/3.3.2/three.js/build/ar.js";
        document.body.appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    if (!THREEx) {
      return;
    }

    const markerRootCube = new THREE.Group();
    const markerRootSphere = new THREE.Group();
    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "/ar/camera/camera.dat",
      detectionMode: "mono",
    });
    const arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
    });
    const arMarkerControls = [
      new THREEx.ArMarkerControls(arToolkitContext, markerRootCube, {
        type: "pattern",
        patternUrl: "/ar/markers/cube.patt",
      }),
      new THREEx.ArMarkerControls(arToolkitContext, markerRootSphere, {
        type: "pattern",
        patternUrl: "/ar/markers/sphere.patt",
      }),
    ];

    setMarkerRootCube(markerRootCube);
    setMarkerRootSphere(markerRootSphere);
    setArToolkitContext(arToolkitContext);
    setArToolkitSource(arToolkitSource);
    setArMarkerControls(arMarkerControls);
  }, [THREEx]);

  return {
    markerRootCube,
    markerRootSphere,
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  };
}
