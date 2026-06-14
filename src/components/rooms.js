import store from '../store.js';
import { showToast } from '../main.js';

export function renderRooms(container) {
  let activeStatusFilter = 'all';
  let activeCategoryFilter = 'all';

  function draw() {
    const rooms = store.getRooms();
    const categories = ['Deluxe', 'AC', 'Non-AC'];

    // Group rooms by category to calculate base rates
    const categoryRates = {};
    categories.forEach(cat => {
      const room = rooms.find(r => r.category === cat);
      categoryRates[cat] = room ? room.rate : 0;
    });

    // Filtering logic
    const filteredRooms = rooms.filter(room => {
      const matchesStatus = activeStatusFilter === 'all' || 
                            (activeStatusFilter === 'cleaning' && room.cleaningStatus === 'Dirty') ||
                            (activeStatusFilter.toLowerCase() === room.status.toLowerCase());
      const matchesCategory = activeCategoryFilter === 'all' || room.category === activeCategoryFilter;
      return matchesStatus && matchesCategory;
    });

    container.innerHTML = `
      <!-- Filters and Header Controls -->
      <div class="rooms-filter-bar">
        <div class="filter-group">
          <button class="filter-btn ${activeStatusFilter === 'all' ? 'active' : ''}" data-status="all">All Rooms</button>
          <button class="filter-btn ${activeStatusFilter === 'available' ? 'active' : ''}" data-status="available">Available</button>
          <button class="filter-btn ${activeStatusFilter === 'occupied' ? 'active' : ''}" data-status="occupied">Occupied</button>
          <button class="filter-btn ${activeStatusFilter === 'cleaning' ? 'active' : ''}" data-status="cleaning">Needs Cleaning</button>
        </div>

        <div class="filter-group">
          <button class="filter-btn ${activeCategoryFilter === 'all' ? 'active' : ''}" data-category="all">All Types</button>
          <button class="filter-btn ${activeCategoryFilter === 'Deluxe' ? 'active' : ''}" data-category="Deluxe">Deluxe</button>
          <button class="filter-btn ${activeCategoryFilter === 'AC' ? 'active' : ''}" data-category="AC">AC</button>
          <button class="filter-btn ${activeCategoryFilter === 'Non-AC' ? 'active' : ''}" data-category="Non-AC">Non-AC</button>
        </div>
      </div>

      <!-- Rooms Grid Layout -->
      <div class="rooms-grid">
        ${filteredRooms.map(room => {
          let badgeClass = 'badge-available';
          let statusText = 'Available';
          if (room.status === 'Occupied') {
            badgeClass = 'badge-occupied';
            statusText = 'Occupied';
          } else if (room.cleaningStatus === 'Dirty') {
            badgeClass = 'badge-cleaning';
            statusText = 'Needs Cleaning';
          }

          return `
            <div class="glass-card room-card ${room.status.toLowerCase()}">
              <div class="room-header">
                <span class="room-number">Room ${room.number}</span>
                <span class="badge ${badgeClass}">${statusText}</span>
              </div>
              <div>
                <span class="room-category">${room.category}</span>
                <span style="margin-left: 0.5rem; font-size: 0.75rem; color: ${room.cleaningStatus === 'Clean' ? 'var(--color-success)' : 'var(--color-warning)'}">
                  ● ${room.cleaningStatus === 'Clean' ? 'Clean' : 'Dirty'}
                </span>
              </div>
              <div class="room-rate">₹${room.rate.toLocaleString('en-IN')}/day</div>
              <div class="room-actions">
                ${room.cleaningStatus === 'Dirty' ? `
                  <button class="btn-clean" data-room="${room.number}" style="background: var(--color-warning-glow); border-color: var(--color-warning); color: var(--color-warning)">
                    Mark Cleaned
                  </button>
                ` : ''}
                ${room.status === 'Available' && room.cleaningStatus === 'Clean' ? `
                  <button class="btn-checkin" data-room="${room.number}" data-category="${room.category}">
                    Check-In
                  </button>
                ` : ''}
                ${room.status === 'Occupied' ? `
                  <button class="btn-checkout" data-room="${room.number}">
                    Bill & Check-Out
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
        ${filteredRooms.length === 0 ? '<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No rooms match your filters.</div>' : ''}
      </div>

      <!-- Room Rate Management Panel -->
      <div class="glass-card" style="margin-top: 3rem; padding: 2rem;">
        <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem; font-weight:600;">Room Rates Management</h3>
        <form id="rate-management-form" style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-end;">
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">Deluxe Room Rate (₹)</label>
            <input type="number" id="rate-deluxe" class="form-input" value="${categoryRates['Deluxe']}" required min="500">
          </div>
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">AC Room Rate (₹)</label>
            <input type="number" id="rate-ac" class="form-input" value="${categoryRates['AC']}" required min="500">
          </div>
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">Non-AC Room Rate (₹)</label>
            <input type="number" id="rate-nonac" class="form-input" value="${categoryRates['Non-AC']}" required min="300">
          </div>
          <button type="submit" class="btn btn-primary" style="height: 43px;">Update Rates</button>
        </form>
      </div>
    `;

    // Hook listeners
    container.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeStatusFilter = e.target.dataset.status;
        draw();
      });
    });

    container.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategoryFilter = e.target.dataset.category;
        draw();
      });
    });

    // Cleaning button action
    container.querySelectorAll('.btn-clean').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomNum = e.target.dataset.room;
        store.updateRoom(roomNum, { cleaningStatus: 'Clean' });
        showToast(`Room ${roomNum} is now clean and available.`, 'success');
        draw();
      });
    });

    // Check-in action
    container.querySelectorAll('.btn-checkin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomNum = e.target.dataset.room;
        const category = e.target.dataset.category;
        // Direct to check-in view, store selected room
        window.preSelectedRoom = roomNum;
        window.preSelectedCategory = category;
        document.querySelector('.nav-link[data-view="checkin"]').click();
      });
    });

    // Check-out action
    container.querySelectorAll('.btn-checkout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const roomNum = e.target.dataset.room;
        window.preSelectedCheckoutRoom = roomNum;
        document.querySelector('.nav-link[data-view="billing"]').click();
      });
    });

    // Rate submit
    const rateForm = container.querySelector('#rate-management-form');
    if (rateForm) {
      rateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rDeluxe = container.querySelector('#rate-deluxe').value;
        const rAC = container.querySelector('#rate-ac').value;
        const rNonAC = container.querySelector('#rate-nonac').value;

        store.updateRoomRates('Deluxe', rDeluxe);
        store.updateRoomRates('AC', rAC);
        store.updateRoomRates('Non-AC', rNonAC);

        showToast('Room rates updated successfully!', 'success');
        draw();
      });
    }
  }

  draw();
}
