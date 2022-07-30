import { AnimationClip, VectorKeyframeTrack } from "three";

export class FlowerAnimation{
    public static positionFlowerKF = new VectorKeyframeTrack(
        '.position',
        [0, 2],
        [
            0, -1.8, 0, 
            0, 0, 0,
        ],
    );

    /*public static opacityLeaveKF = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 0.4], 
        [0, 1]
    ); */
    public static moveFlowerClip = new AnimationClip('moveFlower', -1, [this.positionFlowerKF]);
}