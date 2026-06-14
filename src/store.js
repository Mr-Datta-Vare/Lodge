import { initialRooms, initialGuests, initialBookings, initialPayments } from './utils/mockData.js';

class Store {
  constructor() {
    this.rooms = this._load('varex_rooms', initialRooms);
    this.guests = this._load('varex_guests', initialGuests);
    this.bookings = this._load('varex_bookings', initialBookings);
    this.payments = this._load('varex_payments', initialPayments);
    this.listeners = [];
  }

  _load(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  _save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this));
  }

  // Getters
  getRooms() { return this.rooms; }
  getGuests() { return this.guests; }
  getBookings() { return this.bookings; }
  getPayments() { return this.payments; }

  // Actions - Rooms
  updateRoom(roomNumber, updates) {
    this.rooms = this.rooms.map(room => room.number === roomNumber ? { ...room, ...updates } : room);
    this._save('varex_rooms', this.rooms);
  }

  updateRoomRates(category, newRate) {
    this.rooms = this.rooms.map(room => room.category === category ? { ...room, rate: Number(newRate) } : room);
    this._save('varex_rooms', this.rooms);
  }

  // Actions - Guests
  addGuest(guest) {
    this.guests = [guest, ...this.guests];
    this._save('varex_guests', this.guests);
  }

  updateGuest(guestId, updates) {
    this.guests = this.guests.map(g => g.id === guestId ? { ...g, ...updates } : g);
    this._save('varex_guests', this.guests);
  }

  // Actions - Bookings
  addBooking(booking) {
    this.bookings = [booking, ...this.bookings];
    this._save('varex_bookings', this.bookings);
  }

  updateBookingStatus(bookingId, status) {
    this.bookings = this.bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    this._save('varex_bookings', this.bookings);
  }

  // Actions - Payments
  addPayment(payment) {
    this.payments = [payment, ...this.payments];
    this._save('varex_payments', this.payments);
  }
}

export const store = new Store();
export default store;
