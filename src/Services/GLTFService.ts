import { Material } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export class GLTFService{
    private static GLTF_Loader = new GLTFLoader();

    public static async LoadGLTF(url:string, traverseMesh:boolean = false, material?:Material){
        let gltf = await this.GLTF_Loader.loadAsync(url);
        console.log(gltf.scene);
        let mesh = gltf.scene.children[0] as THREE.Mesh;
        if(material){
            mesh.material = material;
        }

        if(mesh.material){
            let materialMesh = mesh.material as Material;
            materialMesh.side = 0;
        }

        if(traverseMesh){
            gltf.scene.traverse((obj) => {
                obj.castShadow = true;
                obj.receiveShadow = true;
            });
        }else{
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }
        return mesh;
    }
}