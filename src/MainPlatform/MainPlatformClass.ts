import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import { mainScene } from "../main";

const colorGrass =  {
    spring : new Color(0x94c26e),
    summer: new Color(0x77a651),
    autumn : new Color(0xbdb74d),
    winter : new Color(0xf2f2f2)
}

export class MainPlatform{
    public readonly widthNHeight = {
        width:8,
        height:0.5
    };

    private grassGeometry = new BoxGeometry(this.widthNHeight.width, this.widthNHeight.height, this.widthNHeight.width);
    public grassMaterial = new MeshStandardMaterial({color:colorGrass.spring});
    public grassMesh = new Mesh(this.grassGeometry, this.grassMaterial);

    private groundGeometry = new BoxGeometry(this.widthNHeight.width-1, this.widthNHeight.height * 2, this.widthNHeight.width-1);
    private groundMaterial = new MeshStandardMaterial({color:0x614418});
    public groundMesh = new Mesh(this.groundGeometry, this.groundMaterial);
    constructor(){
        this.init();
    }

    private init(){
        this.grassMaterial.color.convertSRGBToLinear();
        this.grassMesh.castShadow = true;
        this.grassMesh.receiveShadow = true;

        this.groundMaterial.color.convertSRGBToLinear();
        this.groundMesh.receiveShadow = true;
        this.groundMesh.position.y = -this.widthNHeight.height;
    }

    public addPlatformToScene(){
        mainScene.scene.add(this.grassMesh, this.groundMesh);
    }

    public LerpToSpringGrass(){
        this.lerpColorGrass(0.15, colorGrass.spring);
    }

    public LerpToSummerGrass(){
        this.lerpColorGrass(0.15, colorGrass.summer);
    }

    public LerpToAutumnGrass(){
        this.lerpColorGrass(0.15, colorGrass.autumn)
    }

    public LerpToWinterGrass(){
        this.lerpColorGrass(0.15, colorGrass.winter)
    }

    private lerpColorGrass(speed:number, colorToLerp:Color){
        let alpha = 0;
        let oldColor = this.grassMaterial.color.clone();
        let id = setInterval(() => {
            alpha += speed;
            this.grassMaterial.color.lerpColors(oldColor, colorToLerp, alpha).convertSRGBToLinear();
            if(alpha > 1){
                clearInterval(id);
            }
        }, 33);
    }
}