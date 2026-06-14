import store from '../store.js';

export function renderDashboard(container) {
  const rooms = store.getRooms();
  const guests = store.getGuests();
  const payments = store.getPayments();
  const bookings = store.getBookings();

  // Metrics calculations
  const totalRoomsCount = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'Occupied').length;
  const availableCount = rooms.filter(r => r.status === 'Available').length;
  const cleaningCount = rooms.filter(r => r.status === 'Cleaning').length;

  const totalRevenue = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  // Group revenue by date for the last 5 days
  const last5Days = [];
  for (let i = 4; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    last5Days.push(dateStr);
  }

  const revenueByDay = last5Days.map(date => {
    const dailyTotal = payments
      .filter(p => p.date === date && p.status === 'Completed')
      .reduce((sum, p) => sum + p.amount, 0);
    return { date, amount: dailyTotal };
  });

  // Calculate coordinates for SVG path
  const chartWidth = 500;
  const chartHeight = 180;
  const paddingX = 50;
  const paddingY = 30;
  const maxAmount = Math.max(...revenueByDay.map(d => d.amount), 5000) * 1.2; // scale factor

  const points = revenueByDay.map((d, index) => {
    const x = paddingX + (index * (chartWidth - 2 * paddingX) / (revenueByDay.length - 1));
    const y = chartHeight - paddingY - (d.amount / maxAmount * (chartHeight - 2 * paddingY));
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  // Format currency
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // Filter out recent check-ins or checkout activities
  const recentActivities = [
    ...guests.filter(g => g.status === 'Checked-In').map(g => ({
      type: 'checkin',
      title: `${g.name} Checked-In`,
      detail: `Room ${g.roomNumber} (${g.numGuests} Guests)`,
      time: g.checkIn,
      badgeColor: 'var(--color-success)',
      icon: `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle>`
    })),
    ...payments.map(p => ({
      type: 'payment',
      title: `Payment Received`,
      detail: `Room ${p.roomNumber} - ${formatINR(p.amount)} via ${p.method}`,
      time: p.date,
      badgeColor: 'var(--color-info)',
      icon: `<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>`
    })),
    ...bookings.filter(b => b.status === 'Pending').map(b => ({
      type: 'booking',
      title: `New Booking Request`,
      detail: `${b.guestName} requesting ${b.category} room`,
      time: b.checkIn,
      badgeColor: 'var(--color-warning)',
      icon: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`
    }))
  ]
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 5);

  container.innerHTML = `
    <div class="dashboard-grid">
      <!-- Card 1: Occupancy -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Occupied Rooms</h3>
          <p>${occupiedCount} <span style="font-size: 1rem; font-weight:400; color: var(--text-muted);">/ ${totalRoomsCount}</span></p>
        </div>
        <div class="metric-icon" style="background: var(--color-danger-glow); color: var(--color-danger)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 2: Available -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Available Rooms</h3>
          <p>${availableCount}</p>
        </div>
        <div class="metric-icon" style="background: var(--color-success-glow); color: var(--color-success)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 3: Cleaning -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Cleaning Queue</h3>
          <p>${cleaningCount}</p>
        </div>
        <div class="metric-icon" style="background: var(--color-warning-glow); color: var(--color-warning)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
      </div>

      <!-- Card 4: Total Revenue -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Total Revenue</h3>
          <p>${formatINR(totalRevenue)}</p>
        </div>
        <div class="metric-icon" style="background: rgba(0, 176, 255, 0.15); color: var(--color-info)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="chart-grid">
      <!-- Revenue Trend Card -->
      <div class="glass-card chart-card">
        <div class="card-header">
          <h3>Revenue Analytics (Last 5 Days)</h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Interactive Live Graph</span>
        </div>
        <div class="chart-container">
          <svg class="svg-chart" viewBox="0 0 ${chartWidth} ${chartHeight}">
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="var(--color-primary)" />
                <stop offset="100%" stop-color="var(--color-info)" />
              </linearGradient>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            
            <!-- Horizontal Grid lines -->
            <line class="chart-grid-line" x1="${paddingX}" y1="${paddingY}" x2="${chartWidth - paddingX}" y2="${paddingY}" />
            <line class="chart-grid-line" x1="${paddingX}" y1="${(chartHeight) / 2}" x2="${chartWidth - paddingX}" y2="${(chartHeight) / 2}" />
            <line class="chart-grid-line" x1="${paddingX}" y1="${chartHeight - paddingY}" x2="${chartWidth - paddingX}" y2="${chartHeight - paddingY}" />
            
            <!-- Area & Line Paths -->
            <path class="chart-area" d="${areaD}" />
            <path class="chart-line" d="${pathD}" stroke-dasharray="1000" stroke-dashoffset="1000" />
            
            <!-- Points and Tooltips -->
            ${points.map((p, index) => `
              <circle class="chart-point" cx="${p.x}" cy="${p.y}" r="6" data-amount="${p.amount}" data-date="${p.date}">
                <title>${p.date}: ${formatINR(p.amount)}</title>
              </circle>
              <text x="${p.x}" y="${chartHeight - 8}" fill="var(--text-muted)" font-size="9" text-anchor="middle">
                ${p.date.slice(5)}
              </text>
              <text x="${p.x}" y="${p.y - 12}" fill="var(--text-inverse)" font-size="10" font-weight="600" text-anchor="middle">
                ${p.amount > 0 ? formatINR(p.amount) : ''}
              </text>
            `).join('')}
          </svg>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="glass-card chart-card">
        <div class="card-header">
          <h3>Recent Operations</h3>
          <span class="badge badge-pending">${recentActivities.length} logs</span>
        </div>
        <ul class="recent-activity-list">
          ${recentActivities.map(act => `
            <li class="activity-item">
              <div class="activity-badge" style="background: rgba(255, 255, 255, 0.05); color: ${act.badgeColor}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  ${act.icon}
                </svg>
              </div>
              <div class="activity-details">
                <h5>${act.title}</h5>
                <p>${act.detail}</p>
              </div>
              <div class="activity-time">${act.time.slice(5)}</div>
            </li>
          `).join('')}
          ${recentActivities.length === 0 ? '<li class="text-muted" style="text-align:center; padding: 2rem;">No recent activities logged.</li>' : ''}
        </ul>
      </div>
    </div>

    <!-- Quick Operations Panels -->
    <div class="glass-card" style="padding: 1.5rem;">
      <h3 style="margin-bottom:1rem; font-size:1.1rem; font-weight:600;">Reception Desk Quick Tools</h3>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn btn-primary" id="btn-quick-checkin">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          New Check-In Registration
        </button>
        <button class="btn btn-secondary" id="btn-quick-rooms">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          Manage Rooms Queue
        </button>
        <button class="btn btn-secondary" id="btn-quick-billing">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          Generate Settlement Invoice
        </button>
      </div>
    </div>
  `;

  // Attach quick action listeners
  container.querySelector('#btn-quick-checkin').addEventListener('click', () => {
    document.querySelector('.nav-link[data-view="checkin"]').click();
  });
  container.querySelector('#btn-quick-rooms').addEventListener('click', () => {
    document.querySelector('.nav-link[data-view="rooms"]').click();
  });
  container.querySelector('#btn-quick-billing').addEventListener('click', () => {
    document.querySelector('.nav-link[data-view="billing"]').click();
  });
}
