import { AnimationClip, NumberKeyframeTrack } from "three";

export class BeeAnimation{
    public static opacityBeeAppearsKF = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 2], 
        [0, 1]
    );
    public static opacityBeeDisappearsKF = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 0.5], 
        [1, 0]
    );
    public static beeAppearsClip = new AnimationClip('opacityBeeAppears', -1, [this.opacityBeeAppearsKF]);
    public static beeDisappearsClip = new AnimationClip('opacityBeeDisappears', -1, [this.opacityBeeDisappearsKF]);
}