import { Box3, Vector3 } from "three";
import { mainScene } from "../main";
import { Snowflake } from "./SnowflakeClass";

export class SnowflakeHandler{
    public canAnimateSnow = false;
    public boundingBoxSpawn = new Box3(new Vector3(-4,5,-4),new Vector3(4,8,4))

    private snowflakes:Snowflake[] = [];

    public createSnowflakes(){
        for(let i = 0; i < 10; i++){
            this.snowflakes.push(new Snowflake());
            mainScene.scene.add(this.snowflakes[i].mesh);
        }
    }

    public removeSnowflakes(){
        this.snowflakes.forEach(snowflake => {
            snowflake.mesh.visible = false;
        });
    }

    public addSnowflakes(){
        this.snowflakes.forEach(snowflake => {
            snowflake.mesh.visible = true;
        });
    }

    public makeSnowflakesFall(delta:number){
        this.snowflakes.forEach(snowflake => {
            snowflake.makeSnowflakeFall(delta);
        });
    }
}