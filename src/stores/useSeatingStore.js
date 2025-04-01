import { ref } from 'vue'
import { defineStore } from 'pinia'
import {api} from "@/api/index.js";
import {useConcertsStore} from "@/stores/useConcertsStore.js";
import {useTicketsStore} from "@/stores/useTicketsStore.js";

export const useSeatingStore = defineStore('seating', () => {
    const selectedShow = ref(null);
    const concertsShow = useConcertsStore();
    const storedTickets = useTicketsStore();
    const rows = ref([]);
    const selectedSeats = ref([]);
    const token = ref(null);

    function setSelectedShow(id) {
        selectedShow.value = concertsShow.findShowById(id);
    }

    async function reservation() {
        const body = {
            reservations: selectedSeats.value,
        };
        if (token.value) {
            body.reservation_token = token.value;
        }

        const response = await api.post(`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/reservation`, body);
        token.value = response.data.reservation_token;
    }

    async function fetchSeating() {
        const response = await api.get(`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/seating`);
        rows.value = response.data.rows;
    }

    function selectSeat(row, seat) {
        const index = selectedSeats.value.findIndex((item) => item.row == row && item.seat == seat)
        if(index == -1) {
            selectedSeats.value.push({row, seat});
        } else {
            selectedSeats.value.splice(index, 1);
        }
        reservation();
    }

    function resetReservation() {
        selectedSeats.value = [];
        reservation();
        token.value = null;
    }

    async function booking(userData) {
        userData.reservation_token = token.value;
        const response = await api.post(`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/booking`, userData);
        storedTickets.tickets = response.data.tickets;
        selectedSeats.value = [];
        token.value = null;
    }

    return {
        selectedShow,
        setSelectedShow,
        selectedSeats,
        rows,
        fetchSeating,
        selectSeat,
        resetReservation,
        booking,
    }
})