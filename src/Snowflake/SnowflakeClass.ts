import { DoubleSide, MathUtils, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { snowflakeHandler } from "../main";

export class Snowflake{
    public material = new MeshStandardMaterial();
    public mesh:Mesh;
    constructor(){
        this.material.color.set(0xd6d6d6).convertSRGBToLinear();
        this.material.side = DoubleSide;
        this.mesh = new Mesh(new PlaneGeometry(0.2,0.2), this.material);
        let secondMesh = new Mesh(new PlaneGeometry(0.2,0.2), this.material);
        secondMesh.rotation.x = MathUtils.degToRad(-90);
        secondMesh.rotation.y = MathUtils.degToRad(90);
        this.mesh.add(secondMesh);
        this.mesh.visible = false;
        this.mesh.position.set(
            this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.x,snowflakeHandler.boundingBoxSpawn.min.x),
            this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.y,snowflakeHandler.boundingBoxSpawn.min.y),
            this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.z,snowflakeHandler.boundingBoxSpawn.min.z)
        )
    }

    private GetRandomPosition(max:number, min:number){
        return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
    }

    public makeSnowflakeFall(delta:number){
        if(this.mesh.position.y < 0){
            this.mesh.position.set(
                this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.x,snowflakeHandler.boundingBoxSpawn.min.x),
                this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.y,snowflakeHandler.boundingBoxSpawn.min.y),
                this.GetRandomPosition(snowflakeHandler.boundingBoxSpawn.max.z,snowflakeHandler.boundingBoxSpawn.min.z)
            )
        }else{
            this.mesh.position.y -= 1.5 * delta;
        }
    }
}