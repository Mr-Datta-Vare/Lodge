import store from '../store.js';
import { showToast } from '../main.js';

export function renderBookingSimulator(container) {
  function draw() {
    const bookings = store.getBookings();
    const rooms = store.getRooms();

    const pendingBookings = bookings.filter(b => b.status === 'Pending');
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Approved');

    // Calculate room category demands based on pending bookings
    const demandCount = { Deluxe: 0, AC: 0, 'Non-AC': 0 };
    pendingBookings.forEach(b => {
      if (demandCount[b.category] !== undefined) {
        demandCount[b.category]++;
      }
    });

    container.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:2rem; max-width:1100px; margin:0 auto;">
        
        <!-- Left: Online Booking System Manager Desk -->
        <div class="glass-card" style="padding:2.5rem; display:flex; flex-direction:column; gap:1.5rem;">
          <div style="text-align:center;">
            <span class="badge badge-available">VareX Booking Sync</span>
            <h3 style="font-size:1.4rem; font-weight:700; margin-top:0.75rem; color:var(--text-inverse)">Lodge Reservations desk</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem">Receives online guest reservations from the public lodging landing page in real-time.</p>
          </div>

          <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1.25rem; font-size:0.85rem; display:flex; flex-direction:column; gap:0.75rem">
            <h4 style="font-weight:600; color:var(--text-inverse); border-bottom:1px solid var(--border-color); padding-bottom:0.5rem">Queue Insights</h4>
            <div style="display:flex; justify-content:space-between"><span>Pending Requests:</span><span style="font-weight:600; color:var(--color-warning)">${pendingBookings.length} bookings</span></div>
            <div style="display:flex; justify-content:space-between"><span>Deluxe Rooms Demand:</span><span>${demandCount.Deluxe} queue</span></div>
            <div style="display:flex; justify-content:space-between"><span>AC Rooms Demand:</span><span>${demandCount.AC} queue</span></div>
            <div style="display:flex; justify-content:space-between"><span>Non-AC Rooms Demand:</span><span>${demandCount['Non-AC']} queue</span></div>
          </div>

          <div style="margin-top:auto; text-align:center">
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem">To simulate a guest submitting an online booking, click the button below to open the customer website.</p>
            <button class="btn btn-primary" id="btn-open-website" style="width:100%">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Open Public Booking Site
            </button>
          </div>
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
                    <strong style="font-size:0.9rem; color:var(--text-inverse)">${b.guestName}</strong>
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
                    <h5 style="font-size:0.85rem; font-weight:500; color:var(--text-inverse)">${b.guestName}</h5>
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

    // Open website link listener
    container.querySelector('#btn-open-website').addEventListener('click', () => {
      window.open('/index.html', '_blank');
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
