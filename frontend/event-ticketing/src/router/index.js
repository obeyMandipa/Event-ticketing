import {createRouter, createWebHistory} from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import EventsView from '../views/EventsView.vue';
import TicketPurchase from '../views/TicketPurchase.vue';
  
const routes = [
    {path: '/', name: 'Home', component: EventsView},
    {path: '/admin', name: 'AdminDashboard', component: AdminDashboard},
    {path: '/purchase/:eventId', name: 'TicketPurchase', component: TicketPurchase}
];
  export default createRouter({
    history: createWebHistory(),
    routes
  });
  