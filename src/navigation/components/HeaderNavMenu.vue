<template>
    <nav class="nav-menu">
        <router-link to="/home">Home</router-link>
        <router-link v-if="!isAuthenticated" :to="{name: 'sign-up'}">Sign Up</router-link>
        <router-link v-if="!isAuthenticated" :to="{name: 'sign-in'}">Sign In</router-link>
        <router-link v-if="isAuthenticated" :to="{name: 'profile'}">Profile</router-link>
        <router-link v-if="isAuthenticated" :to="{name: 'log-out'}">Log out</router-link>
    </nav>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import {useAuthStore} from "@/util/store/auth";

    const store = useAuthStore();

    const isAuthenticated = computed (() => store.isAuthenticated);
</script>

<style lang="scss" scoped>
    .nav-menu {
        background-color: $primaryColor;
        display: flex;
        flex-direction: row;
        justify-content: right;
        padding: 20px;
        gap: 25px;

        a {
            font-weight: bold;
            color: $textColor;
            text-decoration: none;
            border: 2px solid $contrastColorLight;
            border-radius: 15px;
            padding: 8px;

            &.router-link-active {
                color: $contrastColorLight;
            }
        }
    }
</style>