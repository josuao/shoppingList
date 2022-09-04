<template>
  <div>
    <div v-if="error" class="error">{{error.message}}</div>
    <h1>Creer un compte</h1>
    <form @submit.prevent="OnSubmit">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="password">
        <button type="submit">Créer un compte</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


export default {
    name: 'RegistePage',
    data() {
        return{
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        async OnSubmit(){
            try{
                const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                this.$router.replace({name: "Secret"})
                console.log(user)
            }catch(err){
                console.log(err)
            }
           
        }
    }

}
</script>

<style lang="scss" scoped>
    .error {
        color: red;
        font-size: 18px;
    }
    input {
        width: 400px;
        padding: 30px;
        margin: 20px;
        font-size: 21px;
    }
    button {
        width: 400px;
        height : 75px;
        font-size: 100%;
    }
</style>