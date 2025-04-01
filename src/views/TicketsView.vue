<script setup>
import {useTicketsStore} from "@/stores/useTicketsStore.js";

const storedTickets = useTicketsStore();
const { cancelTickets } = storedTickets;
</script>

<template>
  <h1 class="text-center mt-5">Your tickets are ready!</h1>
  <!--  Ticket details-->
  <div class="row display-flex justify-content-center mt-5">
    <div class="card col-md-4">
      <div class="card-body">
        <p class="card-title mb-4 fs-5 fw-semibold">Your Details</p>
        <div class="ticket-user-details ms-1">
          <div class="row display-flex mb-2">
            <div class="col">Name</div>
            <div class="col">Booked On</div>
          </div>
          <div class="row display-flex mb-3">
            <div class="col">{{ storedTickets.tickets[0]?.name || 'Not found' }}</div>
            <div class="col">{{ new Date(storedTickets.tickets[0]?.created_at).toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  Tickets-->
  <div class="row display-flex justify-content-center mt-4 mb-5">
    <div v-for="ticket in storedTickets.tickets" :key="ticket.id" class="card col-md-3 text-center m-2">
      <div class="card-body">
        <p class="card-title text-center mb-4 fs-4">Ticket</p>
        <div class="ticket-seats mb-3">
          <div class="card-text">Row: {{ ticket.row.name }}</div>
          <div class="card-text">Seat: {{ ticket.seat }}</div>
        </div>
        <div class="card mb-3">
          <div class="card-body text-center d-flex justify-content-center align-items-center">
            <p class="card-text">Code: <span class="fw-bold">{{ ticket.code }}</span></p>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-body text-center">
            <p class="card-text">{{ new Date(ticket.show.start).toLocaleDateString() }}</p>
            <h5 class="card-title fw-semibold fs-3">{{ ticket.show.concert.artist }}</h5>
            <p class="card-text">{{ ticket.show.concert.location.name }}</p>
            <p class="card-text mt-5">{{ new Date(ticket.show.start).toLocaleTimeString() }} - {{ new Date(ticket.show.end).toLocaleTimeString() }}</p>
          </div>
        </div>
        <button class="btn" @click="cancelTickets(ticket.id, ticket.code, ticket.name)">Cancel Ticket</button>
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
  .card {
    border: 1px solid #222222;
    border-radius: 15px;
  }
</style>