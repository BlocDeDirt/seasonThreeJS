import { barbecue, bee, flowers, leaveFallAutumn, mainPlatform, snowflakeHandler, tombstone, trees } from "../main";
import { AnimationService } from "../Services/AnimationService";

export class SeasonHandler{
    private readonly buttons = document.querySelectorAll<HTMLButtonElement>(".containerButtons > button");
    public seasonChoosed?:season;
    private isOnScene = {
        leave:false,
        flower:false,
        bee:false,
        barbecue:false,
        tombstone:false,
    }
    constructor(){
        this.init();
    }

    private init(){
        if(this.buttons){
            for(let i = 0; i < this.buttons.length; i++){
                this.buttons[i].addEventListener("click", () => {
                    if(i == 0){
                        if(this.seasonChoosed != season.spring){
                            this.seasonChoosed = season.spring;
                            this.startSpring();
                        }
                    }
                    else if(i == 1){
                        if(this.seasonChoosed != season.summer){
                            this.seasonChoosed = season.summer;
                            this.startSummer();
                        }
                    }
                    else if(i == 2){
                        if(this.seasonChoosed != season.autumn){
                            this.seasonChoosed = season.autumn;
                            this.startAutumn();
                        }

                    }
                    else if(i == 3){
                        if(this.seasonChoosed != season.winter){
                            this.seasonChoosed = season.winter;
                            this.startWinter();
                        }
                    }
                });
            }
        }
    }
    //#region SPRING
    /**********************************
     * First call for spring animation
     **********************************/
    private startSpring(){
        this.disableAllButtons();
        mainPlatform.LerpToSpringGrass();
        leaveFallAutumn.animate = false;
        snowflakeHandler.canAnimateSnow = false;
        snowflakeHandler.removeSnowflakes();
        trees.forEach(tree => {
            tree.SpringLeave();
        });
        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee == false){
            bee.animateBeeAppears();
            bee.makeBeeFollowPath();
            this.isOnScene.bee = true;
        }
        if(this.isOnScene.barbecue){
            barbecue.animateBarbecueDisappears();
            this.isOnScene.barbecue = false;
        }
        if(this.isOnScene.tombstone){
            tombstone.animateTombstoneDisappears();
            this.isOnScene.tombstone = false;
        }

        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForSpring.bind(this));
        this.isOnScene.leave = true;
    }

    /********************************
     * second call for spring animation
     ********************************/
    private setPropsToFinalPositionForSpring(){
        setTimeout(() => {                
            this.SetLeaveToFinalPosition();
            this.SetFlowersToFinalPosition();
            bee.setBeeToFinalState();
            barbecue.removeBarbecueFromScene();
            tombstone.removeTombstone();
            this.enableAllButtons();
        });
    }
    //#endregion



    //#region SUMMER
    /**********************************
     * First call for summer animation
     **********************************/
    private startSummer(){
        this.disableAllButtons();
        leaveFallAutumn.animate = false;
        snowflakeHandler.canAnimateSnow = false;
        snowflakeHandler.removeSnowflakes();
        mainPlatform.LerpToSummerGrass();
        trees.forEach(tree => {
            tree.SummerLeave();
        });
        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee){
            bee.animateBeeDisappears();
            this.isOnScene.bee = false;
        }
        if(this.isOnScene.barbecue == false){
            barbecue.animateBarbecueAppears();
            this.isOnScene.barbecue = true;
        }
        if(this.isOnScene.tombstone){
            tombstone.animateTombstoneDisappears();
            this.isOnScene.tombstone = false;
        }
        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForSummer.bind(this));
    }
    /**********************************
     * second call for summer animation
     **********************************/
     private setPropsToFinalPositionForSummer(){
        setTimeout(() => {                
            this.SetLeaveToFinalPosition();
            this.SetFlowersToFinalPosition();
            bee.removeBeeFromScene();
            barbecue.setBarbecueToFinalState();
            tombstone.removeTombstone();
            this.enableAllButtons();
        });
    }
    //#endregion

    //#region AUTUMN
    /**********************************
     * first call for autumn animation
     **********************************/
    private startAutumn(){
        this.disableAllButtons();
        leaveFallAutumn.animate = true;
        snowflakeHandler.canAnimateSnow = false;
        snowflakeHandler.removeSnowflakes();
        mainPlatform.LerpToAutumnGrass();
        trees.forEach(tree => {
            tree.AutumnLeave();
        });
        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee){
            bee.animateBeeDisappears();
            this.isOnScene.bee = false;
        }
        if(this.isOnScene.barbecue){
            barbecue.animateBarbecueDisappears();
            this.isOnScene.barbecue = false;
        }
        if(this.isOnScene.tombstone == false){
            tombstone.animateTombstoneAppears();
            this.isOnScene.tombstone = true;
        }
        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForAutumn.bind(this));
    }

    /**********************************
     * second call for autumn animation
     **********************************/
    private setPropsToFinalPositionForAutumn(){
        setTimeout(() => {       
            this.SetFlowersToFinalPosition();         
            this.SetLeaveToFinalPosition();
            bee.removeBeeFromScene();
            barbecue.removeBarbecueFromScene();
            tombstone.setTombstoneFinalPosition();
            this.enableAllButtons();
        });
    }
    //#endregion

    //#region winter
    /**********************************
     * first call for winter animation
     **********************************/
    private startWinter(){
        this.disableAllButtons();
        leaveFallAutumn.animate = false;
        snowflakeHandler.canAnimateSnow = true;
        snowflakeHandler.addSnowflakes();
        mainPlatform.LerpToWinterGrass();
        trees.forEach(tree => {
            tree.WinterLeave();
        });

        if(this.isOnScene.flower == false){
            this.MakeFlowersAppearWithAnimation();
            this.isOnScene.flower = true;
        }
        if(this.isOnScene.bee){
            bee.animateBeeDisappears();
            this.isOnScene.bee = false;
        }
        if(this.isOnScene.barbecue){
            barbecue.animateBarbecueDisappears();
            this.isOnScene.barbecue = false;
        }
        if(this.isOnScene.tombstone){
            tombstone.animateTombstoneDisappears();
            this.isOnScene.tombstone = false;
        }
        AnimationService.GetAnimationMixerFromAction();
        AnimationService.PlayAnimation(true, this.setPropsToFinalPositionForWinter.bind(this));
    }

    /**********************************
     * second call for winter animation
     **********************************/
    private setPropsToFinalPositionForWinter(){
        setTimeout(() => {       
            this.SetFlowersToFinalPosition();         
            this.SetLeaveToFinalPosition();
            bee.removeBeeFromScene();
            barbecue.removeBarbecueFromScene();
            tombstone.removeTombstone();
            trees.forEach(tree =>{
                tree.setSnowToFinalPosition();
                this.enableAllButtons();
            });
        });
    }
    //#endregion

    private MakeFlowersAppearWithAnimation(){
        flowers.forEach(flower =>{
            flower.animateFlowerAppears();
        });
    }

    private SetFlowersToFinalPosition(){
        flowers.forEach(flower =>{
            flower.setFlowerToFinalPosition();
        });   
    }

    private SetLeaveToFinalPosition(){
        trees.forEach(tree =>{
            tree.setLeaveToFinalPosition();
        });
    }

    private disableAllButtons(){
        this.buttons.forEach(button => {
            button.disabled = true;
        });
    }

    private enableAllButtons(){
        this.buttons.forEach(button => {
            button.disabled = false;
        });
    }
}

enum season{
    spring,
    summer,
    autumn,
    winter,
}