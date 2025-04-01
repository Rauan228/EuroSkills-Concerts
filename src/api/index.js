import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://apic.polytech.kz/api/v1',
})
