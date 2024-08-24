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
    import { onMounted, onUnmounted,  Ref, ref } from 'vue';

    const store = useAuthStore();
    const user:Ref<IUser> = ref({});
    let loading:Ref<boolean> = ref(true);

    onMounted(
        async () => {
            user.value = await store.getAccountInfo();
            loading.value = false;
        }
    );

    onUnmounted(
        () => {
            console.log('Deactivated');
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