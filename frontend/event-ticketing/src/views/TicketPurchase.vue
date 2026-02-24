<template>
  <div >
    <router-link to="/">Back to events</router-link>
    <h1>Ticket Purchase</h1>

    <div v-if="event">
        <h2>{{ event.name }} @ {{ event.venue }}</h2>
        <form @submit.prevent="buyTickets" >
            <input v-model="form.name" placeholder="full name" required>
            <input v-model="form.email" type="email" placeholder="email" required>


            <p v-if="!selectedSeat" class="error">Select a seat</p>
            
            <div class="seats">
                <button v-for="seat in availableSeats" :key="seat.id" 
                    @click="selectedSeat = seat.id"
                    :class = "{selected: selectedSeat === seat.id}"
                    type="button"
                >
                {{ seat.id }} - ${{seat.price}}
                </button>
            </div>

           
            <button type="submit" :disabled="!selectedSeat">Buy & Download Ticket (${{ event.price }})</button>
        </form>

        <!-- QR code display  -->
        <div v-if="ticket">
            <h3>Yourticket</h3>
            <p>{{ ticket.userName }}- {{ ticket.seatId }}</p>
            <img :src="ticket.qrCodeUrl" alt="QR TIcket">
            <a :href="ticket.qrCodeUrl" download="ticket.png">Download QR Code</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            event: null,
            events: [],
            availableSeats: [],
            selectedSeat: '',
            form: {name: '', email: ''},
            ticket: null,
        }
    },

    async mounted () {
        // use the ID passed through the route
        const {data} = await this.$axios.get(`/events/${this.$route.params.eventId}`);
        this.event = data;
        this.availableSeats = data.seats.filter(s => s.available);
    },

    methods: {
        async buyTickets (){
            if (!this.selectedSeat) return;

            try {
                const {data} = await this.$axios.post(`/purchase/${this.event._id}/${this.selectedSeat}`, this.form);
                if (data.success) {
                    this.ticket = { userName: this.form.name, seatId: this.selectedSeat, qrCodeUrl: data.qrCodeData };
                } else {
                    alert(data.error || 'Ticket purchase failed');
                }
            } catch (err) {
                console.error('purchase error', err);
                alert('Purchase failed: ' + (err.response?.data?.error || err.message));
            }
        }
    }
}

</script>

<style>
.seats button {
     margin: 5px; 
     padding: 10px; 
    }

.selected {
    background: #28a745 !important; 
    color: white; 
}
.error {
    color: red; 
}

img { 
    max-width: 200px; 
}
</style>