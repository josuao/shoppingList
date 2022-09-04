<template>
    <div>
        <div class="oneArticle">
            <div class="validator" @click="TaskDo">
                >
            </div>
            <div class="infoproduct">
                <div class="productName" :class="{do: taskOk}">
                    {{article.product}}
                </div>
                <div class="control">
                    <div class="bloc_quantity">
                        <button @click="ModifyQuantity('sub')">-</button>
                        <input v-model.number="quantity" max="99" disabled="disabled">
                        <button @click="ModifyQuantity('add')">+</button>
                    </div>
                    <div class="delete" @click="SelectProductDelete(article._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.08 330.09">
                            <path
                                d="M15.32,66H11.47C4.2,66,.06,62.78,0,57.11S4.18,48,11.68,48H72c0-4.78,0-9.24,0-13.7C72.07,14.27,86.19.07,106.21,0Q141.09,0,176,0c19.81,0,34,14.23,34.08,34.05,0,4.48,0,9,0,13.94h4.19c19.38,0,38.76-.05,58.13,0,7.62,0,12.07,7.26,8.43,13.44A8.74,8.74,0,0,1,273.07,66c-2,.06-4,0-6.31,0-.63,7.29-1.27,14.35-1.84,21.42q-5.22,64.62-10.43,129.26-3.18,39.6-6.26,79.21c-1.3,17.17-10.24,29.21-25.07,33a39.51,39.51,0,0,1-9.63,1.14q-72.57.11-145.14,0c-18.36,0-32.21-12-34-30.19-2.06-20.51-3.45-41.08-5.12-61.63Q26,198.47,22.79,158.68,20,123.94,17.21,89.19C16.61,81.61,16,74,15.32,66Zm233.7.25H33c.76,9.1,1.5,17.93,2.22,26.77q3.15,38.28,6.3,76.57,3.23,39,6.48,78.05c1.43,17.05,2.74,34.12,4.39,51.15.75,7.77,7,13,14.77,13.23,1.5.05,3,0,4.5,0H213.4c9.54,0,15.24-5,16.46-14.37.21-1.61.31-3.23.44-4.85q1.65-20.18,3.31-40.34,3.21-38.85,6.44-77.68,2.85-34.19,5.68-68.35C246.83,93.17,247.91,79.85,249,66.29Zm-159-18.53H192c0-5.39.18-10.51,0-15.61a14.61,14.61,0,0,0-14.38-14.06q-36.57-.19-73.14,0A14.54,14.54,0,0,0,90.11,31.78C89.81,37,90.05,42.26,90.05,47.76Z" />
                            <path
                                d="M102,189.45q0,28.49,0,57a29.1,29.1,0,0,1-.1,3.74,9,9,0,0,1-17.82-.24,29.12,29.12,0,0,1-.08-3.37v-115a29.06,29.06,0,0,1,.08-3.37,9,9,0,0,1,17.83-.13,29.11,29.11,0,0,1,.09,3.74Q102,160.59,102,189.45Z" />
                            <path
                                d="M132,189.1q0-29.41,0-58.83c0-3.48,1-6.42,3.83-8.5a9,9,0,0,1,14.12,6.35,29.12,29.12,0,0,1,.08,3.37v115c0,.88,0,1.75,0,2.63-.31,5.07-4,8.81-8.84,8.89a8.92,8.92,0,0,1-9.09-9c-.15-8,0-16,0-24Z" />
                            <path
                                d="M180,188.64V132.06c0-1,0-2,0-3,.27-5.25,4.16-9.07,9.11-9A9,9,0,0,1,198,129c.15,3.86,0,7.74,0,11.61V245.48c0,1.12,0,2.25,0,3.37-.23,5.32-4,9.15-8.92,9.19s-8.79-3.81-9-9.07c-.05-1,0-2,0-3Z" />
                        </svg>
                    </div>
                </div>
                <div class="comment" v-if="article.comment != ''">
                    {{article.comment}}
                </div>
            </div>
        </div>
        <div class="alerte" v-if="alert">
            Voulez vous supprimer cet article ?
            <div class="flexBntChoice">
                <button @click="RemoveArticle">Oui</button>
                <button @click="alert=false">Non</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['article'],
        data() {
            return {
                quantity: 1,
                taskOk: false,
                alert: false,
                selectedArticle: ''
            }
        },
        created() {
            this.quantity = this.article.quantity
        },
        methods: {
            // modifier les quantités
            ModifyQuantity(type) {
                if (type === "sub") {
                    this.quantity--

                    if (this.quantity < 1) {
                        this.quantity = 1
                        this.SelectProductDelete(this.article._id)
                    } else {
                        const item = {
                            'id': this.article._id,
                            'quantity': this.quantity
                        }
                        this.$store.commit('AddQuantity', item)
                        this.$store.dispatch('ModifyShoppingList')
                    }
                } else if (type === "add") {
                    this.quantity++
                    const item = {
                        'id': this.article._id,
                        'quantity': this.quantity
                    }
                    this.$store.commit('AddQuantity', item)
                    this.$store.dispatch('ModifyShoppingList')
                }

            },
            // Valider une tache de la liste
            TaskDo() {
                this.taskOk = !this.taskOk
            },
            //effacer un article
            SelectProductDelete(theArticle) {
                this.alert = true
                this.selectedArticle = theArticle
            },
            RemoveArticle() {
                this.$store.commit('DeleteArticle', this.selectedArticle)
                this.$store.dispatch('ModifyShoppingList')
                this.alert = false
                this.selectedArticle = ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style/variables.scss';

    .oneArticle {
        background: #fff;
        border-radius: 5px;
        margin: 15px auto;
        box-shadow: 1px 3px 7px $light-base-color;
        text-align: left;
        display: flex;
        align-items: center;

        .validator {
            display: flex;
            align-items: center;
            padding: 14px;
            background: $light-base-color;
            color: $base-color;
            font-size: 1.4rem;
            cursor: pointer;
        }

        .infoproduct {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 15px;
            width: 100%;

            .do {
                opacity: 0.7;
                text-decoration: line-through;
            }

            .control {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                input {
                    width: 3em;
                }

                .delete svg {
                    height: 20px;
                    margin-left: 15px;
                    fill: rgb(26, 113, 245);
                    cursor: pointer;
                }
            }
            .comment{
                width: 100%;
            }
        }
    }
</style>