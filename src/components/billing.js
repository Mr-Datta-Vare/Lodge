import store from '../store.js';
import { showToast } from '../main.js';

export function renderBilling(container) {
  const rooms = store.getRooms();
  const guests = store.getGuests();

  const occupiedRooms = rooms.filter(r => r.status === 'Occupied');
  
  // Retrieve preselected checkout room
  let selectedRoomNumber = window.preSelectedCheckoutRoom || (occupiedRooms.length > 0 ? occupiedRooms[0].number : '');
  window.preSelectedCheckoutRoom = null; // Clean up placeholder

  let extraCharges = 0;

  function draw() {
    const currentOccupiedRooms = store.getRooms().filter(r => r.status === 'Occupied');
    
    if (currentOccupiedRooms.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align:center; padding: 4rem 2rem;">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--text-muted)" stroke-width="2" style="margin-bottom: 1.5rem">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <h3 style="font-size:1.5rem; font-weight:600; margin-bottom:0.5rem">All Rooms Are Vacant</h3>
          <p style="color:var(--text-muted); max-width:400px; margin:0 auto 1.5rem">There are no occupied rooms in the lodge right now. Go to the check-in page to register a new guest.</p>
          <button class="btn btn-primary" onclick="document.querySelector('.nav-link[data-view=\\'checkin\\']').click()">Go to Check-In</button>
        </div>
      `;
      return;
    }

    const selectedRoom = currentOccupiedRooms.find(r => r.number === selectedRoomNumber) || currentOccupiedRooms[0];
    selectedRoomNumber = selectedRoom.number;

    const guest = guests.find(g => g.roomNumber === selectedRoomNumber && g.status === 'Checked-In');

    // Calculate stay duration
    let stayDays = 1;
    if (guest) {
      const checkInDate = new Date(guest.checkIn);
      const checkOutDate = new Date(); // assume check out today
      const diffTime = Math.abs(checkOutDate - checkInDate);
      stayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (stayDays <= 0) stayDays = 1; // minimum 1 day
    }

    const baseCharges = selectedRoom.rate * stayDays;
    const gstRate = 0.12; // 12% GST
    const gstAmount = Math.round((baseCharges + extraCharges) * gstRate);
    const grandTotal = baseCharges + extraCharges + gstAmount;

    // Formatting helper
    const formatINR = (val) => '₹' + Number(val).toLocaleString('en-IN');

    container.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:1.5rem; max-width: 1100px; margin:0 auto;">
        
        <!-- Left Side: Invoice Controls -->
        <div class="glass-card" style="padding: 2rem; display:flex; flex-direction:column; gap:1.5rem;">
          <h3 style="font-size:1.25rem; font-weight:600;">Check-Out Calculator</h3>
          
          <div class="form-group">
            <label class="form-label" for="checkout-room-select">Select Occupied Room</label>
            <select id="checkout-room-select" class="form-input" style="background-color:#12131a">
              ${currentOccupiedRooms.map(r => `<option value="${r.number}" ${r.number === selectedRoomNumber ? 'selected' : ''}>Room ${r.number} (${r.category})</option>`).join('')}
            </select>
          </div>

          ${guest ? `
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; font-size:0.85rem; display:flex; flex-direction:column; gap:0.5rem">
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Guest Name:</span><span style="font-weight:600">${guest.name}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Contact:</span><span>${guest.mobile}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Check-In:</span><span>${guest.checkIn}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Stay Duration:</span><span style="font-weight:600">${stayDays} day(s)</span></div>
            </div>
          ` : ''}

          <div class="form-group">
            <label class="form-label" for="extra-charges-input">Extra/Room Service Charges (₹)</label>
            <input type="number" id="extra-charges-input" class="form-input" value="${extraCharges}" min="0">
            <span style="font-size:0.75rem; color:var(--text-muted)">Add food, laundry, or other miscellaneous charges.</span>
          </div>

          <button class="btn btn-primary" id="btn-proceed-checkout" style="margin-top:auto">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            Generate UPI QR & Checkout
          </button>
        </div>

        <!-- Right Side: Invoice Preview -->
        <div class="glass-card" style="padding: 2rem;">
          <div class="card-header" style="margin-bottom:1rem">
            <h3 style="font-size:1.1rem; font-weight:600">Digital Invoice Preview</h3>
            <button class="btn btn-secondary" id="btn-print-invoice" style="padding:0.4rem 0.8rem; font-size:0.8rem;">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print Receipt
            </button>
          </div>

          <!-- Printable area -->
          <div class="invoice-container" id="printable-invoice">
            <div class="invoice-header">
              <div class="invoice-title">
                <h3>VareX Lodge</h3>
                <span style="font-size:0.75rem; color:var(--text-muted);">Premium Lodging Services</span>
              </div>
              <div style="text-align:right">
                <span style="font-weight:600; display:block; font-size:0.9rem;">INVOICE</span>
                <span style="font-size:0.75rem; color:var(--text-muted)">INV-2026-${1000 + Math.floor(Math.random() * 9000)}</span>
              </div>
            </div>

            <div class="invoice-details">
              <div>
                <strong style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">BILLED TO:</strong>
                <span>${guest ? guest.name : 'Walk-in Guest'}</span><br>
                <span style="color:var(--text-muted)">${guest ? guest.mobile : ''}</span>
              </div>
              <div style="text-align:right">
                <strong style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">DETAILS:</strong>
                <span>Room Number: ${selectedRoom.number}</span><br>
                <span>Category: ${selectedRoom.category}</span>
              </div>
            </div>

            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th style="text-align:center">Days/Qty</th>
                  <th style="text-align:right">Rate</th>
                  <th style="text-align:right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Room Lodging Charges (${selectedRoom.category})</td>
                  <td style="text-align:center">${stayDays}</td>
                  <td style="text-align:right">${formatINR(selectedRoom.rate)}</td>
                  <td style="text-align:right">${formatINR(baseCharges)}</td>
                </tr>
                ${extraCharges > 0 ? `
                  <tr>
                    <td>Room Service & Miscellaneous</td>
                    <td style="text-align:center">1</td>
                    <td style="text-align:right">${formatINR(extraCharges)}</td>
                    <td style="text-align:right">${formatINR(extraCharges)}</td>
                  </tr>
                ` : ''}
              </tbody>
            </table>

            <div class="invoice-total-section">
              <div class="invoice-total-row">
                <span>Subtotal:</span>
                <span>${formatINR(baseCharges + extraCharges)}</span>
              </div>
              <div class="invoice-total-row">
                <span>GST (12%):</span>
                <span>${formatINR(gstAmount)}</span>
              </div>
              <div class="invoice-total-row grand-total">
                <span>Grand Total:</span>
                <span>${formatINR(grandTotal)}</span>
              </div>
            </div>

            <div style="border-top:1px dashed var(--border-color); padding-top:0.75rem; text-align:center; font-size:0.75rem; color:var(--text-muted)">
              Thank you for staying at VareX Lodge!
            </div>
          </div>

        </div>
      </div>
    `;

    // Room select listener
    const roomSelect = container.querySelector('#checkout-room-select');
    roomSelect.addEventListener('change', (e) => {
      selectedRoomNumber = e.target.value;
      draw();
    });

    // Extra charges listener
    const extraInput = container.querySelector('#extra-charges-input');
    extraInput.addEventListener('input', (e) => {
      extraCharges = Number(e.target.value) || 0;
      // Partial update - rebuild right side preview details
      drawPreview();
    });

    // Print Receipt listener
    container.querySelector('#btn-print-invoice').addEventListener('click', () => {
      const printContents = container.querySelector('#printable-invoice').innerHTML;
      const originalContents = document.body.innerHTML;
      
      // Simple window print simulation for demo
      const w = window.open();
      w.document.write(`
        <html>
          <head>
            <title>Invoice - Room ${selectedRoom.number}</title>
            <style>
              body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #333; background: #fff; }
              .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
              .invoice-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; font-size: 14px; }
              .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .invoice-table th, .invoice-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; font-size: 14px; }
              .invoice-total-section { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
              .invoice-total-row { display: flex; justify-content: space-between; width: 250px; font-size: 14px; }
              .invoice-total-row.grand-total { font-size: 18px; font-weight: bold; border-top: 1px solid #333; padding-top: 10px; }
            </style>
          </head>
          <body>
            ${printContents}
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      w.document.close();
    });

    // Proceed to payment modal
    container.querySelector('#btn-proceed-checkout').addEventListener('click', () => {
      openCheckoutPaymentModal(guest, selectedRoom, baseCharges, extraCharges, gstAmount, grandTotal);
    });

    function drawPreview() {
      // Small re-calc without full layout reset to preserve cursor inputs
      const currentSelectedRoom = currentOccupiedRooms.find(r => r.number === selectedRoomNumber);
      const tempGst = Math.round((baseCharges + extraCharges) * gstRate);
      const tempTotal = baseCharges + extraCharges + tempGst;

      const pInvoice = container.querySelector('#printable-invoice');
      if (pInvoice) {
        // Re-inject items and totals only
        const tbody = pInvoice.querySelector('tbody');
        tbody.innerHTML = `
          <tr>
            <td>Room Lodging Charges (${currentSelectedRoom.category})</td>
            <td style="text-align:center">${stayDays}</td>
            <td style="text-align:right">${formatINR(currentSelectedRoom.rate)}</td>
            <td style="text-align:right">${formatINR(baseCharges)}</td>
          </tr>
          ${extraCharges > 0 ? `
            <tr>
              <td>Room Service & Miscellaneous</td>
              <td style="text-align:center">1</td>
              <td style="text-align:right">${formatINR(extraCharges)}</td>
              <td style="text-align:right">${formatINR(extraCharges)}</td>
            </tr>
          ` : ''}
        `;

        const totalSection = pInvoice.querySelector('.invoice-total-section');
        totalSection.innerHTML = `
          <div class="invoice-total-row">
            <span>Subtotal:</span>
            <span>${formatINR(baseCharges + extraCharges)}</span>
          </div>
          <div class="invoice-total-row">
            <span>GST (12%):</span>
            <span>${formatINR(tempGst)}</span>
          </div>
          <div class="invoice-total-row grand-total">
            <span>Grand Total:</span>
            <span>${formatINR(tempTotal)}</span>
          </div>
        `;
      }
    }
  }

  function openCheckoutPaymentModal(guest, room, base, extra, gst, total) {
    const overlay = document.getElementById('global-modal');
    const modalBody = document.getElementById('modal-body');

    const formatINR = (val) => '₹' + Number(val).toLocaleString('en-IN');

    modalBody.innerHTML = `
      <span class="modal-close" id="close-checkout-modal">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
      <h3 style="font-size:1.25rem; font-weight:600; margin-bottom:1rem; text-align:center; color:var(--text-inverse)">UPI Payment Gate & Check-Out</h3>
      <p style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:1.5rem">
        Scan QR Code to pay the billing settlement for <strong>Room ${room.number}</strong>.
      </p>

      <div class="payment-qr-container">
        <!-- SVG Mock QR Code -->
        <svg class="mock-qr-code" viewBox="0 0 100 100">
          <rect x="0" y="0" width="100" height="100" fill="#fff" />
          <!-- Mock QR patterns -->
          <rect x="5" y="5" width="25" height="25" fill="#000" />
          <rect x="10" y="10" width="15" height="15" fill="#fff" />
          <rect x="13" y="13" width="9" height="9" fill="#000" />

          <rect x="70" y="5" width="25" height="25" fill="#000" />
          <rect x="75" y="10" width="15" height="15" fill="#fff" />
          <rect x="78" y="13" width="9" height="9" fill="#000" />

          <rect x="5" y="70" width="25" height="25" fill="#000" />
          <rect x="10" y="75" width="15" height="15" fill="#fff" />
          <rect x="13" y="78" width="9" height="9" fill="#000" />
          
          <!-- Random dots inside -->
          <rect x="40" y="10" width="5" height="10" fill="#000" />
          <rect x="50" y="25" width="10" height="5" fill="#000" />
          <rect x="35" y="40" width="15" height="15" fill="#000" />
          <rect x="60" y="45" width="10" height="10" fill="#000" />
          <rect x="45" y="65" width="15" height="5" fill="#000" />
          <rect x="55" y="75" width="5" height="15" fill="#000" />
          <rect x="75" y="75" width="10" height="10" fill="#000" />
        </svg>
        <span style="font-weight:700; font-size:1.25rem; color:var(--text-inverse); margin-top:0.5rem">${formatINR(total)}</span>
        <span style="font-size:0.75rem; color:var(--text-muted)">UPI ID: varex@upi</span>
      </div>

      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; margin-top:1.5rem; font-size:0.85rem">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Room Charges:</span><span>${formatINR(base)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Extra Charges:</span><span>${formatINR(extra)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">GST (12%):</span><span>${formatINR(gst)}</span></div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1rem; margin-top:1.5rem">
        <button class="btn btn-secondary" id="btn-cancel-checkout">Cancel</button>
        <button class="btn btn-success" id="btn-simulate-payment-success">
          Simulate Payment Success
        </button>
      </div>
    `;

    overlay.classList.add('active');

    const close = () => { overlay.classList.remove('active'); };

    modalBody.querySelector('#close-checkout-modal').addEventListener('click', close);
    modalBody.querySelector('#btn-cancel-checkout').addEventListener('click', close);

    modalBody.querySelector('#btn-simulate-payment-success').addEventListener('click', () => {
      // 1. Update Guest status to Checked-Out
      if (guest) {
        store.updateGuest(guest.id, { status: 'Checked-Out' });
      }
      
      // 2. Add Payment record
      const paymentData = {
        id: 'p' + Date.now(),
        guestName: guest ? guest.name : 'Walk-in Guest',
        roomNumber: room.number,
        amount: total,
        date: new Date().toISOString().split('T')[0],
        method: 'UPI QR',
        status: 'Completed'
      };
      store.addPayment(paymentData);

      // 3. Room status changes to Available, cleaningStatus changes to Dirty
      store.updateRoom(room.number, { status: 'Available', cleaningStatus: 'Dirty' });

      showToast(`Checkout complete. Room ${room.number} sent to Cleaning Queue.`, 'success');
      
      close();
      
      // Redirect to Dashboard to see updated stats
      document.querySelector('.nav-link[data-view="dashboard"]').click();
    });
  }

  draw();
}
