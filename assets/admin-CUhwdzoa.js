import"./modulepreload-polyfill-B5Qt9EMX.js";const $={Deluxe:3500,AC:2200,"Non-AC":1200},L=[{id:"101",number:"101",category:"Deluxe",rate:$.Deluxe,status:"Occupied",cleaningStatus:"Clean"},{id:"102",number:"102",category:"Deluxe",rate:$.Deluxe,status:"Available",cleaningStatus:"Clean"},{id:"103",number:"103",category:"Deluxe",rate:$.Deluxe,status:"Available",cleaningStatus:"Dirty"},{id:"201",number:"201",category:"AC",rate:$.AC,status:"Occupied",cleaningStatus:"Clean"},{id:"202",number:"202",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Clean"},{id:"203",number:"203",category:"AC",rate:$.AC,status:"Occupied",cleaningStatus:"Clean"},{id:"204",number:"204",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Dirty"},{id:"205",number:"205",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Clean"},{id:"301",number:"301",category:"Non-AC",rate:$["Non-AC"],status:"Occupied",cleaningStatus:"Clean"},{id:"302",number:"302",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"},{id:"303",number:"303",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Dirty"},{id:"304",number:"304",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"},{id:"305",number:"305",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"}],E=[{id:"g1",name:"Rahul Deshmukh",mobile:"9823456789",address:"Pune, Maharashtra",numGuests:2,checkIn:"2026-06-12",checkOut:"2026-06-15",idType:"Aadhaar Card",idNumber:"4321-8765-9012",status:"Checked-In",roomNumber:"101"},{id:"g2",name:"Sneha Patil",mobile:"9765432109",address:"Kolhapur, Maharashtra",numGuests:1,checkIn:"2026-06-13",checkOut:"2026-06-16",idType:"Driving License",idNumber:"MH-09-20190012345",status:"Checked-In",roomNumber:"201"},{id:"g3",name:"Vijay Kadam",mobile:"8888777766",address:"Mumbai, Maharashtra",numGuests:3,checkIn:"2026-06-14",checkOut:"2026-06-17",idType:"PAN Card",idNumber:"ABCDE1234F",status:"Checked-In",roomNumber:"203"},{id:"g4",name:"Rajesh Shinde",mobile:"9922110033",address:"Nashik, Maharashtra",numGuests:2,checkIn:"2026-06-10",checkOut:"2026-06-14",idType:"Passport",idNumber:"Z1234567",status:"Checked-Out",roomNumber:"301"}],z=[{id:"b1",guestName:"Anil Joshi",mobile:"9011223344",category:"Deluxe",checkIn:"2026-06-16",checkOut:"2026-06-19",numGuests:2,status:"Pending"},{id:"b2",guestName:"Pooja Sawant",mobile:"9890456123",category:"AC",checkIn:"2026-06-18",checkOut:"2026-06-20",numGuests:1,status:"Confirmed"}],B=[{id:"p1",guestName:"Rajesh Shinde",roomNumber:"301",amount:5376,date:"2026-06-14",method:"UPI QR",status:"Completed"},{id:"p2",guestName:"Vikram Joshi",roomNumber:"202",amount:7392,date:"2026-06-13",method:"Cash",status:"Completed"},{id:"p3",guestName:"Deepak Thorat",roomNumber:"102",amount:11760,date:"2026-06-12",method:"Card",status:"Completed"},{id:"p4",guestName:"Sanjay Mane",roomNumber:"304",amount:2688,date:"2026-06-11",method:"UPI QR",status:"Completed"}];class P{constructor(){this.rooms=this._load("varex_rooms",L),this.guests=this._load("varex_guests",E),this.bookings=this._load("varex_bookings",z),this.payments=this._load("varex_payments",B),this.listeners=[],window.addEventListener("storage",a=>{a.key==="varex_rooms"?(this.rooms=this._load("varex_rooms",L),this.notify()):a.key==="varex_guests"?(this.guests=this._load("varex_guests",E),this.notify()):a.key==="varex_bookings"?(this.bookings=this._load("varex_bookings",z),this.notify(),window.dispatchEvent(new CustomEvent("varex-booking-received"))):a.key==="varex_payments"&&(this.payments=this._load("varex_payments",B),this.notify())})}_load(a,i){const n=localStorage.getItem(a);return n?JSON.parse(n):i}_save(a,i){localStorage.setItem(a,JSON.stringify(i)),this.notify()}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(i=>i!==a)}}notify(){this.listeners.forEach(a=>a(this))}getRooms(){return this.rooms}getGuests(){return this.guests}getBookings(){return this.bookings}getPayments(){return this.payments}updateRoom(a,i){this.rooms=this.rooms.map(n=>n.number===a?{...n,...i}:n),this._save("varex_rooms",this.rooms)}updateRoomRates(a,i){this.rooms=this.rooms.map(n=>n.category===a?{...n,rate:Number(i)}:n),this._save("varex_rooms",this.rooms)}addGuest(a){this.guests=[a,...this.guests],this._save("varex_guests",this.guests)}updateGuest(a,i){this.guests=this.guests.map(n=>n.id===a?{...n,...i}:n),this._save("varex_guests",this.guests)}addBooking(a){this.bookings=[a,...this.bookings],this._save("varex_bookings",this.bookings)}updateBookingStatus(a,i){this.bookings=this.bookings.map(n=>n.id===a?{...n,status:i}:n),this._save("varex_bookings",this.bookings)}addPayment(a){this.payments=[a,...this.payments],this._save("varex_payments",this.payments)}}const p=new P;function O(o){const a=p.getRooms(),i=p.getGuests(),n=p.getPayments(),y=p.getBookings(),g=a.length,c=a.filter(t=>t.status==="Occupied").length,r=a.filter(t=>t.status==="Available").length,m=a.filter(t=>t.status==="Cleaning").length,e=n.filter(t=>t.status==="Completed").reduce((t,b)=>t+b.amount,0),s=[];for(let t=4;t>=0;t--){const b=new Date;b.setDate(b.getDate()-t);const C=b.toISOString().split("T")[0];s.push(C)}const l=s.map(t=>{const b=n.filter(C=>C.date===t&&C.status==="Completed").reduce((C,D)=>C+D.amount,0);return{date:t,amount:b}}),u=500,v=180,x=50,f=30,h=Math.max(...l.map(t=>t.amount),5e3)*1.2,w=l.map((t,b)=>{const C=x+b*(u-2*x)/(l.length-1),D=v-f-t.amount/h*(v-2*f);return{x:C,y:D,...t}}),k=w.reduce((t,b,C)=>C===0?`M ${b.x} ${b.y}`:`${t} L ${b.x} ${b.y}`,""),S=w.length>0?`${k} L ${w[w.length-1].x} ${v-f} L ${w[0].x} ${v-f} Z`:"",d=t=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(t),R=[...i.filter(t=>t.status==="Checked-In").map(t=>({type:"checkin",title:`${t.name} Checked-In`,detail:`Room ${t.roomNumber} (${t.numGuests} Guests)`,time:t.checkIn,badgeColor:"var(--color-success)",icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle>'})),...n.map(t=>({type:"payment",title:"Payment Received",detail:`Room ${t.roomNumber} - ${d(t.amount)} via ${t.method}`,time:t.date,badgeColor:"var(--color-info)",icon:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>'})),...y.filter(t=>t.status==="Pending").map(t=>({type:"booking",title:"New Booking Request",detail:`${t.guestName} requesting ${t.category} room`,time:t.checkIn,badgeColor:"var(--color-warning)",icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'}))].sort((t,b)=>new Date(b.time)-new Date(t.time)).slice(0,5);o.innerHTML=`
    <div class="dashboard-grid">
      <!-- Card 1: Occupancy -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Occupied Rooms</h3>
          <p>${c} <span style="font-size: 1rem; font-weight:400; color: var(--text-muted);">/ ${g}</span></p>
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
          <p>${r}</p>
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
          <p>${m}</p>
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
          <p>${d(e)}</p>
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
          <svg class="svg-chart" viewBox="0 0 ${u} ${v}">
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
            <line class="chart-grid-line" x1="${x}" y1="${f}" x2="${u-x}" y2="${f}" />
            <line class="chart-grid-line" x1="${x}" y1="${v/2}" x2="${u-x}" y2="${v/2}" />
            <line class="chart-grid-line" x1="${x}" y1="${v-f}" x2="${u-x}" y2="${v-f}" />
            
            <!-- Area & Line Paths -->
            <path class="chart-area" d="${S}" />
            <path class="chart-line" d="${k}" stroke-dasharray="1000" stroke-dashoffset="1000" />
            
            <!-- Points and Tooltips -->
            ${w.map((t,b)=>`
              <circle class="chart-point" cx="${t.x}" cy="${t.y}" r="6" data-amount="${t.amount}" data-date="${t.date}">
                <title>${t.date}: ${d(t.amount)}</title>
              </circle>
              <text x="${t.x}" y="${v-8}" fill="var(--text-muted)" font-size="9" text-anchor="middle">
                ${t.date.slice(5)}
              </text>
              <text x="${t.x}" y="${t.y-12}" fill="var(--text-inverse)" font-size="10" font-weight="600" text-anchor="middle">
                ${t.amount>0?d(t.amount):""}
              </text>
            `).join("")}
          </svg>
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="glass-card chart-card">
        <div class="card-header">
          <h3>Recent Operations</h3>
          <span class="badge badge-pending">${R.length} logs</span>
        </div>
        <ul class="recent-activity-list">
          ${R.map(t=>`
            <li class="activity-item">
              <div class="activity-badge" style="background: rgba(255, 255, 255, 0.05); color: ${t.badgeColor}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  ${t.icon}
                </svg>
              </div>
              <div class="activity-details">
                <h5>${t.title}</h5>
                <p>${t.detail}</p>
              </div>
              <div class="activity-time">${t.time.slice(5)}</div>
            </li>
          `).join("")}
          ${R.length===0?'<li class="text-muted" style="text-align:center; padding: 2rem;">No recent activities logged.</li>':""}
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
  `,o.querySelector("#btn-quick-checkin").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="checkin"]').click()}),o.querySelector("#btn-quick-rooms").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="rooms"]').click()}),o.querySelector("#btn-quick-billing").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="billing"]').click()})}function _(o){let a="all",i="all";function n(){const y=p.getRooms(),g=["Deluxe","AC","Non-AC"],c={};g.forEach(e=>{const s=y.find(l=>l.category===e);c[e]=s?s.rate:0});const r=y.filter(e=>{const s=a==="all"||a==="cleaning"&&e.cleaningStatus==="Dirty"||a.toLowerCase()===e.status.toLowerCase(),l=i==="all"||e.category===i;return s&&l});o.innerHTML=`
      <!-- Filters and Header Controls -->
      <div class="rooms-filter-bar">
        <div class="filter-group">
          <button class="filter-btn ${a==="all"?"active":""}" data-status="all">All Rooms</button>
          <button class="filter-btn ${a==="available"?"active":""}" data-status="available">Available</button>
          <button class="filter-btn ${a==="occupied"?"active":""}" data-status="occupied">Occupied</button>
          <button class="filter-btn ${a==="cleaning"?"active":""}" data-status="cleaning">Needs Cleaning</button>
        </div>

        <div class="filter-group">
          <button class="filter-btn ${i==="all"?"active":""}" data-category="all">All Types</button>
          <button class="filter-btn ${i==="Deluxe"?"active":""}" data-category="Deluxe">Deluxe</button>
          <button class="filter-btn ${i==="AC"?"active":""}" data-category="AC">AC</button>
          <button class="filter-btn ${i==="Non-AC"?"active":""}" data-category="Non-AC">Non-AC</button>
        </div>
      </div>

      <!-- Rooms Grid Layout -->
      <div class="rooms-grid">
        ${r.map(e=>{let s="badge-available",l="Available";return e.status==="Occupied"?(s="badge-occupied",l="Occupied"):e.cleaningStatus==="Dirty"&&(s="badge-cleaning",l="Needs Cleaning"),`
            <div class="glass-card room-card ${e.status.toLowerCase()}">
              <div class="room-header">
                <span class="room-number">Room ${e.number}</span>
                <span class="badge ${s}">${l}</span>
              </div>
              <div>
                <span class="room-category">${e.category}</span>
                <span style="margin-left: 0.5rem; font-size: 0.75rem; color: ${e.cleaningStatus==="Clean"?"var(--color-success)":"var(--color-warning)"}">
                  ● ${e.cleaningStatus==="Clean"?"Clean":"Dirty"}
                </span>
              </div>
              <div class="room-rate">₹${e.rate.toLocaleString("en-IN")}/day</div>
              <div class="room-actions">
                ${e.cleaningStatus==="Dirty"?`
                  <button class="btn-clean" data-room="${e.number}" style="background: var(--color-warning-glow); border-color: var(--color-warning); color: var(--color-warning)">
                    Mark Cleaned
                  </button>
                `:""}
                ${e.status==="Available"&&e.cleaningStatus==="Clean"?`
                  <button class="btn-checkin" data-room="${e.number}" data-category="${e.category}">
                    Check-In
                  </button>
                `:""}
                ${e.status==="Occupied"?`
                  <button class="btn-checkout" data-room="${e.number}">
                    Bill & Check-Out
                  </button>
                `:""}
              </div>
            </div>
          `}).join("")}
        ${r.length===0?'<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No rooms match your filters.</div>':""}
      </div>

      <!-- Room Rate Management Panel -->
      <div class="glass-card" style="margin-top: 3rem; padding: 2rem;">
        <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem; font-weight:600;">Room Rates Management</h3>
        <form id="rate-management-form" style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-end;">
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">Deluxe Room Rate (₹)</label>
            <input type="number" id="rate-deluxe" class="form-input" value="${c.Deluxe}" required min="500">
          </div>
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">AC Room Rate (₹)</label>
            <input type="number" id="rate-ac" class="form-input" value="${c.AC}" required min="500">
          </div>
          <div class="form-group" style="flex: 1; min-width: 150px;">
            <label class="form-label">Non-AC Room Rate (₹)</label>
            <input type="number" id="rate-nonac" class="form-input" value="${c["Non-AC"]}" required min="300">
          </div>
          <button type="submit" class="btn btn-primary" style="height: 43px;">Update Rates</button>
        </form>
      </div>
    `,o.querySelectorAll(".filter-btn[data-status]").forEach(e=>{e.addEventListener("click",s=>{a=s.target.dataset.status,n()})}),o.querySelectorAll(".filter-btn[data-category]").forEach(e=>{e.addEventListener("click",s=>{i=s.target.dataset.category,n()})}),o.querySelectorAll(".btn-clean").forEach(e=>{e.addEventListener("click",s=>{const l=s.target.dataset.room;p.updateRoom(l,{cleaningStatus:"Clean"}),A(`Room ${l} is now clean and available.`,"success"),n()})}),o.querySelectorAll(".btn-checkin").forEach(e=>{e.addEventListener("click",s=>{const l=s.target.dataset.room,u=s.target.dataset.category;window.preSelectedRoom=l,window.preSelectedCategory=u,document.querySelector('.nav-link[data-view="checkin"]').click()})}),o.querySelectorAll(".btn-checkout").forEach(e=>{e.addEventListener("click",s=>{const l=s.target.dataset.room;window.preSelectedCheckoutRoom=l,document.querySelector('.nav-link[data-view="billing"]').click()})});const m=o.querySelector("#rate-management-form");m&&m.addEventListener("submit",e=>{e.preventDefault();const s=o.querySelector("#rate-deluxe").value,l=o.querySelector("#rate-ac").value,u=o.querySelector("#rate-nonac").value;p.updateRoomRates("Deluxe",s),p.updateRoomRates("AC",l),p.updateRoomRates("Non-AC",u),A("Room rates updated successfully!","success"),n()})}n()}function H(o){const a=p.getRooms(),i=c=>a.filter(r=>r.category===c&&r.status==="Available"&&r.cleaningStatus==="Clean"),n=window.preSelectedRoom||"",y=window.preSelectedCategory||"Deluxe";window.preSelectedRoom=null,window.preSelectedCategory=null;function g(){var w;const c=new Date().toISOString().split("T")[0],r=new Date;r.setDate(r.getDate()+1);const m=r.toISOString().split("T")[0],e=((w=o.querySelector("#guest-category"))==null?void 0:w.value)||y,s=i(e);o.innerHTML=`
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
                <option value="Deluxe" ${e==="Deluxe"?"selected":""}>Deluxe (₹3,500/day)</option>
                <option value="AC" ${e==="AC"?"selected":""}>AC (₹2,200/day)</option>
                <option value="Non-AC" ${e==="Non-AC"?"selected":""}>Non-AC (₹1,200/day)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="guest-room">Assign Room</label>
              <select id="guest-room" class="form-input" required style="background-color: #12131a">
                ${n?`<option value="${n}" selected>Room ${n} (Pre-selected)</option>`:""}
                ${s.map(k=>`<option value="${k.number}">Room ${k.number}</option>`).join("")}
                ${s.length===0&&!n?'<option value="" disabled>No clean rooms available in this category</option>':""}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkin-date">Check-In Date</label>
              <input type="date" id="checkin-date" class="form-input" value="${c}" min="${c}" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkout-date">Check-Out Date</label>
              <input type="date" id="checkout-date" class="form-input" value="${m}" min="${m}" required>
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
    `,o.querySelector("#guest-category").addEventListener("change",()=>{g()});const u=o.querySelector("#id-file-input"),v=o.querySelector("#file-status"),x=o.querySelector("#uploader-text"),f=o.querySelector("#id-file-uploader");u.addEventListener("change",k=>{if(k.target.files.length>0){const S=k.target.files[0];x.textContent=`File: ${S.name}`,v.style.display="block",f.style.borderColor="var(--color-success)"}}),o.querySelector("#checkin-registration-form").addEventListener("submit",k=>{k.preventDefault();const S=o.querySelector("#guest-room").value;if(!S){A("Please allocate a valid room before completing check-in.","error");return}const d={id:"g"+Date.now(),name:o.querySelector("#guest-name").value,mobile:o.querySelector("#guest-mobile").value,address:o.querySelector("#guest-address").value,numGuests:Number(o.querySelector("#guest-count").value),checkIn:o.querySelector("#checkin-date").value,checkOut:o.querySelector("#checkout-date").value,idType:o.querySelector("#id-type").value,idNumber:o.querySelector("#id-number").value,status:"Checked-In",roomNumber:S};p.addGuest(d),p.updateRoom(S,{status:"Occupied"}),A(`Guest ${d.name} registered and assigned to Room ${S}.`,"success"),document.querySelector('.nav-link[data-view="rooms"]').click()})}g()}function j(o){let a="",i="all";function n(){const c=p.getGuests().filter(e=>{const s=e.name.toLowerCase().includes(a.toLowerCase())||e.mobile.includes(a)||e.roomNumber&&e.roomNumber.includes(a),l=i==="all"||i==="checked-in"&&e.status==="Checked-In"||i==="checked-out"&&e.status==="Checked-Out";return s&&l});o.innerHTML=`
      <!-- Search & Filters -->
      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="guest-search-input" class="form-input" placeholder="Search guests by name, phone or room number..." value="${a}">
        </div>
        <select id="guest-status-filter" class="form-input" style="width: 180px; background-color:#12131a">
          <option value="all" ${i==="all"?"selected":""}>All Statuses</option>
          <option value="checked-in" ${i==="checked-in"?"selected":""}>Checked-In Only</option>
          <option value="checked-out" ${i==="checked-out"?"selected":""}>Checked-Out Only</option>
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
            ${c.map(e=>`
              <tr class="guest-row-item" data-id="${e.id}" style="cursor:pointer">
                <td style="font-weight:600">${e.name}</td>
                <td>Room ${e.roomNumber||"N/A"}</td>
                <td>${e.mobile}</td>
                <td>${e.checkIn}</td>
                <td>${e.checkOut}</td>
                <td>
                  <span class="badge ${e.status==="Checked-In"?"badge-available":"badge-occupied"}">
                    ${e.status}
                  </span>
                </td>
                <td style="text-align:right">
                  <button class="btn btn-secondary btn-view-profile" data-id="${e.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
                    View Profile
                  </button>
                </td>
              </tr>
            `).join("")}
            ${c.length===0?'<tr><td colspan="7" style="text-align:center; padding:3rem; color:var(--text-muted);">No guest logs match your search.</td></tr>':""}
          </tbody>
        </table>
      </div>
    `,o.querySelector("#guest-search-input").addEventListener("input",e=>{a=e.target.value,n();const s=o.querySelector("#guest-search-input");s.focus(),s.setSelectionRange(s.value.length,s.value.length)}),o.querySelector("#guest-status-filter").addEventListener("change",e=>{i=e.target.value,n()}),o.querySelectorAll(".guest-row-item").forEach(e=>{e.addEventListener("click",s=>{const l=e.dataset.id;y(l)})})}function y(g){const c=p.getGuests().find(s=>s.id===g);if(!c)return;const r=document.getElementById("global-modal"),m=document.getElementById("modal-body");m.innerHTML=`
      <span class="modal-close" id="close-guest-modal">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
      <div style="text-align:center; margin-bottom:1.5rem">
        <div class="user-avatar" style="width: 72px; height: 72px; font-size: 1.75rem; margin: 0 auto 0.75rem;">
          ${c.name.charAt(0)}${c.name.split(" ")[1]?c.name.split(" ")[1].charAt(0):""}
        </div>
        <h3 style="font-size:1.5rem; font-weight:600; color:var(--text-inverse)">${c.name}</h3>
        <p style="color:var(--text-muted)">Guest Profile Card</p>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem; font-size:0.9rem;">
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Contact Number</span>
          <span style="color:var(--text-main); font-weight:500;">${c.mobile}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Permanent Address</span>
          <span style="color:var(--text-main); font-weight:500;">${c.address}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Assigned Room</span>
          <span style="color:var(--text-main); font-weight:500;">Room ${c.roomNumber||"N/A"}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Total Guests</span>
          <span style="color:var(--text-main); font-weight:500;">${c.numGuests} person(s)</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Check-In Date</span>
          <span style="color:var(--text-main); font-weight:500;">${c.checkIn}</span>
        </div>
        <div>
          <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.25rem;">Check-Out Date</span>
          <span style="color:var(--text-main); font-weight:500;">${c.checkOut||"N/A"}</span>
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
            <span style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-inverse)">${c.idType}</span>
            <span style="display:block; font-size:0.75rem; color:var(--text-muted)">Number: ${c.idNumber}</span>
          </div>
          <span class="badge badge-available" style="margin-left:auto;">VERIFIED</span>
        </div>
      </div>
      
      <div style="display:flex; justify-content:flex-end; margin-top:2rem">
        <button class="btn btn-secondary" id="close-profile-modal-btn">Close Profile</button>
      </div>
    `,r.classList.add("active");const e=()=>{r.classList.remove("active")};m.querySelector("#close-guest-modal").addEventListener("click",e),m.querySelector("#close-profile-modal-btn").addEventListener("click",e)}n()}function V(o){const a=p.getRooms(),i=p.getGuests(),n=a.filter(m=>m.status==="Occupied");let y=window.preSelectedCheckoutRoom||(n.length>0?n[0].number:"");window.preSelectedCheckoutRoom=null;let g=0;function c(){const m=p.getRooms().filter(d=>d.status==="Occupied");if(m.length===0){o.innerHTML=`
        <div class="glass-card" style="text-align:center; padding: 4rem 2rem;">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--text-muted)" stroke-width="2" style="margin-bottom: 1.5rem">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <h3 style="font-size:1.5rem; font-weight:600; margin-bottom:0.5rem">All Rooms Are Vacant</h3>
          <p style="color:var(--text-muted); max-width:400px; margin:0 auto 1.5rem">There are no occupied rooms in the lodge right now. Go to the check-in page to register a new guest.</p>
          <button class="btn btn-primary" onclick="document.querySelector('.nav-link[data-view=\\'checkin\\']').click()">Go to Check-In</button>
        </div>
      `;return}const e=m.find(d=>d.number===y)||m[0];y=e.number;const s=i.find(d=>d.roomNumber===y&&d.status==="Checked-In");let l=1;if(s){const d=new Date(s.checkIn),t=Math.abs(new Date-d);l=Math.ceil(t/(1e3*60*60*24)),l<=0&&(l=1)}const u=e.rate*l,v=.12,x=Math.round((u+g)*v),f=u+g+x,h=d=>"₹"+Number(d).toLocaleString("en-IN");o.innerHTML=`
      <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:1.5rem; max-width: 1100px; margin:0 auto;">
        
        <!-- Left Side: Invoice Controls -->
        <div class="glass-card" style="padding: 2rem; display:flex; flex-direction:column; gap:1.5rem;">
          <h3 style="font-size:1.25rem; font-weight:600;">Check-Out Calculator</h3>
          
          <div class="form-group">
            <label class="form-label" for="checkout-room-select">Select Occupied Room</label>
            <select id="checkout-room-select" class="form-input" style="background-color:#12131a">
              ${m.map(d=>`<option value="${d.number}" ${d.number===y?"selected":""}>Room ${d.number} (${d.category})</option>`).join("")}
            </select>
          </div>

          ${s?`
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; font-size:0.85rem; display:flex; flex-direction:column; gap:0.5rem">
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Guest Name:</span><span style="font-weight:600">${s.name}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Contact:</span><span>${s.mobile}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Check-In:</span><span>${s.checkIn}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Stay Duration:</span><span style="font-weight:600">${l} day(s)</span></div>
            </div>
          `:""}

          <div class="form-group">
            <label class="form-label" for="extra-charges-input">Extra/Room Service Charges (₹)</label>
            <input type="number" id="extra-charges-input" class="form-input" value="${g}" min="0">
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
                <span style="font-size:0.75rem; color:var(--text-muted)">INV-2026-${1e3+Math.floor(Math.random()*9e3)}</span>
              </div>
            </div>

            <div class="invoice-details">
              <div>
                <strong style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">BILLED TO:</strong>
                <span>${s?s.name:"Walk-in Guest"}</span><br>
                <span style="color:var(--text-muted)">${s?s.mobile:""}</span>
              </div>
              <div style="text-align:right">
                <strong style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">DETAILS:</strong>
                <span>Room Number: ${e.number}</span><br>
                <span>Category: ${e.category}</span>
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
                  <td>Room Lodging Charges (${e.category})</td>
                  <td style="text-align:center">${l}</td>
                  <td style="text-align:right">${h(e.rate)}</td>
                  <td style="text-align:right">${h(u)}</td>
                </tr>
                ${g>0?`
                  <tr>
                    <td>Room Service & Miscellaneous</td>
                    <td style="text-align:center">1</td>
                    <td style="text-align:right">${h(g)}</td>
                    <td style="text-align:right">${h(g)}</td>
                  </tr>
                `:""}
              </tbody>
            </table>

            <div class="invoice-total-section">
              <div class="invoice-total-row">
                <span>Subtotal:</span>
                <span>${h(u+g)}</span>
              </div>
              <div class="invoice-total-row">
                <span>GST (12%):</span>
                <span>${h(x)}</span>
              </div>
              <div class="invoice-total-row grand-total">
                <span>Grand Total:</span>
                <span>${h(f)}</span>
              </div>
            </div>

            <div style="border-top:1px dashed var(--border-color); padding-top:0.75rem; text-align:center; font-size:0.75rem; color:var(--text-muted)">
              Thank you for staying at VareX Lodge!
            </div>
          </div>

        </div>
      </div>
    `,o.querySelector("#checkout-room-select").addEventListener("change",d=>{y=d.target.value,c()}),o.querySelector("#extra-charges-input").addEventListener("input",d=>{g=Number(d.target.value)||0,S()}),o.querySelector("#btn-print-invoice").addEventListener("click",()=>{const d=o.querySelector("#printable-invoice").innerHTML;document.body.innerHTML;const R=window.open();R.document.write(`
        <html>
          <head>
            <title>Invoice - Room ${e.number}</title>
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
            ${d}
            <script>window.print(); window.close();<\/script>
          </body>
        </html>
      `),R.document.close()}),o.querySelector("#btn-proceed-checkout").addEventListener("click",()=>{r(s,e,u,g,x,f)});function S(){const d=m.find(C=>C.number===y),R=Math.round((u+g)*v),t=u+g+R,b=o.querySelector("#printable-invoice");if(b){const C=b.querySelector("tbody");C.innerHTML=`
          <tr>
            <td>Room Lodging Charges (${d.category})</td>
            <td style="text-align:center">${l}</td>
            <td style="text-align:right">${h(d.rate)}</td>
            <td style="text-align:right">${h(u)}</td>
          </tr>
          ${g>0?`
            <tr>
              <td>Room Service & Miscellaneous</td>
              <td style="text-align:center">1</td>
              <td style="text-align:right">${h(g)}</td>
              <td style="text-align:right">${h(g)}</td>
            </tr>
          `:""}
        `;const D=b.querySelector(".invoice-total-section");D.innerHTML=`
          <div class="invoice-total-row">
            <span>Subtotal:</span>
            <span>${h(u+g)}</span>
          </div>
          <div class="invoice-total-row">
            <span>GST (12%):</span>
            <span>${h(R)}</span>
          </div>
          <div class="invoice-total-row grand-total">
            <span>Grand Total:</span>
            <span>${h(t)}</span>
          </div>
        `}}}function r(m,e,s,l,u,v){const x=document.getElementById("global-modal"),f=document.getElementById("modal-body"),h=k=>"₹"+Number(k).toLocaleString("en-IN");f.innerHTML=`
      <span class="modal-close" id="close-checkout-modal">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
      <h3 style="font-size:1.25rem; font-weight:600; margin-bottom:1rem; text-align:center; color:var(--text-inverse)">UPI Payment Gate & Check-Out</h3>
      <p style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:1.5rem">
        Scan QR Code to pay the billing settlement for <strong>Room ${e.number}</strong>.
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
        <span style="font-weight:700; font-size:1.25rem; color:var(--text-inverse); margin-top:0.5rem">${h(v)}</span>
        <span style="font-size:0.75rem; color:var(--text-muted)">UPI ID: varex@upi</span>
      </div>

      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; margin-top:1.5rem; font-size:0.85rem">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Room Charges:</span><span>${h(s)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Extra Charges:</span><span>${h(l)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">GST (12%):</span><span>${h(u)}</span></div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1rem; margin-top:1.5rem">
        <button class="btn btn-secondary" id="btn-cancel-checkout">Cancel</button>
        <button class="btn btn-success" id="btn-simulate-payment-success">
          Simulate Payment Success
        </button>
      </div>
    `,x.classList.add("active");const w=()=>{x.classList.remove("active")};f.querySelector("#close-checkout-modal").addEventListener("click",w),f.querySelector("#btn-cancel-checkout").addEventListener("click",w),f.querySelector("#btn-simulate-payment-success").addEventListener("click",()=>{m&&p.updateGuest(m.id,{status:"Checked-Out"});const k={id:"p"+Date.now(),guestName:m?m.name:"Walk-in Guest",roomNumber:e.number,amount:v,date:new Date().toISOString().split("T")[0],method:"UPI QR",status:"Completed"};p.addPayment(k),p.updateRoom(e.number,{status:"Available",cleaningStatus:"Dirty"}),A(`Checkout complete. Room ${e.number} sent to Cleaning Queue.`,"success"),w(),document.querySelector('.nav-link[data-view="dashboard"]').click()})}c()}function F(o){function a(){const i=p.getBookings(),n=p.getRooms(),y=i.filter(r=>r.status==="Pending"),g=i.filter(r=>r.status==="Confirmed"||r.status==="Approved"),c={Deluxe:0,AC:0,"Non-AC":0};y.forEach(r=>{c[r.category]!==void 0&&c[r.category]++}),o.innerHTML=`
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
            <div style="display:flex; justify-content:space-between"><span>Pending Requests:</span><span style="font-weight:600; color:var(--color-warning)">${y.length} bookings</span></div>
            <div style="display:flex; justify-content:space-between"><span>Deluxe Rooms Demand:</span><span>${c.Deluxe} queue</span></div>
            <div style="display:flex; justify-content:space-between"><span>AC Rooms Demand:</span><span>${c.AC} queue</span></div>
            <div style="display:flex; justify-content:space-between"><span>Non-AC Rooms Demand:</span><span>${c["Non-AC"]} queue</span></div>
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
              <span class="badge badge-cleaning" style="font-size:0.75rem">${y.length} Pending</span>
            </h3>

            <div style="display:flex; flex-direction:column; gap:1rem; max-height: 250px; overflow-y:auto; padding-right:5px">
              ${y.map(r=>`
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; display:flex; flex-direction:column; gap:0.5rem">
                  <div style="display:flex; justify-content:space-between; align-items:center">
                    <strong style="font-size:0.9rem; color:var(--text-inverse)">${r.guestName}</strong>
                    <span class="badge badge-pending">${r.category}</span>
                  </div>
                  <div style="font-size:0.75rem; color:var(--text-muted)">
                    <span>Phone: ${r.mobile} | Guests: ${r.numGuests}</span><br>
                    <span>Stay: ${r.checkIn} to ${r.checkOut}</span>
                  </div>
                  <div style="display:flex; gap:0.5rem; margin-top:0.25rem">
                    <button class="btn btn-success btn-approve-booking" data-id="${r.id}" data-category="${r.category}" style="flex-grow:1; padding:0.3rem; font-size:0.75rem">
                      Approve & Allocate Room
                    </button>
                    <button class="btn btn-secondary btn-reject-booking" data-id="${r.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-color:var(--color-danger); color:var(--color-danger)">
                      Reject
                    </button>
                  </div>
                </div>
              `).join("")}
              ${y.length===0?'<p style="color:var(--text-muted); text-align:center; padding:2rem; font-size:0.85rem">No incoming reservation requests.</p>':""}
            </div>
          </div>

          <!-- Confirmed/Approved Bookings -->
          <div class="glass-card" style="padding:1.5rem; flex-grow:1;">
            <h3 style="font-size:1.1rem; font-weight:600; margin-bottom:1rem;">Confirmed Booking History</h3>
            <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:220px; overflow-y:auto; padding-right:5px">
              ${g.map(r=>`
                <div style="background:rgba(255,255,255,0.02); border-radius:var(--border-radius-md); padding:0.75rem; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.03)">
                  <div>
                    <h5 style="font-size:0.85rem; font-weight:500; color:var(--text-inverse)">${r.guestName}</h5>
                    <span style="font-size:0.75rem; color:var(--text-muted)">Stay: ${r.checkIn} (${r.category})</span>
                  </div>
                  <span class="badge badge-available">CONFIRMED</span>
                </div>
              `).join("")}
              ${g.length===0?'<p style="color:var(--text-muted); text-align:center; padding:1.5rem; font-size:0.85rem">No bookings confirmed yet.</p>':""}
            </div>
          </div>

        </div>
      </div>
    `,o.querySelector("#btn-open-website").addEventListener("click",()=>{window.open("/index.html","_blank")}),o.querySelectorAll(".btn-approve-booking").forEach(r=>{r.addEventListener("click",m=>{const e=m.target.dataset.id,s=m.target.dataset.category,l=n.find(v=>v.category===s&&v.status==="Available"&&v.cleaningStatus==="Clean");if(!l){A(`Cannot approve: No clean ${s} rooms available right now. Please clean or vacant a room first.`,"error");return}p.updateBookingStatus(e,"Confirmed");const u=p.getBookings().find(v=>v.id===e);if(u){const v={id:"g"+Date.now(),name:u.guestName,mobile:u.mobile,address:"Online Booking Reservation",numGuests:u.numGuests,checkIn:u.checkIn,checkOut:u.checkOut,idType:"Aadhaar Card",idNumber:"VERIFIED-ONLINE",status:"Checked-In",roomNumber:l.number};p.addGuest(v),p.updateRoom(l.number,{status:"Occupied"})}A(`Booking Approved! Room ${l.number} allocated to ${u.guestName}.`,"success"),a()})}),o.querySelectorAll(".btn-reject-booking").forEach(r=>{r.addEventListener("click",m=>{const e=m.target.dataset.id;p.updateBookingStatus(e,"Rejected"),A("Booking request rejected.","info"),a()})})}a()}const N=document.getElementById("view-title"),I=document.getElementById("main-viewport"),Q=document.getElementById("current-time-clock"),M=document.querySelectorAll(".nav-link"),U=document.getElementById("quick-checkout-action"),G=document.getElementById("toast-alerts-container");let T="dashboard";function X(){const o=()=>{const a=new Date;Q.textContent=a.toLocaleTimeString("en-US",{hour12:!0})};o(),setInterval(o,1e3)}function A(o,a="info"){const i=document.createElement("div");i.className=`toast ${a}`;let n="";a==="success"?n='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>':a==="error"?n='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':n='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',i.innerHTML=`${n}<span>${o}</span>`,G.appendChild(i),setTimeout(()=>{i.style.animation="slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse",setTimeout(()=>{i.parentNode&&G.removeChild(i)},300)},3500)}function q(o){switch(T=o,M.forEach(a=>{a.dataset.view===o?a.classList.add("active"):a.classList.remove("active")}),o){case"dashboard":N.textContent="Dashboard Overview",O(I);break;case"rooms":N.textContent="Rooms Status Matrix",_(I);break;case"checkin":N.textContent="Guest Check-In Desk",H(I);break;case"guests":N.textContent="Guest Registration History",j(I);break;case"billing":N.textContent="Checkout Billing & Invoice",V(I);break;case"bookingSimulator":N.textContent="Online Reservations Simulator",F(I);break;default:N.textContent="Dashboard",O(I)}}M.forEach(o=>{o.addEventListener("click",a=>{a.preventDefault();const i=o.dataset.view;q(i)})});U.addEventListener("click",()=>{q("billing")});p.subscribe(()=>{q(T)});window.addEventListener("varex-booking-received",()=>{A("New Online Booking Request Received!","info")});X();q("dashboard");A("Welcome to VareX Lodge Management Terminal.","success");
