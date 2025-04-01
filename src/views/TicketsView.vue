<script setup>

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
            <div class="col">xxxx xxxx</div>
            <div class="col">dd/mm/yyyy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  Tickets-->
  <div class="row display-flex justify-content-center mt-4 mb-5">
    <div class="card col-md-3 text-center m-2">
      <div class="card-body">
        <p class="card-title text-center mb-4 fs-4">Ticket</p>
        <div class="ticket-seats mb-3">
          <div class="card-text">Row: 1</div>
          <div class="card-text">Seat: 14</div>
        </div>
        <div class="card mb-3">
          <div class="card-body text-center d-flex justify-content-center align-items-center">
            <p class="card-text">Code: <span class="fw-bold">OHCZ3FADYE</span></p>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-body text-center">
            <p class="card-text">Date</p>
            <h5 class="card-title fw-semibold fs-3">Artist</h5>
            <p class="card-text">Location</p>
            <p class="card-text mt-5">Start - End</p>
          </div>
        </div>
        <button class="btn">Cancel Ticket</button>
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