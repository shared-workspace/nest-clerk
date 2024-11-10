<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useAuth } from 'vue-clerk';
import {
  // RouterLink,
  RouterView
} from 'vue-router'
const { getToken } = useAuth();
const isFetching = ref(false);

const getData = async () => {
  console.log('fetching data');
  const token = await getToken.value();
  if (!token) {
    console.log('token not defined');
    return;
  }

  console.log('token', token);
  const fetchResult = await useFetch<{ message: string }>('https://musical-goldfish-979vpgr75vvv3r7w-3000.app.github.dev/api/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }, {
    timeout: 5_000,
    onFetchError: (err) => {
      console.log('error fetching data', err);
      return {};
    },
  });
  console.log('fetchResult', fetchResult.data.value);
};
</script>

<template>
  <SignedOut>
    <SignInButton />
  </SignedOut>
  <SignedIn>
    <SignOutButton /> <br />
    <UserButton /> <br />
    <button @click="getData" :disabled="isFetching">Fetch Data</button>
  </SignedIn>
  <RouterView />
</template>

<style>
.cl-userButtonPopoverFooter {
  display: none;
}
</style>
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
