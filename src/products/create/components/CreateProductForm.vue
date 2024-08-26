<template>
    <form class="create-product-form">
        <div class="description-wrapper">
            <h2>Create a New Product</h2>
            <p>Enter the details below</p>
        </div>

        <div class="inputs-wrapper">
            <div class="input-wrapper">
                <label class="create-product-form__label" for="inputName">Name</label>
                <input class="create-product-form__input" type="text" id="inputName" placeholder="New product" v-model="name">
            </div>
            <div class="input-wrapper">
                <label class="create-product-form__label" for="inputLastName">Price</label>
                <input class="create-product-form__input" type="text" id="inputLastName" placeholder="35" v-model="price">
            </div>
            <div class="input-wrapper">
                <label class="create-product-form__label" for="category-options">Elige una opción:</label>
                <select class="create-product-form__input" id="category-options" v-model="category">
                    <option value="1">Electrónica</option>
                    <option value="2">Ropa</option>
                    <option value="3">Deportes</option>
                    <option value="4">Hogar</option>
                    <option value="5">Juguetes</option>
                </select>
            </div>
        </div>
        <button class="form__button" type="submit" @click.prevent="createProduct">Create Product</button>
    </form>
</template>

<script lang="ts" setup>
    import { Ref, ref } from "vue";
    import { useAuthStore } from '@/util/store/auth';
    import router from '@/util/router';

    const store = useAuthStore();

    let name:Ref<string> = ref('');
    let price:Ref<string> = ref('');
    let category:Ref<string> = ref('');

    const createProduct = async ()=> {
        const uri = `${store.baseURL}/products`;

        try {
            const rawResponse = await fetch(uri, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: name.value,
                    price: price.value,
                    categoryId: category.value,
                }),
            });

            if (rawResponse.status == 401) {
                store.setIsAuthenticated(false);
                await router.push("/sign-in");
                return;
            }

            // Verificar el codigo de estado de la respuesta HTTP
            if (rawResponse.status !== 201) {
                const errorResponse = await rawResponse.json();
                console.error(errorResponse.message);
            }
            name.value = '';
            price.value = '';
            category.value= '';
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }
</script>

<style lang="scss" scoped>
    .create-product-form {
        width: 500px;
        border: 2px solid $secondaryColor;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;

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

                .create-product-form__label {
                    font-weight: bold;
                }

                .create-product-form__input {
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    height: 30px;
                    border: 2px solid $secondaryColor;
                    border-radius: 5px;
                }

                .create-product-form__input:focus {
                    outline: 2px solid $primaryColor;
                    outline-offset: 3px;
                }
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