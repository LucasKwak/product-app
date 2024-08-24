import { defineStore } from "pinia";
import IUser from "@/util/interfaces/IUser";

export const useAuthStore = defineStore(
    "auth",
    {
        state: () => ({
            isAuthenticated: false, // Definimos jwt como string o null
            baseURL: "http://localhost:9191/my-backend",
        }),
        actions: {
            async register(name:string, lastname: string, username:string, email:string, password:string): Promise<boolean> {
                const uri = `${this.baseURL}/customers`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify({
                            name: `${name} ${lastname}`,
                            username: username,
                            password: password,
                            email: email,
                            authProvider: "NORMAL",
                        }),
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 201) {
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return false;
                    }

                    // Establecemos que el usuario esta autenticado
                    this.isAuthenticated = true;
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
                        credentials: 'include',
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

                    // Establecemos que el usuario esta autenticado
                    this.isAuthenticated = true;
                    return true;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            },
            loginWithOauth2(): void {
                const googleAuthUrl = "http://localhost:9191/my-backend/oauth2/authorization/google";
                window.location.href = googleAuthUrl;
            },
            async logOut(): Promise<boolean> {
                const uri = `${this.baseURL}/auth/logout`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 200) {
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return false;
                    }

                    // Establecemos que el usuario ya no esta autenticado
                    this.isAuthenticated = false;
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
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
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
            async validateToken(): Promise<void> {
                const uri = `${this.baseURL}/auth/validate-token`;
                try {
                    const rawResponse = await fetch(uri, {
                        method: "GET",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                    });

                    // Verificar el codigo de estado de la respuesta HTTP
                    if (rawResponse.status !== 200) {
                        this.isAuthenticated = false;
                        const errorResponse = await rawResponse.json();
                        console.error(errorResponse.message);
                        return;
                    }

                    const value = await rawResponse.json();

                    // Establecemos que el usuario esta autenticado
                    this.isAuthenticated = value;
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    this.isAuthenticated = false;
                }

            },
            setIsAuthenticated(yesOrNo:boolean): void {
                this.isAuthenticated = yesOrNo;
            },
        }
    }
)