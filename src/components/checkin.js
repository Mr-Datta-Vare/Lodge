import store from '../store.js';
import { showToast } from '../main.js';

export function renderCheckIn(container) {
  const rooms = store.getRooms();
  
  // Clean, available rooms grouped by category
  const getAvailableRoomsForCategory = (category) => {
    return rooms.filter(r => r.category === category && r.status === 'Available' && r.cleaningStatus === 'Clean');
  };

  // Retrieve preselected inputs
  const preRoom = window.preSelectedRoom || '';
  const preCat = window.preSelectedCategory || 'Deluxe';
  
  // Clean up global window placeholders
  window.preSelectedRoom = null;
  window.preSelectedCategory = null;

  function draw() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const currentCategory = container.querySelector('#guest-category')?.value || preCat;
    const availableRooms = getAvailableRoomsForCategory(currentCategory);

    container.innerHTML = `
      <div class="glass-card form-container">
        <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem; font-weight:600; text-align: center;">Guest Check-In Registration</h3>
        <form id="checkin-registration-form">
          <div class="form-grid">
            <!-- Guest Info -->
            <div class="form-group">
              <label class="form-label" for="guest-name">Full Name</label>
              <input type="text" id="guest-name" class="form-input" placeholder="e.g. Rahul Deshmukh" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="guest-mobile">Mobile Number</label>
              <input type="tel" id="guest-mobile" class="form-input" placeholder="e.g. 9823456789" pattern="[0-9]{10}" required>
            </div>

            <div class="form-group form-group-full">
              <label class="form-label" for="guest-address">Address</label>
              <input type="text" id="guest-address" class="form-input" placeholder="City, State" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="guest-count">Number of Guests</label>
              <input type="number" id="guest-count" class="form-input" value="1" min="1" max="6" required>
            </div>

            <!-- Stay Info -->
            <div class="form-group">
              <label class="form-label" for="guest-category">Preferred Room Category</label>
              <select id="guest-category" class="form-input" required style="background-color: #12131a">
                <option value="Deluxe" ${currentCategory === 'Deluxe' ? 'selected' : ''}>Deluxe (₹3,500/day)</option>
                <option value="AC" ${currentCategory === 'AC' ? 'selected' : ''}>AC (₹2,200/day)</option>
                <option value="Non-AC" ${currentCategory === 'Non-AC' ? 'selected' : ''}>Non-AC (₹1,200/day)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="guest-room">Assign Room</label>
              <select id="guest-room" class="form-input" required style="background-color: #12131a">
                ${preRoom ? `<option value="${preRoom}" selected>Room ${preRoom} (Pre-selected)</option>` : ''}
                ${availableRooms.map(r => `<option value="${r.number}">Room ${r.number}</option>`).join('')}
                ${availableRooms.length === 0 && !preRoom ? '<option value="" disabled>No clean rooms available in this category</option>' : ''}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkin-date">Check-In Date</label>
              <input type="date" id="checkin-date" class="form-input" value="${today}" min="${today}" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkout-date">Check-Out Date</label>
              <input type="date" id="checkout-date" class="form-input" value="${tomorrowStr}" min="${tomorrowStr}" required>
            </div>

            <!-- ID Verification -->
            <div class="form-group">
              <label class="form-label" for="id-type">Identification Document (ID)</label>
              <select id="id-type" class="form-input" required style="background-color: #12131a">
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
              </select>
              <input type="text" id="id-number" class="form-input" placeholder="ID Number / Reference" required style="margin-top:0.5rem">
            </div>

            <div class="form-group">
              <label class="form-label">Upload Digital ID Document</label>
              <div class="mock-uploader" id="id-file-uploader">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span id="uploader-text" style="font-size:0.8rem; color:var(--text-muted);">Drag or click to upload Aadhaar/PAN</span>
                <span id="file-status" style="font-size:0.75rem; color:var(--color-success); font-weight:600; display:none;">✔ ID Uploaded Successfully</span>
                <input type="file" id="id-file-input" accept="image/*,.pdf">
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:1rem;">
            <button type="reset" class="btn btn-secondary">Clear Fields</button>
            <button type="submit" class="btn btn-primary">Complete Check-In</button>
          </div>
        </form>
      </div>
    `;

    // Category Change: refresh available rooms
    const categorySelect = container.querySelector('#guest-category');
    categorySelect.addEventListener('change', () => {
      draw();
    });

    // Mock file uploader change
    const fileInput = container.querySelector('#id-file-input');
    const fileStatus = container.querySelector('#file-status');
    const uploaderText = container.querySelector('#uploader-text');
    const uploaderBox = container.querySelector('#id-file-uploader');

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        uploaderText.textContent = `File: ${file.name}`;
        fileStatus.style.display = 'block';
        uploaderBox.style.borderColor = 'var(--color-success)';
      }
    });

    // Form submission
    const form = container.querySelector('#checkin-registration-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const assignedRoom = container.querySelector('#guest-room').value;
      if (!assignedRoom) {
        showToast('Please allocate a valid room before completing check-in.', 'error');
        return;
      }

      const guestData = {
        id: 'g' + Date.now(),
        name: container.querySelector('#guest-name').value,
        mobile: container.querySelector('#guest-mobile').value,
        address: container.querySelector('#guest-address').value,
        numGuests: Number(container.querySelector('#guest-count').value),
        checkIn: container.querySelector('#checkin-date').value,
        checkOut: container.querySelector('#checkout-date').value,
        idType: container.querySelector('#id-type').value,
        idNumber: container.querySelector('#id-number').value,
        status: 'Checked-In',
        roomNumber: assignedRoom
      };

      // Update store
      store.addGuest(guestData);
      store.updateRoom(assignedRoom, { status: 'Occupied' });

      showToast(`Guest ${guestData.name} registered and assigned to Room ${assignedRoom}.`, 'success');
      
      // Redirect to rooms grid
      document.querySelector('.nav-link[data-view="rooms"]').click();
    });
  }

  draw();
}
