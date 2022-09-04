import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'
import SecretPage from '../views/Secret.vue'
import ShoppingList from '../views/ShoppingList.vue'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }, 
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/Secret',
    name: 'Secret',
    component: SecretPage,
    meta: {requiresAuth: true}
  },
  {
    path: '/shopping-list',
    name: 'ShoppingList',
    component: ShoppingList,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//verfiie si le user est connecter
router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if(requiresAuth && !isAuthenticated){
    next("/login")
  }else{
    next()
  }
})

export default router
