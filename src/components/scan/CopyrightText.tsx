import React from "react";

type ModelKeys =
  | "lock"
  | "dent"
  | "chair"
  | "controller"
  | "earrings"
  | "knife"
  | "water";

type Props = {
  currentModel: string;
};

const COPYRIGHT_TEXTS: Record<ModelKeys, string> = {
  lock: "Door_Lock (https://skfb.ly/oESAG) by David Wigforss is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).",
  dent: "Concave_knife_color (https://sketchfab.com/3d-models/concave-knife-color-0c3b3a9a2a8a4747aacdf73be7da7906) by vo_w_ac (https://sketchfab.com/vo_w_ac) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
  chair:
    "Vitra Eames Plastic Chair (https://sketchfab.com/3d-models/vitra-eames-plastic-chair-0a45955e2328459d95f403cb00c08b3a) by furnny (https://sketchfab.com/furnny) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
  controller:
    "Remote Controller (https://sketchfab.com/3d-models/remote-controller-d72eebbf82be48f0a53e7e8b712e6a66) by dartuchiwa (https://sketchfab.com/dartuchiwa) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
  earrings:
    "Monarch Chrysalis earring ~ 3D print simulation (https://sketchfab.com/3d-models/monarch-chrysalis-earring-3d-print-simulation-aa93745d57c44a98a654aecf5ba5a09e) by orbytnz (https://sketchfab.com/orbytnz) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)",
  knife:
    "Kitchen Knife (https://skfb.ly/6WZ9N) by calp1 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).",
  water:
    "Every drop you splash! (https://www.cgtrader.com/free-3d-models/various/various-models/cc0-drops)",
};

const CopyrightText = (props: Props) => {
  return (
    <p className="text-xs text-white">
      {COPYRIGHT_TEXTS[props.currentModel as ModelKeys] || ""}
    </p>
  );
};

export default CopyrightText;
