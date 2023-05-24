import { useEffect, useState } from "react";

export default function useMarkerAr({ THREE, markers }) {
  const [THREEx, setTHREEx] = useState(null);
  const [markerRoots, setMarkerRoots] = useState(null);
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

    const markerRoots = markers.map((marker) => new THREE.Group());

    const arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: "/ar/camera/camera.dat",
      detectionMode: "mono",
    });
    const arToolkitSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
    });

    const arMarkerControls = markers.map((marker, index) => {
      return new THREEx.ArMarkerControls(arToolkitContext, markerRoots[index], {
        type: "pattern",
        patternUrl: `/ar/markers/${marker}.patt`,
      });
    });

    setMarkerRoots(markerRoots);
    setArToolkitContext(arToolkitContext);
    setArToolkitSource(arToolkitSource);
    setArMarkerControls(arMarkerControls);
  }, [THREEx]);

  return {
    markerRoots,
    arToolkitSource,
    arToolkitContext,
    arMarkerControls,
  };
}
