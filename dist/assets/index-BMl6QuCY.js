(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))i(d);new MutationObserver(d=>{for(const l of d)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(d){const l={};return d.integrity&&(l.integrity=d.integrity),d.referrerPolicy&&(l.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?l.credentials="include":d.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(d){if(d.ep)return;d.ep=!0;const l=r(d);fetch(d.href,l)}})();const $={Deluxe:3500,AC:2200,"Non-AC":1200},z=[{id:"101",number:"101",category:"Deluxe",rate:$.Deluxe,status:"Occupied",cleaningStatus:"Clean"},{id:"102",number:"102",category:"Deluxe",rate:$.Deluxe,status:"Available",cleaningStatus:"Clean"},{id:"103",number:"103",category:"Deluxe",rate:$.Deluxe,status:"Available",cleaningStatus:"Dirty"},{id:"201",number:"201",category:"AC",rate:$.AC,status:"Occupied",cleaningStatus:"Clean"},{id:"202",number:"202",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Clean"},{id:"203",number:"203",category:"AC",rate:$.AC,status:"Occupied",cleaningStatus:"Clean"},{id:"204",number:"204",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Dirty"},{id:"205",number:"205",category:"AC",rate:$.AC,status:"Available",cleaningStatus:"Clean"},{id:"301",number:"301",category:"Non-AC",rate:$["Non-AC"],status:"Occupied",cleaningStatus:"Clean"},{id:"302",number:"302",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"},{id:"303",number:"303",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Dirty"},{id:"304",number:"304",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"},{id:"305",number:"305",category:"Non-AC",rate:$["Non-AC"],status:"Available",cleaningStatus:"Clean"}],B=[{id:"g1",name:"Rahul Deshmukh",mobile:"9823456789",address:"Pune, Maharashtra",numGuests:2,checkIn:"2026-06-12",checkOut:"2026-06-15",idType:"Aadhaar Card",idNumber:"4321-8765-9012",status:"Checked-In",roomNumber:"101"},{id:"g2",name:"Sneha Patil",mobile:"9765432109",address:"Kolhapur, Maharashtra",numGuests:1,checkIn:"2026-06-13",checkOut:"2026-06-16",idType:"Driving License",idNumber:"MH-09-20190012345",status:"Checked-In",roomNumber:"201"},{id:"g3",name:"Vijay Kadam",mobile:"8888777766",address:"Mumbai, Maharashtra",numGuests:3,checkIn:"2026-06-14",checkOut:"2026-06-17",idType:"PAN Card",idNumber:"ABCDE1234F",status:"Checked-In",roomNumber:"203"},{id:"g4",name:"Rajesh Shinde",mobile:"9922110033",address:"Nashik, Maharashtra",numGuests:2,checkIn:"2026-06-10",checkOut:"2026-06-14",idType:"Passport",idNumber:"Z1234567",status:"Checked-Out",roomNumber:"301"}],T=[{id:"b1",guestName:"Anil Joshi",mobile:"9011223344",category:"Deluxe",checkIn:"2026-06-16",checkOut:"2026-06-19",numGuests:2,status:"Pending"},{id:"b2",guestName:"Pooja Sawant",mobile:"9890456123",category:"AC",checkIn:"2026-06-18",checkOut:"2026-06-20",numGuests:1,status:"Confirmed"}],M=[{id:"p1",guestName:"Rajesh Shinde",roomNumber:"301",amount:5376,date:"2026-06-14",method:"UPI QR",status:"Completed"},{id:"p2",guestName:"Vikram Joshi",roomNumber:"202",amount:7392,date:"2026-06-13",method:"Cash",status:"Completed"},{id:"p3",guestName:"Deepak Thorat",roomNumber:"102",amount:11760,date:"2026-06-12",method:"Card",status:"Completed"},{id:"p4",guestName:"Sanjay Mane",roomNumber:"304",amount:2688,date:"2026-06-11",method:"UPI QR",status:"Completed"}];class P{constructor(){this.rooms=this._load("varex_rooms",z),this.guests=this._load("varex_guests",B),this.bookings=this._load("varex_bookings",T),this.payments=this._load("varex_payments",M),this.listeners=[]}_load(s,r){const i=localStorage.getItem(s);return i?JSON.parse(i):r}_save(s,r){localStorage.setItem(s,JSON.stringify(r)),this.notify()}subscribe(s){return this.listeners.push(s),()=>{this.listeners=this.listeners.filter(r=>r!==s)}}notify(){this.listeners.forEach(s=>s(this))}getRooms(){return this.rooms}getGuests(){return this.guests}getBookings(){return this.bookings}getPayments(){return this.payments}updateRoom(s,r){this.rooms=this.rooms.map(i=>i.number===s?{...i,...r}:i),this._save("varex_rooms",this.rooms)}updateRoomRates(s,r){this.rooms=this.rooms.map(i=>i.category===s?{...i,rate:Number(r)}:i),this._save("varex_rooms",this.rooms)}addGuest(s){this.guests=[s,...this.guests],this._save("varex_guests",this.guests)}updateGuest(s,r){this.guests=this.guests.map(i=>i.id===s?{...i,...r}:i),this._save("varex_guests",this.guests)}addBooking(s){this.bookings=[s,...this.bookings],this._save("varex_bookings",this.bookings)}updateBookingStatus(s,r){this.bookings=this.bookings.map(i=>i.id===s?{...i,status:r}:i),this._save("varex_bookings",this.bookings)}addPayment(s){this.payments=[s,...this.payments],this._save("varex_payments",this.payments)}}const g=new P;function L(a){const s=g.getRooms(),r=g.getGuests(),i=g.getPayments(),d=g.getBookings(),l=s.length,c=s.filter(o=>o.status==="Occupied").length,y=s.filter(o=>o.status==="Available").length,p=s.filter(o=>o.status==="Cleaning").length,e=i.filter(o=>o.status==="Completed").reduce((o,x)=>o+x.amount,0),t=[];for(let o=4;o>=0;o--){const x=new Date;x.setDate(x.getDate()-o);const C=x.toISOString().split("T")[0];t.push(C)}const n=t.map(o=>{const x=i.filter(C=>C.date===o&&C.status==="Completed").reduce((C,D)=>C+D.amount,0);return{date:o,amount:x}}),v=500,f=180,b=50,h=30,m=Math.max(...n.map(o=>o.amount),5e3)*1.2,w=n.map((o,x)=>{const C=b+x*(v-2*b)/(n.length-1),D=f-h-o.amount/m*(f-2*h);return{x:C,y:D,...o}}),k=w.reduce((o,x,C)=>C===0?`M ${x.x} ${x.y}`:`${o} L ${x.x} ${x.y}`,""),S=w.length>0?`${k} L ${w[w.length-1].x} ${f-h} L ${w[0].x} ${f-h} Z`:"",u=o=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(o),R=[...r.filter(o=>o.status==="Checked-In").map(o=>({type:"checkin",title:`${o.name} Checked-In`,detail:`Room ${o.roomNumber} (${o.numGuests} Guests)`,time:o.checkIn,badgeColor:"var(--color-success)",icon:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle>'})),...i.map(o=>({type:"payment",title:"Payment Received",detail:`Room ${o.roomNumber} - ${u(o.amount)} via ${o.method}`,time:o.date,badgeColor:"var(--color-info)",icon:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>'})),...d.filter(o=>o.status==="Pending").map(o=>({type:"booking",title:"New Booking Request",detail:`${o.guestName} requesting ${o.category} room`,time:o.checkIn,badgeColor:"var(--color-warning)",icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'}))].sort((o,x)=>new Date(x.time)-new Date(o.time)).slice(0,5);a.innerHTML=`
    <div class="dashboard-grid">
      <!-- Card 1: Occupancy -->
      <div class="glass-card metric-card">
        <div class="metric-info">
          <h3>Occupied Rooms</h3>
          <p>${c} <span style="font-size: 1rem; font-weight:400; color: var(--text-muted);">/ ${l}</span></p>
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
          <p>${y}</p>
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
          <p>${p}</p>
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
          <p>${u(e)}</p>
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
          <svg class="svg-chart" viewBox="0 0 ${v} ${f}">
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
            <line class="chart-grid-line" x1="${b}" y1="${h}" x2="${v-b}" y2="${h}" />
            <line class="chart-grid-line" x1="${b}" y1="${f/2}" x2="${v-b}" y2="${f/2}" />
            <line class="chart-grid-line" x1="${b}" y1="${f-h}" x2="${v-b}" y2="${f-h}" />
            
            <!-- Area & Line Paths -->
            <path class="chart-area" d="${S}" />
            <path class="chart-line" d="${k}" stroke-dasharray="1000" stroke-dashoffset="1000" />
            
            <!-- Points and Tooltips -->
            ${w.map((o,x)=>`
              <circle class="chart-point" cx="${o.x}" cy="${o.y}" r="6" data-amount="${o.amount}" data-date="${o.date}">
                <title>${o.date}: ${u(o.amount)}</title>
              </circle>
              <text x="${o.x}" y="${f-8}" fill="var(--text-muted)" font-size="9" text-anchor="middle">
                ${o.date.slice(5)}
              </text>
              <text x="${o.x}" y="${o.y-12}" fill="var(--text-inverse)" font-size="10" font-weight="600" text-anchor="middle">
                ${o.amount>0?u(o.amount):""}
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
          ${R.map(o=>`
            <li class="activity-item">
              <div class="activity-badge" style="background: rgba(255, 255, 255, 0.05); color: ${o.badgeColor}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  ${o.icon}
                </svg>
              </div>
              <div class="activity-details">
                <h5>${o.title}</h5>
                <p>${o.detail}</p>
              </div>
              <div class="activity-time">${o.time.slice(5)}</div>
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
  `,a.querySelector("#btn-quick-checkin").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="checkin"]').click()}),a.querySelector("#btn-quick-rooms").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="rooms"]').click()}),a.querySelector("#btn-quick-billing").addEventListener("click",()=>{document.querySelector('.nav-link[data-view="billing"]').click()})}function H(a){let s="all",r="all";function i(){const d=g.getRooms(),l=["Deluxe","AC","Non-AC"],c={};l.forEach(e=>{const t=d.find(n=>n.category===e);c[e]=t?t.rate:0});const y=d.filter(e=>{const t=s==="all"||s==="cleaning"&&e.cleaningStatus==="Dirty"||s.toLowerCase()===e.status.toLowerCase(),n=r==="all"||e.category===r;return t&&n});a.innerHTML=`
      <!-- Filters and Header Controls -->
      <div class="rooms-filter-bar">
        <div class="filter-group">
          <button class="filter-btn ${s==="all"?"active":""}" data-status="all">All Rooms</button>
          <button class="filter-btn ${s==="available"?"active":""}" data-status="available">Available</button>
          <button class="filter-btn ${s==="occupied"?"active":""}" data-status="occupied">Occupied</button>
          <button class="filter-btn ${s==="cleaning"?"active":""}" data-status="cleaning">Needs Cleaning</button>
        </div>

        <div class="filter-group">
          <button class="filter-btn ${r==="all"?"active":""}" data-category="all">All Types</button>
          <button class="filter-btn ${r==="Deluxe"?"active":""}" data-category="Deluxe">Deluxe</button>
          <button class="filter-btn ${r==="AC"?"active":""}" data-category="AC">AC</button>
          <button class="filter-btn ${r==="Non-AC"?"active":""}" data-category="Non-AC">Non-AC</button>
        </div>
      </div>

      <!-- Rooms Grid Layout -->
      <div class="rooms-grid">
        ${y.map(e=>{let t="badge-available",n="Available";return e.status==="Occupied"?(t="badge-occupied",n="Occupied"):e.cleaningStatus==="Dirty"&&(t="badge-cleaning",n="Needs Cleaning"),`
            <div class="glass-card room-card ${e.status.toLowerCase()}">
              <div class="room-header">
                <span class="room-number">Room ${e.number}</span>
                <span class="badge ${t}">${n}</span>
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
        ${y.length===0?'<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No rooms match your filters.</div>':""}
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
    `,a.querySelectorAll(".filter-btn[data-status]").forEach(e=>{e.addEventListener("click",t=>{s=t.target.dataset.status,i()})}),a.querySelectorAll(".filter-btn[data-category]").forEach(e=>{e.addEventListener("click",t=>{r=t.target.dataset.category,i()})}),a.querySelectorAll(".btn-clean").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.room;g.updateRoom(n,{cleaningStatus:"Clean"}),A(`Room ${n} is now clean and available.`,"success"),i()})}),a.querySelectorAll(".btn-checkin").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.room,v=t.target.dataset.category;window.preSelectedRoom=n,window.preSelectedCategory=v,document.querySelector('.nav-link[data-view="checkin"]').click()})}),a.querySelectorAll(".btn-checkout").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.room;window.preSelectedCheckoutRoom=n,document.querySelector('.nav-link[data-view="billing"]').click()})});const p=a.querySelector("#rate-management-form");p&&p.addEventListener("submit",e=>{e.preventDefault();const t=a.querySelector("#rate-deluxe").value,n=a.querySelector("#rate-ac").value,v=a.querySelector("#rate-nonac").value;g.updateRoomRates("Deluxe",t),g.updateRoomRates("AC",n),g.updateRoomRates("Non-AC",v),A("Room rates updated successfully!","success"),i()})}i()}function j(a){const s=g.getRooms(),r=c=>s.filter(y=>y.category===c&&y.status==="Available"&&y.cleaningStatus==="Clean"),i=window.preSelectedRoom||"",d=window.preSelectedCategory||"Deluxe";window.preSelectedRoom=null,window.preSelectedCategory=null;function l(){var w;const c=new Date().toISOString().split("T")[0],y=new Date;y.setDate(y.getDate()+1);const p=y.toISOString().split("T")[0],e=((w=a.querySelector("#guest-category"))==null?void 0:w.value)||d,t=r(e);a.innerHTML=`
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
                ${i?`<option value="${i}" selected>Room ${i} (Pre-selected)</option>`:""}
                ${t.map(k=>`<option value="${k.number}">Room ${k.number}</option>`).join("")}
                ${t.length===0&&!i?'<option value="" disabled>No clean rooms available in this category</option>':""}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkin-date">Check-In Date</label>
              <input type="date" id="checkin-date" class="form-input" value="${c}" min="${c}" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="checkout-date">Check-Out Date</label>
              <input type="date" id="checkout-date" class="form-input" value="${p}" min="${p}" required>
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
    `,a.querySelector("#guest-category").addEventListener("change",()=>{l()});const v=a.querySelector("#id-file-input"),f=a.querySelector("#file-status"),b=a.querySelector("#uploader-text"),h=a.querySelector("#id-file-uploader");v.addEventListener("change",k=>{if(k.target.files.length>0){const S=k.target.files[0];b.textContent=`File: ${S.name}`,f.style.display="block",h.style.borderColor="var(--color-success)"}}),a.querySelector("#checkin-registration-form").addEventListener("submit",k=>{k.preventDefault();const S=a.querySelector("#guest-room").value;if(!S){A("Please allocate a valid room before completing check-in.","error");return}const u={id:"g"+Date.now(),name:a.querySelector("#guest-name").value,mobile:a.querySelector("#guest-mobile").value,address:a.querySelector("#guest-address").value,numGuests:Number(a.querySelector("#guest-count").value),checkIn:a.querySelector("#checkin-date").value,checkOut:a.querySelector("#checkout-date").value,idType:a.querySelector("#id-type").value,idNumber:a.querySelector("#id-number").value,status:"Checked-In",roomNumber:S};g.addGuest(u),g.updateRoom(S,{status:"Occupied"}),A(`Guest ${u.name} registered and assigned to Room ${S}.`,"success"),document.querySelector('.nav-link[data-view="rooms"]').click()})}l()}function _(a){let s="",r="all";function i(){const c=g.getGuests().filter(e=>{const t=e.name.toLowerCase().includes(s.toLowerCase())||e.mobile.includes(s)||e.roomNumber&&e.roomNumber.includes(s),n=r==="all"||r==="checked-in"&&e.status==="Checked-In"||r==="checked-out"&&e.status==="Checked-Out";return t&&n});a.innerHTML=`
      <!-- Search & Filters -->
      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="guest-search-input" class="form-input" placeholder="Search guests by name, phone or room number..." value="${s}">
        </div>
        <select id="guest-status-filter" class="form-input" style="width: 180px; background-color:#12131a">
          <option value="all" ${r==="all"?"selected":""}>All Statuses</option>
          <option value="checked-in" ${r==="checked-in"?"selected":""}>Checked-In Only</option>
          <option value="checked-out" ${r==="checked-out"?"selected":""}>Checked-Out Only</option>
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
    `,a.querySelector("#guest-search-input").addEventListener("input",e=>{s=e.target.value,i();const t=a.querySelector("#guest-search-input");t.focus(),t.setSelectionRange(t.value.length,t.value.length)}),a.querySelector("#guest-status-filter").addEventListener("change",e=>{r=e.target.value,i()}),a.querySelectorAll(".guest-row-item").forEach(e=>{e.addEventListener("click",t=>{const n=e.dataset.id;d(n)})})}function d(l){const c=g.getGuests().find(t=>t.id===l);if(!c)return;const y=document.getElementById("global-modal"),p=document.getElementById("modal-body");p.innerHTML=`
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
    `,y.classList.add("active");const e=()=>{y.classList.remove("active")};p.querySelector("#close-guest-modal").addEventListener("click",e),p.querySelector("#close-profile-modal-btn").addEventListener("click",e)}i()}function F(a){const s=g.getRooms(),r=g.getGuests(),i=s.filter(p=>p.status==="Occupied");let d=window.preSelectedCheckoutRoom||(i.length>0?i[0].number:"");window.preSelectedCheckoutRoom=null;let l=0;function c(){const p=g.getRooms().filter(u=>u.status==="Occupied");if(p.length===0){a.innerHTML=`
        <div class="glass-card" style="text-align:center; padding: 4rem 2rem;">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--text-muted)" stroke-width="2" style="margin-bottom: 1.5rem">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <h3 style="font-size:1.5rem; font-weight:600; margin-bottom:0.5rem">All Rooms Are Vacant</h3>
          <p style="color:var(--text-muted); max-width:400px; margin:0 auto 1.5rem">There are no occupied rooms in the lodge right now. Go to the check-in page to register a new guest.</p>
          <button class="btn btn-primary" onclick="document.querySelector('.nav-link[data-view=\\'checkin\\']').click()">Go to Check-In</button>
        </div>
      `;return}const e=p.find(u=>u.number===d)||p[0];d=e.number;const t=r.find(u=>u.roomNumber===d&&u.status==="Checked-In");let n=1;if(t){const u=new Date(t.checkIn),o=Math.abs(new Date-u);n=Math.ceil(o/(1e3*60*60*24)),n<=0&&(n=1)}const v=e.rate*n,f=.12,b=Math.round((v+l)*f),h=v+l+b,m=u=>"₹"+Number(u).toLocaleString("en-IN");a.innerHTML=`
      <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:1.5rem; max-width: 1100px; margin:0 auto;">
        
        <!-- Left Side: Invoice Controls -->
        <div class="glass-card" style="padding: 2rem; display:flex; flex-direction:column; gap:1.5rem;">
          <h3 style="font-size:1.25rem; font-weight:600;">Check-Out Calculator</h3>
          
          <div class="form-group">
            <label class="form-label" for="checkout-room-select">Select Occupied Room</label>
            <select id="checkout-room-select" class="form-input" style="background-color:#12131a">
              ${p.map(u=>`<option value="${u.number}" ${u.number===d?"selected":""}>Room ${u.number} (${u.category})</option>`).join("")}
            </select>
          </div>

          ${t?`
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; font-size:0.85rem; display:flex; flex-direction:column; gap:0.5rem">
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Guest Name:</span><span style="font-weight:600">${t.name}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Contact:</span><span>${t.mobile}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Check-In:</span><span>${t.checkIn}</span></div>
              <div style="display:flex; justify-content:space-between"><span style="color:var(--text-muted)">Stay Duration:</span><span style="font-weight:600">${n} day(s)</span></div>
            </div>
          `:""}

          <div class="form-group">
            <label class="form-label" for="extra-charges-input">Extra/Room Service Charges (₹)</label>
            <input type="number" id="extra-charges-input" class="form-input" value="${l}" min="0">
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
                <span>${t?t.name:"Walk-in Guest"}</span><br>
                <span style="color:var(--text-muted)">${t?t.mobile:""}</span>
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
                  <td style="text-align:center">${n}</td>
                  <td style="text-align:right">${m(e.rate)}</td>
                  <td style="text-align:right">${m(v)}</td>
                </tr>
                ${l>0?`
                  <tr>
                    <td>Room Service & Miscellaneous</td>
                    <td style="text-align:center">1</td>
                    <td style="text-align:right">${m(l)}</td>
                    <td style="text-align:right">${m(l)}</td>
                  </tr>
                `:""}
              </tbody>
            </table>

            <div class="invoice-total-section">
              <div class="invoice-total-row">
                <span>Subtotal:</span>
                <span>${m(v+l)}</span>
              </div>
              <div class="invoice-total-row">
                <span>GST (12%):</span>
                <span>${m(b)}</span>
              </div>
              <div class="invoice-total-row grand-total">
                <span>Grand Total:</span>
                <span>${m(h)}</span>
              </div>
            </div>

            <div style="border-top:1px dashed var(--border-color); padding-top:0.75rem; text-align:center; font-size:0.75rem; color:var(--text-muted)">
              Thank you for staying at VareX Lodge!
            </div>
          </div>

        </div>
      </div>
    `,a.querySelector("#checkout-room-select").addEventListener("change",u=>{d=u.target.value,c()}),a.querySelector("#extra-charges-input").addEventListener("input",u=>{l=Number(u.target.value)||0,S()}),a.querySelector("#btn-print-invoice").addEventListener("click",()=>{const u=a.querySelector("#printable-invoice").innerHTML;document.body.innerHTML;const R=window.open();R.document.write(`
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
            ${u}
            <script>window.print(); window.close();<\/script>
          </body>
        </html>
      `),R.document.close()}),a.querySelector("#btn-proceed-checkout").addEventListener("click",()=>{y(t,e,v,l,b,h)});function S(){const u=p.find(C=>C.number===d),R=Math.round((v+l)*f),o=v+l+R,x=a.querySelector("#printable-invoice");if(x){const C=x.querySelector("tbody");C.innerHTML=`
          <tr>
            <td>Room Lodging Charges (${u.category})</td>
            <td style="text-align:center">${n}</td>
            <td style="text-align:right">${m(u.rate)}</td>
            <td style="text-align:right">${m(v)}</td>
          </tr>
          ${l>0?`
            <tr>
              <td>Room Service & Miscellaneous</td>
              <td style="text-align:center">1</td>
              <td style="text-align:right">${m(l)}</td>
              <td style="text-align:right">${m(l)}</td>
            </tr>
          `:""}
        `;const D=x.querySelector(".invoice-total-section");D.innerHTML=`
          <div class="invoice-total-row">
            <span>Subtotal:</span>
            <span>${m(v+l)}</span>
          </div>
          <div class="invoice-total-row">
            <span>GST (12%):</span>
            <span>${m(R)}</span>
          </div>
          <div class="invoice-total-row grand-total">
            <span>Grand Total:</span>
            <span>${m(o)}</span>
          </div>
        `}}}function y(p,e,t,n,v,f){const b=document.getElementById("global-modal"),h=document.getElementById("modal-body"),m=k=>"₹"+Number(k).toLocaleString("en-IN");h.innerHTML=`
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
        <span style="font-weight:700; font-size:1.25rem; color:var(--text-inverse); margin-top:0.5rem">${m(f)}</span>
        <span style="font-size:0.75rem; color:var(--text-muted)">UPI ID: varex@upi</span>
      </div>

      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; margin-top:1.5rem; font-size:0.85rem">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Room Charges:</span><span>${m(t)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">Extra Charges:</span><span>${m(n)}</span></div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem"><span style="color:var(--text-muted)">GST (12%):</span><span>${m(v)}</span></div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1rem; margin-top:1.5rem">
        <button class="btn btn-secondary" id="btn-cancel-checkout">Cancel</button>
        <button class="btn btn-success" id="btn-simulate-payment-success">
          Simulate Payment Success
        </button>
      </div>
    `,b.classList.add("active");const w=()=>{b.classList.remove("active")};h.querySelector("#close-checkout-modal").addEventListener("click",w),h.querySelector("#btn-cancel-checkout").addEventListener("click",w),h.querySelector("#btn-simulate-payment-success").addEventListener("click",()=>{p&&g.updateGuest(p.id,{status:"Checked-Out"});const k={id:"p"+Date.now(),guestName:p?p.name:"Walk-in Guest",roomNumber:e.number,amount:f,date:new Date().toISOString().split("T")[0],method:"UPI QR",status:"Completed"};g.addPayment(k),g.updateRoom(e.number,{status:"Available",cleaningStatus:"Dirty"}),A(`Checkout complete. Room ${e.number} sent to Cleaning Queue.`,"success"),w(),document.querySelector('.nav-link[data-view="dashboard"]').click()})}c()}function V(a){function s(){const r=g.getBookings(),i=g.getRooms(),d=r.filter(t=>t.status==="Pending"),l=r.filter(t=>t.status==="Confirmed"||t.status==="Approved"),c=new Date().toISOString().split("T")[0],y=new Date;y.setDate(y.getDate()+1);const p=y.toISOString().split("T")[0];a.innerHTML=`
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
                <input type="date" id="sim-checkin" class="form-input" value="${c}" min="${c}">
              </div>
              <div class="form-group">
                <label class="form-label" for="sim-checkout">Check-Out</label>
                <input type="date" id="sim-checkout" class="form-input" value="${p}" min="${p}">
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
              <span class="badge badge-cleaning" style="font-size:0.75rem">${d.length} Pending</span>
            </h3>

            <div style="display:flex; flex-direction:column; gap:1rem; max-height: 250px; overflow-y:auto; padding-right:5px">
              ${d.map(t=>`
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:1rem; display:flex; flex-direction:column; gap:0.5rem">
                  <div style="display:flex; justify-content:space-between; align-items:center">
                    <strong style="font-size:0.9rem">${t.guestName}</strong>
                    <span class="badge badge-pending">${t.category}</span>
                  </div>
                  <div style="font-size:0.75rem; color:var(--text-muted)">
                    <span>Phone: ${t.mobile} | Guests: ${t.numGuests}</span><br>
                    <span>Stay: ${t.checkIn} to ${t.checkOut}</span>
                  </div>
                  <div style="display:flex; gap:0.5rem; margin-top:0.25rem">
                    <button class="btn btn-success btn-approve-booking" data-id="${t.id}" data-category="${t.category}" style="flex-grow:1; padding:0.3rem; font-size:0.75rem">
                      Approve & Allocate Room
                    </button>
                    <button class="btn btn-secondary btn-reject-booking" data-id="${t.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-color:var(--color-danger); color:var(--color-danger)">
                      Reject
                    </button>
                  </div>
                </div>
              `).join("")}
              ${d.length===0?'<p style="color:var(--text-muted); text-align:center; padding:2rem; font-size:0.85rem">No incoming reservation requests.</p>':""}
            </div>
          </div>

          <!-- Confirmed/Approved Bookings -->
          <div class="glass-card" style="padding:1.5rem; flex-grow:1;">
            <h3 style="font-size:1.1rem; font-weight:600; margin-bottom:1rem;">Confirmed Booking History</h3>
            <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:220px; overflow-y:auto; padding-right:5px">
              ${l.map(t=>`
                <div style="background:rgba(255,255,255,0.02); border-radius:var(--border-radius-md); padding:0.75rem; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.03)">
                  <div>
                    <h5 style="font-size:0.85rem; font-weight:500">${t.guestName}</h5>
                    <span style="font-size:0.75rem; color:var(--text-muted)">Stay: ${t.checkIn} (${t.category})</span>
                  </div>
                  <span class="badge badge-available">CONFIRMED</span>
                </div>
              `).join("")}
              ${l.length===0?'<p style="color:var(--text-muted); text-align:center; padding:1.5rem; font-size:0.85rem">No bookings confirmed yet.</p>':""}
            </div>
          </div>

        </div>
      </div>
    `,a.querySelector("#online-reservation-form").addEventListener("submit",t=>{t.preventDefault();const n={id:"b"+Date.now(),guestName:a.querySelector("#sim-name").value,mobile:a.querySelector("#sim-mobile").value,category:a.querySelector("#sim-category").value,checkIn:a.querySelector("#sim-checkin").value,checkOut:a.querySelector("#sim-checkout").value,numGuests:Number(a.querySelector("#sim-guests").value),status:"Pending"};g.addBooking(n),A(`Reservation request sent by ${n.guestName}!`,"info"),s()}),a.querySelectorAll(".btn-approve-booking").forEach(t=>{t.addEventListener("click",n=>{const v=n.target.dataset.id,f=n.target.dataset.category,b=i.find(m=>m.category===f&&m.status==="Available"&&m.cleaningStatus==="Clean");if(!b){A(`Cannot approve: No clean ${f} rooms available right now. Please clean or vacant a room first.`,"error");return}g.updateBookingStatus(v,"Confirmed");const h=g.getBookings().find(m=>m.id===v);if(h){const m={id:"g"+Date.now(),name:h.guestName,mobile:h.mobile,address:"Online Booking Reservation",numGuests:h.numGuests,checkIn:h.checkIn,checkOut:h.checkOut,idType:"Aadhaar Card",idNumber:"VERIFIED-ONLINE",status:"Checked-In",roomNumber:b.number};g.addGuest(m),g.updateRoom(b.number,{status:"Occupied"})}A(`Booking Approved! Room ${b.number} allocated to ${h.guestName}.`,"success"),s()})}),a.querySelectorAll(".btn-reject-booking").forEach(t=>{t.addEventListener("click",n=>{const v=n.target.dataset.id;g.updateBookingStatus(v,"Rejected"),A("Booking request rejected.","info"),s()})})}s()}const N=document.getElementById("view-title"),I=document.getElementById("main-viewport"),Q=document.getElementById("current-time-clock"),E=document.querySelectorAll(".nav-link"),U=document.getElementById("quick-checkout-action"),O=document.getElementById("toast-alerts-container");let G="dashboard";function J(){const a=()=>{const s=new Date;Q.textContent=s.toLocaleTimeString("en-US",{hour12:!0})};a(),setInterval(a,1e3)}function A(a,s="info"){const r=document.createElement("div");r.className=`toast ${s}`;let i="";s==="success"?i='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>':s==="error"?i='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':i='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',r.innerHTML=`${i}<span>${a}</span>`,O.appendChild(r),setTimeout(()=>{r.style.animation="slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse",setTimeout(()=>{r.parentNode&&O.removeChild(r)},300)},3500)}function q(a){switch(G=a,E.forEach(s=>{s.dataset.view===a?s.classList.add("active"):s.classList.remove("active")}),a){case"dashboard":N.textContent="Dashboard Overview",L(I);break;case"rooms":N.textContent="Rooms Status Matrix",H(I);break;case"checkin":N.textContent="Guest Check-In Desk",j(I);break;case"guests":N.textContent="Guest Registration History",_(I);break;case"billing":N.textContent="Checkout Billing & Invoice",F(I);break;case"bookingSimulator":N.textContent="Online Reservations Simulator",V(I);break;default:N.textContent="Dashboard",L(I)}}E.forEach(a=>{a.addEventListener("click",s=>{s.preventDefault();const r=a.dataset.view;q(r)})});U.addEventListener("click",()=>{q("billing")});g.subscribe(()=>{q(G)});J();q("dashboard");A("Welcome to VareX Lodge Management Terminal.","success");
