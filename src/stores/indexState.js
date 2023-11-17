import { defineStore } from "pinia";

export default defineStore("indexState",{

state:() =>({
    location:1
}),
getters:{
    locationbarInfo(state){
        return`現在位置${state.location}`
    }

},
actions:{
    getLocation(){
        console.log(this.location);
    },
    setLocation(num){
        this.location = num ;
    }
}


})