<script setup>
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const storedTickets = useTicketsStore()

let name = ''
let code = ''

async function fetchTickets() {
	const response = await storedTickets.fetchTickets(code, name)
	router.push('/tickets')
}
</script>

<template>
	<h1 class="text-center my-5">Retrieve your tickets.</h1>
	<div class="row display-flex justify-content-center">
		<div class="card col-md-4">
			<div class="card-body">
				<form @submit.prevent="fetchTickets" action="" class="p-3">
					<label for="name" class="mb-2">Name</label>
					<input
						v-model="name"
						class="form-control mb-3"
						type="text"
						id="name"
					/>
					<label for="name" class="mb-2">Code</label>
					<input v-model="code" class="form-control" type="text" id="name" />
					<div class="text-center mt-4">
						<button class="btn">Get Ticket</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
.card {
	border: 1px solid #222222;
	border-radius: 15px;
}

input {
	border-color: #222222;
	border-radius: 15px;
}

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
</style>
`
