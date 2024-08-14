import { defineStore } from "pinia";

export const useAuthStore = defineStore(
    "auth",
    {
        state: () => {
            return {
                jwt: null,
                baseURL: "http://localhost:9191/api/v1",
            }
        },
        getters: {
            hasJwt: (state) => {
                return !!state.jwt
            }
        },
        actions: {
            async register(name:string, lastname: string, username:string, password:string): Promise<boolean> {
                const uri = `${this.baseURL}/customers`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            name: `${name} ${lastname}`,
                            username: username,
                            password: password,
                            repeatPassword: password,
                        }),
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 201) {
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return false;
                    }

                    const response = await rawResponse.json();
                    this.jwt = response.jwt;
                    return true;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            }
        }
    }
)