<template>
    <div class="product-wrapper">
        <h3>{{ props.name }}</h3>
        <h4>{{ props.category }}</h4>
        <div class="p-wrapper">
            <p> <strong>Precio:</strong>  {{ props.price }} €</p>
            <button class="update-button" @click="updateProduct">Update</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps(
        {
            id: {type: Number, required: true},
            name: {type: String, required: true},
            category: {type: String, required: true},
            categoryId: {type: Number, required: true},
            price: {type: Number, required: true},
        }
    )

    const emit = defineEmits(['open-update-product-modal']);

    function updateProduct() {
        emit('open-update-product-modal', props.id, props.name, props.categoryId);
    }

</script>

<style lang="scss" scoped>
    .product-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 2px solid $secondaryColor;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 15px;
        height: 220px;
        position: relative;

        h3, h4, p{
            margin: 0;
        }

        h3 {
            font-size: 25px;
        }

        h4 {
            font-size: 19px;
        }

        .p-wrapper {
            display: flex;
            flex-direction: row;
            gap: 10px;

            .update-button {
                width: 75px;
                background-color: $primaryColor;
                border: 2px solid $contrastColorDark;
                border-radius: 15px;
                cursor: pointer;
                font-family: Avenir, Helvetica, Arial, sans-serif;
                font-weight: bold;
                font-size: 14px;
                color: $textColor;
            }

            .update-button:hover{
                background-color: white;
            }
        }
    }
</style>