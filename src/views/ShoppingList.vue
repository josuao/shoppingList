<template>
    <div class="shoppingList">
        <h1>Liste de course</h1>
        <div class="listArticle">
            <button class="btn_plus" @click="AddProduct">+ Ajouter un produit</button>
            <div class="article" v-for="article in List" v-bind:key="article._id">
                <one-article :article="article"/>
            </div>
        </div>

        <modaleArticle v-if="showModale" @closeModale="showModale = false" />
    </div>
</template>

<script>
    import ModaleArticle from '@/components/ModaleArticle.vue'
import OneArticle from '@/components/OneArticle.vue'
    export default {
        name: 'ShoppingList',
        components: {
            ModaleArticle,
                OneArticle
        },
        data() {
            return {
                articles: [],
                showModale: false,
                alert: false,
                choiseYes: false,
                selectedArticle : ''
            }
        },
        created() {
            this.articles = this.$store.dispatch('SetShoppingList')
        },
        computed: {
            List() {
                return this.$store.getters.getShoppingList
            }

        },
        methods: {
            AddProduct() {
                this.showModale = true
            },
            
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/style/variables.scss';

    .listArticle {
        margin: auto;
        padding: 5px;
        max-width: 450px;
        width: 100%;

    }

    .btn_plus {
        border-radius: 7px;
        padding: 15px;
        color: #fff;
        background: $base-color;
        border: none;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
</style>