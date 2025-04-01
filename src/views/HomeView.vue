<script setup>
import CardComponent from "@/components/CardComponent.vue";
import {useConcertsStore} from "@/stores/useConcertsStore.js";
import {computed, ref} from "vue";

const storedConcerts = useConcertsStore();

const artist = ref(null);
const location = ref(null);
const date = ref(null);
const shows = ref(storedConcerts.shows);


const filter = () => {
  shows.value = storedConcerts.filteredShows(artist.value, location.value, date.value);
}

const isFilterSelected = computed(() => {
  return !!artist.value || !!location.value || !!date.value;
});

const resetParams = () => {
  artist.value = null;
  location.value = null;
  date.value = null;
  shows.value = storedConcerts.filteredShows(artist.value, location.value, date.value);
}
</script>

<template>
  <h1 class="text-center mt-5">Checkout these amazing concerts in Graz.</h1>
  <div class="row mt-4 justify-content-center">
    <div class="col-md-2">
      <select class="form-select" aria-label="Default select example" style="border-radius: 15px; border-color: #222222;" v-model="artist" @change="filter">
        <option selected :value="null">All artists</option>
        <option v-for="artist in storedConcerts.artists" :key="artist" :value="artist">{{ artist }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select" aria-label="Default select example" style="border-radius: 15px; border-color: #222222;" v-model="location" @change="filter">
        <option selected :value="null">All locations</option>
        <option v-for="location in storedConcerts.locations" :key="location" :value="location">{{ location }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <input type="date" @input="filter" class="form-control" style="border-radius: 15px; border-color: #222222;" v-model="date">
    </div>
    <div class="col-md-1" v-if="isFilterSelected">
      <button class="form-control btn" @click="resetParams">Reset</button>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
    <div class="col" @click="$router.push(`/seating/${show.id}`)" v-for="show in shows" :key="show.id">
      <CardComponent
          :id="show.id"
          :artist="show.artist"
          :location="show.location"
          :start="show.start"
          :end="show.end"
      />
    </div>
  </div>

</template>

<style>
  .form-control.btn {
   background-color: #222222;
   color: white;
   border-radius: 15px;
 }

  .form-control.btn:hover {
    background-color: white;
    color: #222222;
    border-radius: 15px;
    border-color: #222222;
    transition: all 0.5s;
}
</style>


