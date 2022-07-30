import { AmbientLight, Color, DirectionalLight, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

export class MainScene{
    public scene = new Scene();
    public camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    public renderer = new WebGLRenderer();

    public dirLight = new DirectionalLight(0xffffff, 1);
    public ambLight = new AmbientLight(0xffffff, 0.7);

    constructor(){
        this.init();
    }

    private init(){
        this.scene.background = new Color(0xb8f2fc);
        this.camera.position.z = 8;
        this.camera.position.y = 5;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.outputEncoding = sRGBEncoding;

        this.dirLight.position.set(3,10,3);
        this.dirLight.target.position.set(0,0,0);
        this.dirLight.castShadow = true;
        //this.dirLight.shadow.bias = -0.0004; //-0.0001

        //const dirLightHelper = new DirectionalLightHelper( this.dirLight, 10 );
        //this.scene.add( dirLightHelper );

        this.scene.add(this.dirLight);
        this.scene.add(this.ambLight);
        this.resize();
    }

    private resize(){
        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        });
    }
}