import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyDgvsqAujju8pHoxHUG3rZ_U_dyNhYAetw",

    authDomain: "listecourse-3cb3c.firebaseapp.com",
  
    databaseURL: "https://listecourse-3cb3c-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "listecourse-3cb3c",
  
    storageBucket: "listecourse-3cb3c.appspot.com",
  
    messagingSenderId: "801063702226",
  
    appId: "1:801063702226:web:a264e40fb7084ba8f1e70b",
  
    measurementId: "G-HD7K2DB5L6"
  
}

firebase.initializeApp(firebaseConfig)

createApp(App).use(store).use(router).mount('#app')
