// import { useCallback } from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";

// export default function Background() {
//   const particlesInit = useCallback(async (engine) => {
//     console.log("Particles engine:", engine); // 👈 debería aparecer en consola
//     await loadSlim(engine);                   // 👈 carga slim
//     console.log("Slim cargado ✅");           // 👈 confirma que terminó
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit} // este metodo estaba mal pq es para version 2 de react 
//       options={{
//         fullScreen: { enable: true, zIndex: -1 },
//         background: { color: "#000000" },
//         fpsLimit: 120,
//         interactivity: {
//           events: {
//             onClick: { enable: true, mode: "push" },
//             onHover: { enable: true, mode: "repulse" },
//             resize: true,
//           },
//           modes: {
//             push: { quantity: 4 },
//             repulse: { distance: 200, duration: 0.4 },
//           },
//         },
//         particles: {
//           color: { value: "#c77dff" },
//           links: {
//             color: "#e0aaff",
//             distance: 150,
//             enable: true,
//             opacity: 0.5,
//             width: 1,
//           },
//           move: { enable: true, speed: 2, outModes: { default: "bounce" } },
//           number: { value: 80, density: { enable: true, area: 800 } },
//           opacity: { value: 0.8 },
//           shape: { type: "circle" },
//           size: { value: { min: 2, max: 5 } },
//         },
//         detectRetina: true,
//       }}
//     />
//   );
// }

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function Background() {
  const [init, setInit] = useState(false);

  // Se inicializa SOLO una vez
  useEffect(() => {
    initParticlesEngine(async (engine) => { //se tiene que usar engine para la version 3 
      console.log("Particles engine:", engine);
      await loadSlim(engine);
      console.log("Slim cargado");
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "#000000" } },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#c77dff" },
        links: {
          color: "#e0aaff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: { enable: true, speed: 2, outModes: { default: "bounce" } },
        number: { value: 80, density: { enable: true, area: 800 } },
        opacity: { value: 0.8 },
        shape: { type: "circle" },
        size: { value: { min: 2, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return <></>;
}
