import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from "three";

export class TreeAnimation{
    public static addLeaveOrSnowFK = new VectorKeyframeTrack(
        '.position',
        [0, 0.6, 0.65, 0.75],
        [
            0, 15, 0, 
            0, 0, 0,
            0, 0.8, 0,
            0, 0, 0
        ],
    );

    public static opacityAppearLeaveOrSnowFK = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 0.4], 
        [0, 1]
    );

    public static removeLeaveOrSnowKF = new VectorKeyframeTrack(
        ".position",
        [0, 0.1, 0.3],
        [
            0, 0, 0,
            0, 0.8, 0,
            0, -5, 0
        ]
    )

    public static opacityDisappearsLeaveOrSnowFK = new NumberKeyframeTrack(
        '.material.opacity', 
        [0, 0.3], 
        [1, 0]
    ); 


    public static addLeaveOrSnowClip = new AnimationClip('moveLeaveAndAppear', -1, [this.addLeaveOrSnowFK, this.opacityAppearLeaveOrSnowFK]);
    public static removeLeaveOrSnowClip = new AnimationClip("removeLeaveSnow", -1, [this.removeLeaveOrSnowKF, this.opacityDisappearsLeaveOrSnowFK])
}