<template>
    <div class="modal-overlay">
        <dialog open class="modal-container">
            <header>
                <h2>Update Product:</h2>
            </header>
            <p><strong>Product name: </strong>{{props.productName}}</p>
            <form >
                <div class="input-wrapper">
                    <label class="update-form__label" for="productPrice">Price</label>
                    <input class="update-form__input" v-model="productPrice" id="productPrice" type="text" placeholder="1000"/>
                </div>
                <footer class="modal-buttons">
                    <button class="modal__button" type="button" @click="closeModal">Cancel</button>
                    <button class="modal__button" type="submit" @click.prevent="updateProduct">Update</button>
                </footer>
            </form>
        </dialog>
    </div>
</template>

<script setup>
    import { ref, defineProps, defineEmits } from 'vue';

    const props = defineProps({
        productId: {type: Number, required: true},
        productName: {type: String, required: true},
    });

    const emit = defineEmits(['update-product', 'close-modal']);

    const productPrice = ref('');

    function updateProduct() {
        emit('update-product', productPrice.value);
    }

    function closeModal() {
        emit('close-modal');
    }
</script>

<style lang="scss" scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        .modal-container {
            background: white;
            padding: 20px;
            border: 2px solid $contrastColorDark;
            border-radius: 10px;
            max-width: 500px;
            width: 100%;

            .input-wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .update-form__label {
                    width: 100px;
                    font-weight: bold;
                }

                .update-form__input {
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    height: 30px;
                    border: 2px solid $secondaryColor;
                    border-radius: 5px;
                }

                .update-form__input:focus {
                    outline: 2px solid $primaryColor;
                    outline-offset: 3px;
                }
            }

            .modal-buttons {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-top: 20px;
                gap: 15px;

                .modal__button {
                    width: 200px;
                    background-color: $primaryColor;
                    border: 2px solid $contrastColorDark;
                    border-radius: 15px;
                    padding: 10px;
                    cursor: pointer;
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    font-weight: bold;
                    font-size: 18px;
                    color: $textColor;
                }

                .modal__button:hover{
                    background-color: white;
                }
            }
        }
    }
</style>