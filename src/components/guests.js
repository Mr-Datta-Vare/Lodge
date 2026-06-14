import store from '../store.js';

export function renderGuests(container) {
  let searchQuery = '';
  let statusFilter = 'all';

  function draw() {
    const guests = store.getGuests();

    // Filter guest records
    const filteredGuests = guests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            guest.mobile.includes(searchQuery) ||
                            (guest.roomNumber && guest.roomNumber.includes(searchQuery));
      const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'checked-in' && guest.status === 'Checked-In') ||
                            (statusFilter === 'checked-out' && guest.status === 'Checked-Out');
      return matchesSearch && matchesStatus;
    });

    container.innerHTML = `
      <!-- Search & Filters -->
      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="guest-search-input" class="form-input" placeholder="Search guests by name, phone or room number..." value="${searchQuery}">
        </div>
        <select id="guest-status-filter" class="form-input" style="width: 180px; background-color:#12131a">
          <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
          <option value="checked-in" ${statusFilter === 'checked-in' ? 'selected' : ''}>Checked-In Only</option>
          <option value="checked-out" ${statusFilter === 'checked-out' ? 'selected' : ''}>Checked-Out Only</option>
        </select>
      </div>

      <!-- Guest Register Table -->
      <div class="glass-card table-container">
        <table class="varex-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Room No</th>
              <th>Contact Info</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th style="text-align:right">Action</th>
            </tr>
          </thead>
          <tbody>
            ${filteredGuests.map(guest => `
              <tr class="guest-row-item" data-id="${guest.id}" style="cursor:pointer">
                <td style="font-weight:600">${guest.name}</td>
                <td>Room ${guest.roomNumber || 'N/A'}</td>
                <td>${guest.mobile}</td>
                <td>${guest.checkIn}</td>
                <td>${guest.checkOut}</td>
                <td>
                  <span class="badge ${guest.status === 'Checked-In' ? 'badge-available' : 'badge-occupied'}">
                    ${guest.status}
                  </span>
                </td>
                <td style="text-align:right">
                  <button class="btn btn-secondary btn-view-profile" data-id="${guest.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
                    View Profile
                  </button>
                </td>
              </tr>
            `).join('')}
            ${filteredGuests.length === 0 ? '<tr><td colspan="7" style="text-align:center; padding:3rem; color:var(--text-muted);">No guest logs match your search.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    `;

    // Search input listener
    const searchInput = container.querySelector('#guest-search-input');
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      // Filter dynamically without full redraw of form fields, but table update is required
      // Redraw table rows only or redraw fully (redraw fully is fine and simple)
      draw();
      // Set cursor to end of input
      const input = container.querySelector('#guest-search-input');
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });

    // Status select listener
    const statusSelect = container.querySelector('#guest-status-filter');
    statusSelect.addEventListener('change', (e) => {
      statusFilter = e.target.value;
      draw();
    });

    // Handle view profile click
    container.querySelectorAll('.guest-row-item').forEach(row => {
      row.addEventListener('click', (e) => {
        // Prevent click trigger if they click the button directly to avoid double modals
        const guestId = row.dataset.id;
        openGuestModal(guestId);
      });
    });
  }

  function openGuestModal(guestId) {
    const guest = store.getGuests().find(g => g.id === guestId);
    if (!guest) return;

    const overlay = document.getElementById('global-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
      <span class="modal-close" id="close-guest-modal">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
      <div style="text-align:center; margin-bottom:1.5rem">
        <div class="user-avatar" style="width: 72px; height: 72px; font-size: 1.75rem; margin: 0 auto 0.75rem;">
          ${guest.name.charAt(0)}${guest.name.split(' ')[1] ? guest.name.split(' ')[1].charAt(0) : ''}
        </div>
        <h3 style="font-size:1.5rem; font-weight:600; color:var(--text-inverse)">${guest.name}</h3>
        <p style="color:var(--text-muted)">Guest Profile Card</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; font-size:0.9rem;">
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Contact Number</span>
          <span style="color:var(--text-main); font-weight:500;">${guest.mobile}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Permanent Address</span>
          <span style="color:var(--text-main); font-weight:500;">${guest.address}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Assigned Room</span>
          <span style="color:var(--text-main); font-weight:500;">Room ${guest.roomNumber || 'N/A'}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Total Guests</span>
          <span style="color:var(--text-main); font-weight:500;">${guest.numGuests} person(s)</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Check-In Date</span>
          <span style="color:var(--text-main); font-weight:500;">${guest.checkIn}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Check-Out Date</span>
          <span style="color:var(--text-main); font-weight:500;">${guest.checkOut || 'N/A'}</span>
        </div>
      </div>

      <div style="border-top:1px solid var(--border-color); padding-top:1.25rem">
        <h4 style="font-size:0.95rem; font-weight:600; color:var(--text-inverse); margin-bottom:0.75rem;">Verified Identification Badge</h4>
        <div style="display:flex; align-items:center; gap:1rem; padding:0.75rem; background:rgba(0,230,118,0.06); border:1px solid rgba(0,230,118,0.2); border-radius:var(--border-radius-md)">
          <div style="color:var(--color-success)">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 11 11 13 15 9"></polyline>
            </svg>
          </div>
          <div>
            <span style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-inverse)">${guest.idType}</span>
            <span style="display:block; font-size:0.75rem; color:var(--text-muted)">Number: ${guest.idNumber}</span>
          </div>
          <span class="badge badge-available" style="margin-left:auto;">VERIFIED</span>
        </div>
      </div>
      
      <div style="display:flex; justify-content:flex-end; margin-top:2rem">
        <button class="btn btn-secondary" id="close-profile-modal-btn">Close Profile</button>
      </div>
    `;

    overlay.classList.add('active');

    const closeModal = () => {
      overlay.classList.remove('active');
    };

    modalBody.querySelector('#close-guest-modal').addEventListener('click', closeModal);
    modalBody.querySelector('#close-profile-modal-btn').addEventListener('click', closeModal);
  }

  draw();
}
