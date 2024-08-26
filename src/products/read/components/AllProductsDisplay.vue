<template>
    <UpdateModal v-if="isModalOpen"
                 :product-id="productIdModal"
                 :product-name="productNameModal"
                 @close-modal="closeUpdateModal"
                 @update-product="updateProduct"
    ></UpdateModal>
    <div class="products-wrapper" @scroll="handleScroll">
        <div v-if="loading" class="spinner"></div>
        <ProductDetails v-for="(product, index) in productArray" :key="index"
                        :id="product.id"
                        :name="product.name"
                        :category="product.category.name"
                        :category-id="product.category.id"
                        :price="product.price"
                        @open-update-product-modal="openUpdateModal"
        ></ProductDetails>
    </div>
</template>

<script lang="ts" setup>
    import ProductDetails from "@/products/read/components/ProductDetails.vue";
    import IProduct from "@/util/interfaces/IProduct";
    import { useAuthStore } from "@/util/store/auth";
    import { Ref, ref, onMounted } from 'vue';
    import router from "@/util/router";
    import UpdateModal from "@/products/update/components/UpdateModal.vue";


    const store = useAuthStore();
    let productArray:Ref<Array<IProduct>> = ref([]);
    let currentPage:Ref<number> = ref(0);
    let totalPages:Ref<number> = ref(1);
    let pageSize:Ref<number> = ref(15);
    let loading:Ref<boolean> = ref(true);


    async function loadMoreProducts(): void {
        if (currentPage.value < totalPages.value) {
            loading.value = true;
            try {
                const uri = `${store.baseURL}/products?page=${currentPage.value}&size=${pageSize.value}`;
                const rawResponse = await fetch(uri, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                });

                if (rawResponse.status == 401) {
                    store.setIsAuthenticated(false);
                    await router.push("/sign-in");
                    return null;
                }

                // Verificar el codigo de estado de la respuesta HTTP
                if (rawResponse.status !== 200) {
                    const errorResponse = await rawResponse.json();
                    console.error(errorResponse.message);
                    console.error(errorResponse.backendMessage);
                    return;
                }

                const data = await rawResponse.json();
                productArray.value.push(...data.content);

                totalPages.value = data.totalPages;
                currentPage.value += 1;
            } catch (error) {
                console.error('Error:', error);
            } finally {
                loading.value = false;
            }
        }
    }

    function handleScroll(event: Event): void {
        const target = event.target as HTMLElement;
        const bottomReached = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (bottomReached) {
            loadMoreProducts(); // Cargar más productos si se ha llegado al final
        }
    }

    let productIdModal = 0;
    let productNameModal = "Some product";
    let categoryIdModal = "Some category id";
    let isModalOpen:Ref<boolean> = ref(false);

    function openUpdateModal(productId: number, productName: string, categoryId: string): void {
        productIdModal = productId;
        productNameModal = productName;
        categoryIdModal = categoryId;
        isModalOpen.value = true;
    }

    function closeUpdateModal(): void {
        isModalOpen.value = false;
    }

    const updateProduct = async (newPrice: string)=> {
        const uri = `${store.baseURL}/products/${productIdModal}`;

        try {
            const rawResponse = await fetch(uri, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: productNameModal,
                    price: newPrice,
                    categoryId: categoryIdModal,
                }),
            });

            if (rawResponse.status == 401) {
                store.setIsAuthenticated(false);
                await router.push("/sign-in");
                return;
            }

            // Verificar el codigo de estado de la respuesta HTTP
            if (rawResponse.status !== 200) {
                const errorResponse = await rawResponse.json();
                console.error(errorResponse.message);
            }
            closeUpdateModal();
            window.location.reload();
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }

    onMounted(
        () => {
            loadMoreProducts();
        }
    )
</script>

<style lang="scss" scoped>
    .products-wrapper {
        height: 650px;
        overflow-y: scroll;
        border: 2px solid $secondaryColor;
        border-radius: 15px;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        box-sizing: border-box;
        padding: 20px;
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