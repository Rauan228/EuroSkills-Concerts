<script setup>
defineProps({
  artist: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card h-100">
    <div class="card-body text-center">
      <p class="card-text">{{ start.toLocaleDateString() }}</p>
      <h5 class="card-title fw-semibold fs-3">{{ artist }}</h5>
      <p class="card-text">{{ location }}</p>
      <p class="card-text mt-5">{{ start.toLocaleTimeString() }} - {{ end.toLocaleTimeString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  background-color: #222222;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
}
.card {
  border-radius: 15px;
  border-color: #222222;
}
</style>
