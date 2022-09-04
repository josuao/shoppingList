<template>
  <div class="container">
    <div class="login">
      <div class="contentLogin">
        <h1>Login</h1>
        <p>Connectez-vous à votre compte</p>
        <p class="error">{{error}}</p> 
        <form @submit.prevent="OnSubmit">
          <input type="email" v-model="email"  @keydown="WriteInput" placeholder="Votre Email">
          <input type="password" v-model="password"  @keydown="WriteInput" placeholder="Votre mot de passe">
          <button v-bind:class="{ active: isActive }" type="submit">Se connecter</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";

  export default {
    name: 'LoginPage',
    data() {
      return {
        email: "",
        password: "",
        error: "",
        isActive : false
      }
    },
    computed:{
    },
    methods: {
      WriteInput(){
        if(this.email != "" && this.password != ""){
          this.isActive = true
        }else{
          this.isActive = false
        }
      },
      async OnSubmit() {
        if(this.isActive){
        try {
            const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            this.$store.commit('SetIsConnect', true)
            this.$router.replace({
              name: "ShoppingList"
            })
            return val
          } catch (err) {
            console.log(err)
          }
        }else{
          this.error = 'Veuillez remplir tous les champs'
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  @import '@/style/mixins.scss';

  .container {
    @include container;

    .login {
      background: #fff;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    form {
      input {
        width: 400px;
        display: block;
        padding: 15px;
        font-size: 0.9rem;
        margin: 10px auto;
        background: $light-grey;
        border: none;
        border-radius: 20px;
      }
      button {
        width: 200px;
        font-size: 1rem;
        background: $base-grey;
        color: #fff;
        border:none;
        border-radius: 30px;
        padding: 15px;
        cursor: not-allowed;
         &.active{
          background: $base-color;
          cursor: pointer;
         }
      }

    }
  }

  .error {
    color: red;
    font-size: 18px;
  }

  

  
</style>