import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // verifier la connexion
    isConnect: false,
    //shoppingList
    shoppingList : [],

  },
  getters: {

    //connexion
    getIsConnect(state){
      return state.isConnect
    },
    // liste de course
    getShoppingList(state){
      return state.shoppingList
    }
  },
  mutations: {
    //connexion
    SetIsConnect(state, logIn){
      state.isConnect = logIn
    },
    // liste de course
    SetShoppingList(state, shoppingList){
      state.shoppingList = shoppingList
    },
    AddArticle(state, article){
      state.shoppingList.push(article)
    },
    DeleteArticle(state, deleteItem){
      const indexToDelete = state.shoppingList.findIndex( i => i._id === deleteItem)
      state.shoppingList.splice(indexToDelete,1)
    },
    AddQuantity(state, item){
      const indexToQuantiy = state.shoppingList.findIndex( i => i._id === item.id)
      state.shoppingList[indexToQuantiy].quantity = item.quantity
    }
  },
  actions: {
    async SetShoppingList({commit}){
      try{
        const res = await axios.get(process.env.VUE_APP_BDDJSON)
        if(res.data != null){
          commit('SetShoppingList', res.data)
        }
      }catch(err){
        console.log(err)
      }
    },
    async ModifyShoppingList(){
      try{
        await axios.put(process.env.VUE_APP_BDDJSON, this.state.shoppingList)
      }catch(err){
        console.log(err)
      }
    }
  }
})
