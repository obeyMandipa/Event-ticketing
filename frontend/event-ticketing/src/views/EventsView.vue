<template>
  <div >
    <h1>Browse Events</h1>
    <nav><router-link to="/admin">Admin Dashboard</router-link></nav>
    <div v-for="event in events" :key="event._id" class="event">
        <h2>{{ event.name }}</h2>
        <p>{{ event.description }}</p>
        <p>Date: {{ event.date }}</p>
        <p>Venue: {{ event.venue }}</p>
        <p>${{ event.price }}/seat ({{ event.seats.filter(s => s.available).length }} available)</p>

        <router-link :to="`/purchase/${event._id}`" class="buy-btn">Buy tickets</router-link>
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