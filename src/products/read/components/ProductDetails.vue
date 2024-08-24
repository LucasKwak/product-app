<template>
    <div class="product-wrapper">
        <h3>{{ props.name }}</h3>
        <h4>{{ props.category }}</h4>
        <div class="p-wrapper">
            <p>{{ props.price }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';

    const props = defineProps(
        {
            name: {type: String, required: true},
            category: {type: String, required: true},
            price: {type: Number, required: true},
        }
    )
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
        height: 320px;
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
    }
</style>