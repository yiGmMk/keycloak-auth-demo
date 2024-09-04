<script setup lang="ts">
import { userAuthStore } from '../stores/user';

const $authStore = userAuthStore();
</script>

<template>
  <div class="home">
    <h1>account</h1>
    <p class="account-info">user: test password: test</p>
    <div class="auth-buttons">
      <div v-if="!$authStore.token">
        <button @click="$authStore.login()">Log in</button>
      </div>
      <div v-else>
        <p>Welcome, {{ $authStore.user.sub }}!</p>
        <button @click="$authStore.logout()">Log out</button>
      </div>
    </div>
    <!-- Add your home page content here -->
  </div>
</template>

<style scoped>
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
