<template>
    <div class="form-wrapper">
        <CreateProductForm></CreateProductForm>
    </div>
</template>

<script lang="ts" setup>
    import CreateProductForm from "@/products/create/components/CreateProductForm.vue";
</script>

<style lang="scss" scoped>
    .form-wrapper {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>