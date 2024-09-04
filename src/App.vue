<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { userAuthStore } from './stores/user';

const $authStore = userAuthStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Keycloak Demo" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <p class="account-info">account: test password: test</p>
      <div class="auth-buttons">
        <div v-if="!$authStore.token">
          <button @click="$authStore.login()">Log in</button>
        </div>
        <div v-else>
          <p>Welcome, {{ $authStore.user.sub }}!</p>
          <button @click="$authStore.logout()">Log out</button>
        </div>
      </div>
    </div>
  </header>
  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    justify-content: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.account-info {
  text-align: center;
  width: 100%;
  margin-top: 1rem;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.auth-buttons button {
  padding: 0.5rem 1rem;
}
</style>
