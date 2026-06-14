import store from '../store.js';
import { showToast } from '../main.js';

export function renderBookingSimulator(container) {
  function draw() {
    const bookings = store.getBookings();
    const rooms = store.getRooms();

    const pendingBookings = bookings.filter(b => b.status === 'Pending');
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Approved');

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    container.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem; max-width:1100px; margin:0 auto;">
        
        <!-- Left: Customer Facing Reservation Form -->
        <div class="glass-card" style="padding:2rem;">
          <div style="text-align:center; margin-bottom:1.5rem">
            <span class="badge badge-pending">ONLINE PORTAL</span>
            <h3 style="font-size:1.25rem; font-weight:600; margin-top:0.5rem">Simulate Guest Booking Request</h3>
            <p style="font-size:0.8rem; color:var(--text-muted)">Simulate a customer requesting a reservation via the web.</p>
          </div>

          <form id="online-reservation-form" style="display:flex; flex-direction:column; gap:1.2rem">
            <div class="form-group">
              <label class="form-label" for="sim-name">Guest Name</label>
              <input type="text" id="sim-name" class="form-input" placeholder="e.g. Anil Joshi" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="sim-mobile">Mobile Number</label>
              <input type="tel" id="sim-mobile" class="form-input" placeholder="e.g. 9011223344" pattern="[0-9]{10}" required>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label" for="sim-category">Room Category</label>
                <select id="sim-category" class="form-input" style="background-color:#12131a">
                  <option value="Deluxe">Deluxe</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="sim-guests">Guests Count</label>
                <input type="number" id="sim-guests" class="form-input" value="1" min="1" max="4">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label" for="sim-checkin">Check-In</label>
                <input type="date" id="sim-checkin" class="form-input" value="${today}" min="${today}">
              </div>
              <div class="form-group">
                <label class="form-label" for="sim-checkout">Check-Out</label>
                <input type="date" id="sim-checkout" class="form-input" value="${tomorrowStr}" min="${tomorrowStr}">
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top:0.5rem">
              Submit Reservation Request
            </button>
          </form>
        </div>

        <!-- Right: Admin Approval Queue -->
        <div style="display:flex; flex-direction:column; gap:1.5rem">
          
          <!-- Pending Requests -->
          <div class="glass-card" style="padding:1.5rem; flex-grow:1;">
            <h3 style="font-size:1.1rem; font-weight:600; margin-bottom:1rem; display:flex; justify-content:space-between">
              <span>Approval Requests Queue</span>
              <span class="badge badge-cleaning" style="font-size:0.75rem">${pendingBookings.length} Pending</span>
            </h3>

            <div style="display:flex; flex-direction:column; gap:1rem; max-height: 250px; overflow-y:auto; padding-right:5px">
              ${pendingBookings.map(b => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; display:flex; flex-direction:column; gap:0.5rem">
                  <div style="display:flex; justify-content:space-between; align-items:center">
                    <strong style="font-size:0.9rem">${b.guestName}</strong>
                    <span class="badge badge-pending">${b.category}</span>
                  </div>
                  <div style="font-size:0.75rem; color:var(--text-muted)">
                    <span>Phone: ${b.mobile} | Guests: ${b.numGuests}</span><br>
                    <span>Stay: ${b.checkIn} to ${b.checkOut}</span>
                  </div>
                  <div style="display:flex; gap:0.5rem; margin-top:0.25rem">
                    <button class="btn btn-success btn-approve-booking" data-id="${b.id}" data-category="${b.category}" style="flex-grow:1; padding:0.3rem; font-size:0.75rem">
                      Approve & Allocate Room
                    </button>
                    <button class="btn btn-secondary btn-reject-booking" data-id="${b.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-color:var(--color-danger); color:var(--color-danger)">
                      Reject
                    </button>
                  </div>
                </div>
              `).join('')}
              ${pendingBookings.length === 0 ? '<p style="color:var(--text-muted); text-align:center; padding:2rem; font-size:0.85rem">No incoming reservation requests.</p>' : ''}
            </div>
          </div>

          <!-- Confirmed/Approved Bookings -->
          <div class="glass-card" style="padding:1.5rem; flex-grow:1;">
            <h3 style="font-size:1.1rem; font-weight:600; margin-bottom:1rem;">Confirmed Booking History</h3>
            <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:220px; overflow-y:auto; padding-right:5px">
              ${confirmedBookings.map(b => `
                <div style="background:rgba(255,255,255,0.02); border-radius:var(--border-radius-md); padding:0.75rem; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.03)">
                  <div>
                    <h5 style="font-size:0.85rem; font-weight:500">${b.guestName}</h5>
                    <span style="font-size:0.75rem; color:var(--text-muted)">Stay: ${b.checkIn} (${b.category})</span>
                  </div>
                  <span class="badge badge-available">CONFIRMED</span>
                </div>
              `).join('')}
              ${confirmedBookings.length === 0 ? '<p style="color:var(--text-muted); text-align:center; padding:1.5rem; font-size:0.85rem">No bookings confirmed yet.</p>' : ''}
            </div>
          </div>

        </div>
      </div>
    `;

    // Hook Form Submit
    const form = container.querySelector('#online-reservation-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const newBooking = {
        id: 'b' + Date.now(),
        guestName: container.querySelector('#sim-name').value,
        mobile: container.querySelector('#sim-mobile').value,
        category: container.querySelector('#sim-category').value,
        checkIn: container.querySelector('#sim-checkin').value,
        checkOut: container.querySelector('#sim-checkout').value,
        numGuests: Number(container.querySelector('#sim-guests').value),
        status: 'Pending'
      };

      store.addBooking(newBooking);
      showToast(`Reservation request sent by ${newBooking.guestName}!`, 'info');
      draw();
    });

    // Hook Approve click
    container.querySelectorAll('.btn-approve-booking').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const category = e.target.dataset.category;

        // Try to allocate an available clean room of that category
        const availableRoom = rooms.find(r => r.category === category && r.status === 'Available' && r.cleaningStatus === 'Clean');
        
        if (!availableRoom) {
          showToast(`Cannot approve: No clean ${category} rooms available right now. Please clean or vacant a room first.`, 'error');
          return;
        }

        // 1. Update booking request status
        store.updateBookingStatus(id, 'Confirmed');

        // 2. Fetch booking details to create a check-in guest automatically
        const booking = store.getBookings().find(b => b.id === id);
        if (booking) {
          const guestData = {
            id: 'g' + Date.now(),
            name: booking.guestName,
            mobile: booking.mobile,
            address: 'Online Booking Reservation',
            numGuests: booking.numGuests,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            idType: 'Aadhaar Card',
            idNumber: 'VERIFIED-ONLINE',
            status: 'Checked-In',
            roomNumber: availableRoom.number
          };
          store.addGuest(guestData);
          store.updateRoom(availableRoom.number, { status: 'Occupied' });
        }

        showToast(`Booking Approved! Room ${availableRoom.number} allocated to ${booking.guestName}.`, 'success');
        draw();
      });
    });

    // Hook Reject click
    container.querySelectorAll('.btn-reject-booking').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        store.updateBookingStatus(id, 'Rejected');
        showToast('Booking request rejected.', 'info');
        draw();
      });
    });
  }

  draw();
}
