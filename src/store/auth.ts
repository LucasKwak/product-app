import { defineStore } from "pinia";
import IUser from "@/interfaces/IUser";

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
            },
            async logIn(username:string, password:string): Promise<boolean> {
                const uri = `${this.baseURL}/auth/authenticate`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                        }),
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 200) {
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
            },
            async logOut(): Promise<boolean> {
                const uri = `${this.baseURL}/auth/logout`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${this.jwt}`,
                        },
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 200) {
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return false;
                    }

                    this.jwt = null;
                    return true;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            },
            async getAccountInfo(): Promise<IUser|null> {
                const uri = `${this.baseURL}/auth/profile`;
                try {
                    let user:IUser = {};

                    const rawResponse = await fetch(uri, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${this.jwt}`,
                        },
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 200) {
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return null;
                    }
                    const response = await rawResponse.json();

                    user = {
                        uid: response.id,
                        name: response.name,
                        username: response.username,
                        role: response.role,
                        operations: response.operations,
                    }
                    return user;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return null;
                }
            },

        }
    }
)