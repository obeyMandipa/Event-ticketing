<template>
  <div class="admin ">
    <h1 class=" text-[50px] font-bold text-blue-400">Admin: Create Event</h1>
    <form @submit.prevent="createEvent" enctype="multipart/form-data" class=" w-auto  space-y-5">
        <div class="flex justify-between ">
            <span class="form space-y-4 ">
                <div>
                    <div for="name">Event Name </div>
                    <input class="input border-2 border-gray-300 w-[500px] align-left" placeholder="hey"  type="text" id="name" v-model="form.name" required />
                </div>
                <div>
                    <div for="description">Description:</div>
                    <textarea class="textarea border-1 border-gray-300 w-[500px]" id="description" v-model="form.description" required></textarea>
                </div>
                <div>
                    <div for="date">Date:</div>
                    <input class="input border-2 border-gray-300 w-[500px] " type="datetime-local"  id="date" v-model="form.date" required />
                </div>
                <div>
                    <div for="venue">Venue:</div>
                    <input class="input border-2 border-gray-300 w-[500px]" type="text" id="venue" v-model="form.venue" required />
                </div>
                <div>
                    <div for="totalSeats">Total Seats:</div>
                    <input class="input border-2 border-gray-300 w-[500px]" v-model="form.totalSeats" type="number" " required>        
                </div>
                <div>
                    <div for="price">Price:</div>
                    <input class="input border-2 border-gray-300 w-[500px]" type="number" id="price" v-model.number="form.price" step="0.01" required />
                </div>
            </span>
            <span class="flex border m-auto w-[800px] h-[300px] justify-center items-center">
                <input class="file-input file-input-ghost border-2 border-gray-300  " type="file" ref="image" accept="image/">
            </span>
        </div>
        
        <div class="flex space-x-5">
            <button type="submit" class="btn ">Create Event</button>
            <nav><router-link to="/" class="btn">Browse events</router-link></nav>    
        </div>
        
    </form>


    

    <!-- <h2>Existing Events</h2>
    <div v-for="event in events" :key="event._id" class="event-card">
        <h3>{{ event.name }}</h3>
        <p>{{ event.description }}</p>
        <p>Date: {{ event.date }}</p>
        <p>Venue: {{ event.venue }}</p>
        <p>seats left: {{ event.seats.filter(s => s.available).length }}</p>
    </div> -->
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
        margin: 0 auto; 
        /* background-color: blue; */
    }
    /* .event-card { 
        border: 1px solid #ccc;
        padding: 10px; margin: 10px 0; 
    } */
    
</style>