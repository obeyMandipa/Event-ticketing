<template>
  <div >
    <h1 class=" text-[50px] font-bold text-blue-400">Events</h1>
    <nav><router-link class="" to="/admin">Admin Dashboard</router-link></nav>
    <div v-for="event in events" :key="event._id" class="event shadow-lg">
    
        <h2 class="text-[30px] text-blue-400">{{ event.name }}</h2>
        <p>{{ event.description }}</p>
        <p class="text-[20px]">Date: {{ event.date }}</p>
        <p>Venue: {{ event.venue }}</p>
        <p>${{ event.price }}/seat ({{ event.seats.filter(s => s.available).length }} available)</p>

        <div class="space-x-3">
            <button class="btn">View event</button>
            <router-link class="btn " :to="`/purchase/${event._id}`">Buy tickets</router-link>
        </div>

    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            events: [],
        }
    },

    async mounted () {
        const {data} = await this.$axios.get('/events');
        this.events = data;
    },
}

</script>

<style>
.event { 
    border: 1px solid #ddd;
     padding: 20px;
      margin: 20px 0; 
    }
.buy-btn {
    background: #007bff;
    color: white; 
    padding: 10px 20px; 
    text-decoration: none; 
}
</style>