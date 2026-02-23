<template>
  <div class="admin">
    <h1>Admin: Create Event</h1>
    <form @submit.prevent="createEvent" enctype="multipart/form-data">
        <div>
            <label for="name">Event Name:</label>
            <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="form.description" required></textarea>
        </div>
        <div>
            <label for="date">Date:</label>
            <input type="date" id="date" v-model="form.date" required />
        </div>
        <div>
            <label for="venue">Venue:</label>
            <input type="text" id="venue" v-model="form.venue" required />
        </div>
        <div>
            <label for="totalSeats">Total Seats:</label>
            <input v-model="form.totalSeats" type="number" placeholder="Total Seats" required>        </div>
        <div>
            <label for="price">Price:</label>
            <input type="number" id="price" v-model.number="form.price" step="0.01" required />
        </div>
        <input type="file" ref="image" accept="image/">
        <button type="submit">Create Event</button>
    </form>

    <h2>Existing Events</h2>
    <div v-for="event in events" :key="event._id" class="event-card">
        <h3>{{ event.name }}</h3>
        <p>{{ event.description }}</p>
        <p>Date: {{ event.date }}</p>
        <p>Venue: {{ event.venue }}</p>
        <p>seats left: {{ event.seats.filter(s => s.available).length }}</p>
    </div>
  </div>
</template>

<script>

export default {
    data () {
        return {
            events: [],
            form: {name: '', venue: '', date: '', description: '', totalSeats: 10, price: 50 },
        }
    },

    async mounted () {
        this.loadEvents()
    },

    methods: {
        async loadEvents (){
            const {data} = await this.$axios.get('/events');
            this.events = data;
        },

        async createEvent (){
            const formData = new FormData();
            Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
            if (this.$refs.image.files[0]) formData.append('image', this.$refs.image.files[0]);

            await this.$axios.post('/events', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            this.loadEvents();
            this.form = {name: '', venue: '', date: '', description: '', totalSeats: 10, price: 50 };
            alert('Event created');
        }
    }
}

</script>
    
<style>

.admin { 
        max-width: 800px; 
        margin: 0 auto; 
    }
    .event-card { 
        border: 1px solid #ccc;
        padding: 10px; margin: 10px 0; 
    }
    
</style>