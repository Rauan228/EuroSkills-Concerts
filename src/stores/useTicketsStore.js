import { ref } from 'vue'
import { defineStore } from 'pinia'
import {api} from "@/api/index.js";

export const useTicketsStore = defineStore('tickets', () => {
    const tickets = ref([]);

    async function fetchTickets(code, name) {
        const response = await api.post('/tickets', {
            code,
            name,
        });
        tickets.value = response.data.tickets;
    }
    async function cancelTickets(ticketId, code, name) {
        const response = await api.post(`/tickets/${ticketId}/cancel`, {
            code,
            name,
        });
        if (response.status === 204) {
            tickets.value = tickets.value.filter(ticket => ticket.id !== ticketId);
        }
    }
    return {
        tickets,
        cancelTickets,
        fetchTickets,
    }
})