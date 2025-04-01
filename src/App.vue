<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useConcertsStore} from "@/stores/useConcertsStore.js";
import {ref} from "vue";

const storedConcerts = useConcertsStore();
const isLoading = ref(true);
async function fetchConcerts() {
  await storedConcerts.fetchConcerts();
  isLoading.value = false;
}

fetchConcerts();
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">EuroSkills Concerts</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <div class="d-flex align-items-center" role="tickets">
          <span class="text-white">Already booked?</span>
          <button class="btn ms-2" type="submit" style="border-radius: 30px; border-color: white;" @click="$router.push(`/get-tickets`)">Get Tickets</button>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 90vh;">
      <div class="loader"></div>
    </div>
    <RouterView v-else />
  </div>
</template>

<style scoped>
.btn:hover {
  background-color: white;
  color: #222222;
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid lightblue;
  border-right-color: #222222;
  animation: l2 1s infinite linear;
}
@keyframes l2 {to{transform: rotate(1turn)}}
</style>
