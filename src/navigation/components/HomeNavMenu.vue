<template>
    <nav class="nav-lateral-menu">
        <router-link :to="{name: 'allProducts'}">All products</router-link>
        <router-link :to="{name: 'createProduct'}" v-if="isAdmin">Create product</router-link>
    </nav>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import {useAuthStore} from "@/util/store/auth";

    const store = useAuthStore();

    const isAdmin = computed (() => store.isAdmin);
</script>

<style lang="scss" scoped>
    .nav-lateral-menu {
        display: flex;
        flex-direction: column;
        border: 2px solid $secondaryColor;
        border-radius: 15px;
        padding: 20px;
        gap: 25px;

        a {
            font-weight: bold;
            color: $textColor;
            text-decoration: none;
            border: 2px solid $contrastColorLight;
            border-radius: 15px;
            padding: 8px;

            &.router-link-exact-active {
                color: $primaryColor;
                border: 2px solid $primaryColor;
            }
        }
    }
</style>