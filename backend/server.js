const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const QRCode = require('qrcode');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

//mongo db connection
mongoose.connect('mongodb://localhost:27017/ticketing');

//enhanced shcemas 
const EventSchema = new mongoose.Schema({
    name: String, venue: String, date: Date, description: String, totalSeats: Number, price: Number, seats: [{id: String, available: Boolean, price: Number}]
});

const TicketSchema = new mongoose.Schema({
    eventId: mongoose.Schema.Types.ObjectId, userName: String, userEmail: String, seatId: String, qrCodeData: String, status: { type: String, default: 'active' }
});

const event = mongoose.model('Event', EventSchema);
const ticket = mongoose.model('Ticket', TicketSchema);

//admin apis
app.post('/events', upload.single('image'), async (req, res) => {
    const eventDoc = new event ({
        name: req.body.name, venue: req.body.venue, date: req.body.date, description: req.body.description, totalSeats: req.body.totalSeats, price: req.body.price,
        seats: Array.from({ length: req.body.totalSeats }, (_, i) => ({ id: `S${i + 1}`, available: true, price: req.body.price }))
    });
    await eventDoc.save();
    res.json(eventDoc);
});

app.get('/events', async (req, res) => res.json(await event.find()));

//client apis
app.post('/purchase/:eventId', async (req, res) => {
    const {name, email} = req.body;
    const eventDoc = await event.findById(req.params.eventId);
    const seat = eventDoc.seats.id(req.params.seatId);

    if (seat.available) {
        seat.available = false;
        await eventDoc.save();

        const qrData = `Event: ${eventDoc.name}, Seat: ${seat.id}, Name: ${name}`;
        const qrCodeData = await QRCode.toDataURL(qrData);

        const ticketDoc = new ticket({ eventId: eventDoc._id, userName: name, userEmail: email, seatId: seat.id, qrCodeData});
        await ticketDoc.save();

        res.json({success: true, ticketId: ticketDoc._id, qrCodeData});
        } else {
            res.status(400).json({error: 'Seat unavailable' });
        }
    });

app.listen(5000, () => console.log('Server running on port 5000'));


