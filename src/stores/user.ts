import { defineStore } from 'pinia'
import Keycloak from 'keycloak-js'
import type { KeycloakTokenParsed } from 'keycloak-js';

export interface UserState {
    token: string;
    user: KeycloakTokenParsed;
    initialized: boolean;
}

export const userAuthStore = defineStore('auth', {
    state: (): UserState => ({
        token: "",
        user: {} as KeycloakTokenParsed,
        initialized: false
    }),
    actions: {
        async initialize() {
            // 在此处初始化 Keycloak
            const auth = new Keycloak({
                url: (import.meta.env.VITE_KeycloakUrl || 'http://localhost:10200'),
                realm: (import.meta.env.VITE_KeycloakRealm || 'master'),
                clientId: (import.meta.env.VITE_KeycloakClientId || "default"),
            });
            try {
                await auth.init({ onLoad: 'login-required' });
                if (auth.authenticated) {
                    this.token = auth.token ? auth.token : "";
                    this.user = auth.tokenParsed ? auth.tokenParsed : {};
                }
                this.initialized = true;
            } catch (error) {
                console.error('Failed to initialize Keycloak', error);
            }
        },
        async login() {
            // 在此处处理登录逻辑
            const auth = new Keycloak({
                url: (import.meta.env.VITE_KeycloakUrl || 'http://localhost:8080'),
                realm: (import.meta.env.VITE_KeycloakRealm || 'master'),
                clientId: (import.meta.env.VITE_KeycloakClientId || "default"),
            });
            try {
                await auth.init({ onLoad: 'login-required' });
                if (auth.authenticated) {
                    this.token = auth.token ? auth.token : "";
                    this.user = auth.tokenParsed ? auth.tokenParsed : {};
                }
            } catch (error) {
                console.error('Failed to log in with Keycloak', error);
            }
        },
        async logout() {
            // 在此处处理注销逻辑
            const auth = new Keycloak({
                url: (import.meta.env.VITE_KeycloakUrl || 'http://localhost:8080'),
                realm: (import.meta.env.VITE_KeycloakRealm || 'master'),
                clientId: (import.meta.env.VITE_KeycloakClientId || "default"),
            });
            try {
                await auth.init({ onLoad: 'check-sso' });
                if (auth.authenticated) {
                    await auth.logout();
                }
            } catch (error) {
                console.error('Failed to log out from Keycloak', error);
            } finally {
                this.token = "";
                this.user = {};
            }
        }
    }
});
