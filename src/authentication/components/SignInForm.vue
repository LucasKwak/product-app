<template>
    <form class="sing-in-form">
        <div class="description-wrapper">
            <h2>Login</h2>
            <p>Enter your email and password to access your account.</p>
        </div>

        <div class="inputs-wrapper">
            <div class="input-wrapper">
                <label class="sing-in-form__label" for="inputUsername">Username</label>
                <input class="sing-in-form__input" type="text" id="inputUsername" placeholder="lucaskwak" v-model="username">
            </div>
            <div class="input-wrapper">
                <label class="sing-in-form__label" for="inputPassword">Password</label>
                <input class="sing-in-form__input" type="password" id="inputPassword" v-model="password">
            </div>
        </div>

        <div class="button-anchor-wrapper">
            <p>
            Don't have an account? <router-link :to="{name: 'sign-up'}">Sign up</router-link>
            </p>
            <button class="form__button" type="submit" @click.prevent="signIn">Sign in</button>
        </div>

        <div class="oauth2-wrapper">
            <button class="form__button" type="submit" @click.prevent="signInGoogle">Google</button>
        </div>
    </form>
</template>

<script lang="ts" setup>
    import { Ref, ref } from "vue";
    import { useAuthStore } from '@/util/store/auth';
    import router from '@/util/router';

    const store = useAuthStore();

    let username:Ref<string> = ref('');
    let password:Ref<string> = ref('');

    const signIn = async ()=> {
        const wentWell = await store.logIn(username.value, password.value);
        if (wentWell) {
            // Para cambiar de vista
            await router.push("/");
        }
    }

    const signInGoogle = ()=> {
        store.loginWithOauth2();
    }
</script>

<style lang="scss" scoped>
    .sing-in-form {
        width: 500px;
        border: 2px solid $secondaryColor;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;

        .description-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5px;

            h2 {
                margin: 0;
                font-size: 30px;
            }

            p {
                margin: 0;
                color: $textColorLigther;
            }
        }

        .inputs-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 25px;

            .input-wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .sing-in-form__label {
                    width: 100px;
                    font-weight: bold;
                }

                .sing-in-form__input {
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    height: 30px;
                    border: 2px solid $secondaryColor;
                    border-radius: 5px;
                }

                .sing-in-form__input:focus {
                    outline: 2px solid $primaryColor;
                    outline-offset: 3px;
                }
            }
        }

        .button-anchor-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;

            a {
                color: $textColor;
                font-weight: bold;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        }

        .form__button {
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

        .form__button:hover{
            background-color: white;
        }
    }
</style>