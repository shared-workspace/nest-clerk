<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import HelloWorld from "./components/HelloWorld.vue";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from 'vue-clerk'
const { getToken, isLoaded, isSignedIn } = useAuth()
const getData = async () => {
  const token = await getToken.value();
  if (!token) console.log('token not defined');
  const { isFetching, data, error } = useFetch('/api/data')
}
</script>

<template>
  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignedIn>
    <UserButton />
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </SignedIn>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
