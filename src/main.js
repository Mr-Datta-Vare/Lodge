import store from './store.js';
import { renderDashboard } from './components/dashboard.js';
import { renderRooms } from './components/rooms.js';
import { renderCheckIn } from './components/checkin.js';
import { renderGuests } from './components/guests.js';
import { renderBilling } from './components/billing.js';
import { renderBookingSimulator } from './components/bookingSimulator.js';

// Elements
const viewTitle = document.getElementById('view-title');
const mainViewport = document.getElementById('main-viewport');
const clockEl = document.getElementById('current-time-clock');
const navLinks = document.querySelectorAll('.nav-link');
const quickCheckoutBtn = document.getElementById('quick-checkout-action');
const toastContainer = document.getElementById('toast-alerts-container');

// State tracking
let currentActiveView = 'dashboard';

// Dynamic Clock
function startClock() {
  const updateClock = () => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
  };
  updateClock();
  setInterval(updateClock, 1000);
}

// Toast Alert Manager
export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    icon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    icon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Auto clean-up
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
    setTimeout(() => {
      if (toast.parentNode) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// Router - Swap Active views
function switchView(viewName) {
  currentActiveView = viewName;
  
  // Update Navbar class
  navLinks.forEach(link => {
    if (link.dataset.view === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Render view components
  switch (viewName) {
    case 'dashboard':
      viewTitle.textContent = 'Dashboard Overview';
      renderDashboard(mainViewport);
      break;
    case 'rooms':
      viewTitle.textContent = 'Rooms Status Matrix';
      renderRooms(mainViewport);
      break;
    case 'checkin':
      viewTitle.textContent = 'Guest Check-In Desk';
      renderCheckIn(mainViewport);
      break;
    case 'guests':
      viewTitle.textContent = 'Guest Registration History';
      renderGuests(mainViewport);
      break;
    case 'billing':
      viewTitle.textContent = 'Checkout Billing & Invoice';
      renderBilling(mainViewport);
      break;
    case 'bookingSimulator':
      viewTitle.textContent = 'Online Reservations Simulator';
      renderBookingSimulator(mainViewport);
      break;
    default:
      viewTitle.textContent = 'Dashboard';
      renderDashboard(mainViewport);
  }
}

// Navigation triggers
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const view = link.dataset.view;
    switchView(view);
  });
});

// Quick Action
quickCheckoutBtn.addEventListener('click', () => {
  switchView('billing');
});

// Subscribe to store updates to redraw active panel
store.subscribe(() => {
  switchView(currentActiveView);
});

// Initial startup
startClock();
switchView('dashboard');
showToast('Welcome to VareX Lodge Management Terminal.', 'success');
