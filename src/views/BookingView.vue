<script setup>
import CardComponent from "@/components/CardComponent.vue";
import {useSeatingStore} from "@/stores/useSeatingStore.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const storedSeating = useSeatingStore();
const name = ref('');
const address = ref('');
const zip = ref('');
const city = ref('');
const country = ref('');
const router = useRouter();

const booking = async () => {
  if(name.value && address.value && city.value && country.value && zip.value) {
    await storedSeating.booking({
      name: name.value,
      address: address.value,
      city: city.value,
      country: country.value,
      zip: zip.value,
    });
    router.push('/tickets');
  }
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
    <div class="col-md-3 seating justify-content-center me-3">
      <p class="text-center mt-3 fs-4">Selected seats</p>
      <div class="bookedSeats" style="margin-top: 70px;">
        <div class="text-center">Row: Stall 03, Seat: 6</div>
        <div class="text-center">Row: Stall 03, Seat: 7</div>
      </div>
      <p class="text-center" style="margin-top: 70px">Your seats expire in 02:35</p>
      <div class=" d-flex justify-content-center mb-4" style="margin-top: 80px;">
        <button class="btn" @click="$router.push('/seating/'+storedSeating.selectedShow.id)">Change details</button>
      </div>
    </div>
    <div class="col-md-8 seating">
      <div class="row">
        <p class="text-start mt-3 ms-3 fs-4">Please enter your details</p>
        <div class="col-12 mb-3">
          <div class="row">
            <div class="col-6">
              <form class="px-3" action="">
                <label for="name" class="pb-2">Name</label>
                <input v-model="name" class="form-control" type="text" id="name">
                <label for="name" class="py-2">Address</label>
                <input v-model="address" class="form-control" type="text" id="name">
                <div class="row">
                  <div class="col-4">
                    <label for="name" class="py-2">ZIP Code</label>
                    <input v-model="zip" class="form-control" type="text" id="name">
                  </div>
                  <div class="col-8">
                    <label for="name" class="py-2">City</label>
                    <input v-model="city" class="form-control" type="text" id="name">
                  </div>
                </div>
                <label for="name" class="py-2">Country</label>
                <select v-model="country" class="form-select">
                  <option selected value="">Country</option>
                  <option>Albania</option>
                  <option>Andorra</option>
                  <option>Armenia</option>
                  <option>Austria</option>
                  <option>Azerbaijan</option>
                  <option>Belarus</option>
                  <option>Belgium</option>
                  <option>Bosnia and Herzegovina</option>
                  <option>Bulgaria</option>
                  <option>Croatia</option>
                  <option>Cyprus</option>
                  <option>Czech Republic</option>
                  <option>Denmark</option>
                  <option>Estonia</option>
                  <option>Finland</option>
                  <option>France</option>
                  <option>Georgia</option>
                  <option>Germany</option>
                  <option>Greece</option>
                  <option>Hungary</option>
                  <option>Iceland</option>
                  <option>Ireland</option>
                  <option>Italy</option>
                  <option>Kazakhstan</option>
                  <option>Kosovo</option>
                  <option>Latvia</option>
                  <option>Liechtenstein</option>
                  <option>Lithuania</option>
                  <option>Luxembourg</option>
                  <option>Malta</option>
                  <option>Moldova</option>
                  <option>Monaco</option>
                  <option>Montenegro</option>
                  <option>Netherlands</option>
                  <option>North Macedonia</option>
                  <option>Norway</option>
                  <option>Poland</option>
                  <option>Portugal</option>
                  <option>Romania</option>
                  <option>Russia</option>
                  <option>San Marino</option>
                  <option>Serbia</option>
                  <option>Slovakia</option>
                  <option>Slovenia</option>
                  <option>Spain</option>
                  <option>Sweden</option>
                  <option>Switzerland</option>
                  <option>Turkey</option>
                  <option>Ukraine</option>
                  <option>United Kingdom</option>
                  <option>Vatican City</option>
                </select>
              </form>
            </div>
            <div class="col-6">
              <div class="row booking-text">
                <div class="d-flex text-center" style="margin-top: 90px; margin-bottom: 90px;">
                  By clicking "Book" you accept that you are not actually booking a
                  ticket as this is a test project and not a real website
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <button class="btn light me-4" style="font-size: 13px;">
                    Your ticket will be available<br>
                    immediately after booking.
                  </button>
                  <button class="btn px-5" @click="booking">Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  .btn.light {
    border: 1px solid #222222;
    color: #222222;
    background-color: white;
  }

  .btn.light:hover {
    color: white;
    background-color: #222222;
    transition: all 0.5s;
  }

  * {
    box-sizing: border-box;
  }

  .seating {
    border: 1px solid #222222;
    border-radius: 20px;
  }

  form {
    border-right: 1px solid #222222;
  }

  input {
    border-color: #222222;
    border-radius: 15px;
  }

  select {
    border-color: #222222;
    border-radius: 10px;
  }

  .booking-text {
    display: flex;
    flex-direction: column;
  }
</style>