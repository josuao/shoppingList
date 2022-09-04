<template>
  <div class="topHeader">
    <div class="container">
        Connecter : 
    <span v-if="loggedIn"> Yes</span>
     <span v-else> No</span>
     <div>
        <button @click="SignOut">Se deconnecter</button>
     </div>
    </div>
    
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
    data(){
        return{
            loggedIn : false
        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user=> {
            this.loggedIn = !!user
            if(user){
                this.loggedIn = true
            }else{
                this.loggedIn = false
            }
        })
    },
    methods: {
         async SignOut(){
            try {
                const data = await firebase.auth().signOut()
                this.$store.commit('SetIsConnect', false)
                this.$router.replace({name: "login"})
                return data
            }catch(err){
                console.log(err)
            }
           
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
@import '@/style/mixins.scss';
.topHeader{
    background: $second-color;
    .container{
         @include container;
    }
}

</style>