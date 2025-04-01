<script setup>
import CardComponent from "@/components/CardComponent.vue";
import {useSeatingStore} from "@/stores/useSeatingStore.js";
import {useRoute} from "vue-router";

const route = useRoute();
const storedSeating = useSeatingStore();

storedSeating.setSelectedShow(route.params.id);
storedSeating.fetchSeating();

async function initSeating() {
  if(!storedSeating.selectedShow) {
    storedSeating.setSelectedShow(route.params.id);
    storedSeating.fetchSeating();
  } else if(storedSeating.selectedShow.id != route.params.id) {
    await storedSeating.resetReservation();
    storedSeating.setSelectedShow(route.params.id);
    storedSeating.fetchSeating();
  }
}
initSeating();

function selectSeat(event) {
  const target = event.target;
  if(!target.dataset.seat || target.classList.contains('hall-row__seat--occupied')) {
    return;
  }
  const seat = target.dataset.seat;
  const row = target.closest('div[data-row]').dataset.row;
  target.classList.toggle('hall-row__seat--selected');
  storedSeating.selectSeat(row, seat);
}
</script>

<template>
  <h1 class="text-center mt-5">Book seats for your show</h1>
  <div class="row d-flex justify-content-center mt-4">
    <div class="col-3">
      <CardComponent
          :id="storedSeating.selectedShow.id"
          :artist="storedSeating.selectedShow.artist"
          :location="storedSeating.selectedShow.location"
          :start="storedSeating.selectedShow.start"
          :end="storedSeating.selectedShow.end"
      />
    </div>
  </div>
  <div class="row mt-5 mb-5 d-flex justify-content-center">
    <div class="col-md-8 seating justify-content-center me-3">
      <div class="showcase-container d-flex justify-content-center mt-2">
        <ul class="showcase justify-content-center">
          <li>
            <div class="hall-row__seat me-1"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="hall-row__seat--selected me-1"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="hall-row__seat--occupied me-1"></div>
            <small>Occupied</small>
          </li>
        </ul>
      </div>
      <div class="stage">Stage</div>
      <div class="hall" @click="selectSeat">
        <div class="hall-row"
             v-for="row in storedSeating.rows"
             :key="row.id"
             :data-row="row.id">
          <div class="hall-row__name">{{ row.name }}</div>
          <div class="hall-row__seats">
            <div v-for="seat in row.seats.total"
                 :key="`${row.id}`+seat"
                 :data-seat="seat"
                 class="hall-row__seat"
                 :class="{
                   'hall-row__seat--occupied': row.seats.unavailable.includes(seat),
                   'hall-row__seat--selected': storedSeating.selectedSeats.findIndex((item) => item.row == row.id && item.seat == seat) !== -1
                 }">{{ seat }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 seating">
      <p class="text-center mt-3 fs-4">Selected seats</p>
      <div class="bookedSeats" style="margin-top: 70px;">
        <div class="text-center"
             v-for="place in storedSeating.selectedSeats"
             :key="`${place.row}` + place.seat">Row: {{ storedSeating.rows.find((items) => items.id == place.row).name }}, Seat: {{ place.seat }}</div>
      </div>
      <p class="text-center" style="margin-top: 70px">Your seats expire in 02:35</p>
      <div class=" d-flex justify-content-center mb-4" style="margin-top: 80px;">
        <button class="btn" v-if="storedSeating.selectedSeats.length" @click="$router.push(`/booking`)">Enter booking details</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn {
    color: white;
    background-color: #222222;
  }

  .btn:hover {
    border: 1px solid #222222;
    color: #222222;
    background-color: white;
    transition: all 0.5s;
  }

  * {
    box-sizing: border-box;
  }

  .showcase {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 5px;
    color: #777;
    list-style-type: none;
    display: inline-flex;
  }

  .showcase li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }

  .showcase li small {
    margin-left: 2px;
  }

  .stage {
    background-color: #222222;
    color: white;
    width: 30%;
    padding: 1rem;
    text-align: center;
    border-radius: 15px;
    margin: 20px auto;
    box-shadow: 0 15px 40px rgb(0, 0, 0);
  }

  .seating {
    border: 1px solid black;
    border-radius: 20px;
  }

  .hall-row__seat--occupied {
    border-radius: 50%;
    color: red;
    background-color: rgba(255, 0, 0, 0.3);
    border: 1px solid red !important;
    width: 20px;
    height: 20px;
    margin-left: 1px;
  }

  .hall-row__seat--selected {
    border-radius: 50%;
    background-color: #222222;
    width: 20px;
    height: 20px;
    margin-left: 1px;
    cursor: default;
    color: white;
  }

  .hall {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: thin;
  }

  .hall-row {
    display: flex;
    flex-shrink: 0;
  }

  .hall-row__name {
    white-space: nowrap;
  }

  .hall-row__seats {
    display: flex;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .hall-row__seat {
    border-radius: 50%;
    border: 1px solid black;
    width: 20px;
    height: 20px;
    margin-left: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    cursor: default;
  }
</style>