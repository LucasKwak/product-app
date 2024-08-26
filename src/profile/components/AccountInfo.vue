<template>
    <h2>Account info</h2>
    <div v-if="loading" class="spinner"></div>
    <div v-else class="info-wrapper">
        <p><span class="info-title">Uid:</span> {{ user.uid }}</p>
        <p><span class="info-title">Name:</span> {{ user.name }}</p>
        <p><span class="info-title">Username:</span> {{ user.username }}</p>
        <p><span class="info-title">Role:</span> {{ user.role }}</p>
        <p><span class="info-title">Operations:</span> {{ user.operations }}</p>
    </div>
</template>

<script lang="ts" setup>
    import IUser from '@/util/interfaces/IUser';
    import { useAuthStore } from '@/util/store/auth';
    import { onMounted,  Ref, ref } from 'vue';
    import router from "@/util/router";

    const store = useAuthStore();
    const user:Ref<IUser> = ref({});
    let loading:Ref<boolean> = ref(true);

    onMounted(
        async () => {
            const uri = `${store.baseURL}/auth/profile`;
            try {

                const rawResponse = await fetch(uri, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });

                if (rawResponse.status == 401) {
                    store.setIsAuthenticated(false);
                    await router.push("/sign-in");
                    return null;
                }

                // Verificar el codigo de estado de la respuesta HTTP (cualquier otro error)
                if (rawResponse.status !== 200) {
                    const errorResponse = await rawResponse.json();
                    console.error(errorResponse.message);
                    return null;
                }

                const response = await rawResponse.json();

                user.value = {
                    uid: response.id,
                    name: response.name,
                    username: response.username,
                    role: response.role,
                    operations: response.operations,
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                return null;
            } finally {
                loading.value = false;
            }
        }
    );
</script>

<style lang="scss" scoped>

    h2 {
        font-size: 30px; 
    }

    .info-wrapper {
        display: flex;
        flex-direction: column;
        border: 2px solid $secondaryColor;
        border-radius: 15px;
        padding: 20px;
        gap: 25px;

        p {
            margin: 0;
        }

        .info-title {
            font-weight: bold;
        }
    }

    .spinner {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        margin: auto; /* Center the spinner */
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>