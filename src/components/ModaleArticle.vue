<template>
  <div class="modale">
    <div class="close" @click="$emit('closeModale')">
      X
    </div>
    <form @submit.prevent="AddProduct">
        <label for="article">Article</label>
        <input type="text" v-model="article" id="article">
        <label for="quantity">Quantité</label>
        <input type="number" v-model="quantity" id="quantity">
        <label for="comment">Commentaire (facultatif)</label>
        <textarea v-model="comment" id="comment"></textarea>
        <button>Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'ModaleArticle',
    data () {
      return {
        article: '',
        quantity: 1,
        comment: ''
      }
    },
    methods: {
      AddProduct() {
        const randomId = Date.now()
        const addtheproduct = {'_id' : randomId, 'product' : this.article, 'quantity' : this.quantity, 'comment': this.comment}
        this.$store.commit('AddArticle', addtheproduct )
        this.$store.dispatch('ModifyShoppingList', addtheproduct)
      }

    }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
  .modale{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $light-grey;
    display: flex;
    align-items: center;
    justify-content: center;

    .close{
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    }
  }
</style>