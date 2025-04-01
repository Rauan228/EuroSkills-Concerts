import { ref } from 'vue'
import { defineStore } from 'pinia'
import {api} from "@/api/index.js";

export const useTicketsStore = defineStore('tickets', () => {
    const tickets = ref([]);

    return {
        tickets,
    }
})