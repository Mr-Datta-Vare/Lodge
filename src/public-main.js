// public-main.js - VareX Public Portal Core Script

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('public-booking-form');
  const modal = document.getElementById('booking-success-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const successName = document.getElementById('success-guest-name');
  const successRefId = document.getElementById('success-ref-id');
  const roomCategorySelect = document.getElementById('book-category');

  // Pre-fill dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const checkinInput = document.getElementById('book-checkin');
  const checkoutInput = document.getElementById('book-checkout');
  
  if (checkinInput && checkoutInput) {
    checkinInput.value = today;
    checkinInput.min = today;
    checkoutInput.value = tomorrowStr;
    checkoutInput.min = tomorrowStr;
  }

  // Handle "Select Room" clicks in cards
  document.querySelectorAll('.btn-select-room[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      if (roomCategorySelect) {
        roomCategorySelect.value = category;
      }
      
      // Smooth scroll to booking form
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle Reservation Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('book-name').value;
      const mobile = document.getElementById('book-mobile').value;
      const category = roomCategorySelect.value;
      const numGuests = Number(document.getElementById('book-guests').value);
      const checkIn = checkinInput.value;
      const checkOut = checkoutInput.value;

      // Create Booking Request
      const bookingId = 'b' + Date.now();
      const newBooking = {
        id: bookingId,
        guestName,
        mobile,
        category,
        checkIn,
        checkOut,
        numGuests,
        status: 'Pending'
      };

      // Read current bookings from localStorage
      let bookings = [];
      try {
        const stored = localStorage.getItem('varex_bookings');
        bookings = stored ? JSON.parse(stored) : [];
      } catch (err) {
        console.error('Error loading bookings', err);
      }

      // Add to bookings database
      bookings.unshift(newBooking);
      localStorage.setItem('varex_bookings', JSON.stringify(bookings));

      // Show success modal
      if (successName) successName.textContent = guestName;
      
      const randomRefNum = 10000 + Math.floor(Math.random() * 90000);
      const refId = `REF-${randomRefNum}`;
      if (successRefId) successRefId.textContent = refId;

      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
      
      // Reset dates after form clear
      if (checkinInput && checkoutInput) {
        checkinInput.value = today;
        checkoutInput.value = tomorrowStr;
      }
    });
  }

  // Close modal button action
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
      }
    });
  }
});
