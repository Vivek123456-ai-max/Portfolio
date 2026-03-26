import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // FIX: manually reassign colors based on material names and mesh names
                if (mesh.material) {
                  // If it's the default material, we might need to separate it
                  // because head, arms, and shirt all share "default".
                  const material = mesh.material as THREE.MeshStandardMaterial;
                  const matName = material.name;
                  
                  if (matName === "Material.030") material.color.set(0x0e0e0e); // hair
                  else if (matName === "Material.014") material.color.set(0x000000); // eyebrows/lashes
                  else if (matName === "Material.025") material.color.set(0xffe6cf); // skin (1, 0.92, 0.85 approx)
                  else if (matName === "Material.024") material.color.set(0xbcbcbc); // shirt
                  else if (matName === "Material.027") material.color.set(0xe6e6e6); // teeth?
                  else if (matName === "Material.028") material.color.set(0x0a0a0a); // inside mouth?
                  else if (matName === "Material.026") material.color.set(0xffffff); // eye whites?
                  
                  // Skin parts using "default"
                  if (matName === "default" || matName === "") {
                    // Head, Arms, Hands, Neck
                    if (
                      mesh.name.includes("Plane.007") || 
                      mesh.name.includes("Cylinder") ||
                      mesh.name.includes("Mesh.002") ||
                      mesh.name.includes("Plane.005") ||
                      mesh.name.includes("Cube.004") 
                    ) {
                      mesh.material = material.clone();
                      (mesh.material as THREE.MeshStandardMaterial).color.set(0xffe6cf); // skin tone
                      mesh.material.needsUpdate = true;
                    } 
                    else if (mesh.name.includes("Cube.002")) {
                      // Shirt/Body
                      mesh.material = material.clone();
                      (mesh.material as THREE.MeshStandardMaterial).color.set(0xffffff); // White t-shirt
                      mesh.material.needsUpdate = true;
                    }
                  } else {
                    material.needsUpdate = true;
                  }
                  // Disable vertex colors because they are baked grey and override our colors
                  material.vertexColors = false;
                  material.needsUpdate = true;
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
