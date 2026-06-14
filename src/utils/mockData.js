// Pre-configured room rates
export const DEFAULT_RATES = {
  'Deluxe': 3500,
  'AC': 2200,
  'Non-AC': 1200
};

// Initial rooms list
export const initialRooms = [
  { id: '101', number: '101', category: 'Deluxe', rate: DEFAULT_RATES['Deluxe'], status: 'Occupied', cleaningStatus: 'Clean' },
  { id: '102', number: '102', category: 'Deluxe', rate: DEFAULT_RATES['Deluxe'], status: 'Available', cleaningStatus: 'Clean' },
  { id: '103', number: '103', category: 'Deluxe', rate: DEFAULT_RATES['Deluxe'], status: 'Available', cleaningStatus: 'Dirty' },
  { id: '201', number: '201', category: 'AC', rate: DEFAULT_RATES['AC'], status: 'Occupied', cleaningStatus: 'Clean' },
  { id: '202', number: '202', category: 'AC', rate: DEFAULT_RATES['AC'], status: 'Available', cleaningStatus: 'Clean' },
  { id: '203', number: '203', category: 'AC', rate: DEFAULT_RATES['AC'], status: 'Occupied', cleaningStatus: 'Clean' },
  { id: '204', number: '204', category: 'AC', rate: DEFAULT_RATES['AC'], status: 'Available', cleaningStatus: 'Dirty' },
  { id: '205', number: '205', category: 'AC', rate: DEFAULT_RATES['AC'], status: 'Available', cleaningStatus: 'Clean' },
  { id: '301', number: '301', category: 'Non-AC', rate: DEFAULT_RATES['Non-AC'], status: 'Occupied', cleaningStatus: 'Clean' },
  { id: '302', number: '302', category: 'Non-AC', rate: DEFAULT_RATES['Non-AC'], status: 'Available', cleaningStatus: 'Clean' },
  { id: '303', number: '303', category: 'Non-AC', rate: DEFAULT_RATES['Non-AC'], status: 'Available', cleaningStatus: 'Dirty' },
  { id: '304', number: '304', category: 'Non-AC', rate: DEFAULT_RATES['Non-AC'], status: 'Available', cleaningStatus: 'Clean' },
  { id: '305', number: '305', category: 'Non-AC', rate: DEFAULT_RATES['Non-AC'], status: 'Available', cleaningStatus: 'Clean' }
];

// Initial guests records
export const initialGuests = [
  {
    id: 'g1',
    name: 'Rahul Deshmukh',
    mobile: '9823456789',
    address: 'Pune, Maharashtra',
    numGuests: 2,
    checkIn: '2026-06-12',
    checkOut: '2026-06-15',
    idType: 'Aadhaar Card',
    idNumber: '4321-8765-9012',
    status: 'Checked-In',
    roomNumber: '101'
  },
  {
    id: 'g2',
    name: 'Sneha Patil',
    mobile: '9765432109',
    address: 'Kolhapur, Maharashtra',
    numGuests: 1,
    checkIn: '2026-06-13',
    checkOut: '2026-06-16',
    idType: 'Driving License',
    idNumber: 'MH-09-20190012345',
    status: 'Checked-In',
    roomNumber: '201'
  },
  {
    id: 'g3',
    name: 'Vijay Kadam',
    mobile: '8888777766',
    address: 'Mumbai, Maharashtra',
    numGuests: 3,
    checkIn: '2026-06-14',
    checkOut: '2026-06-17',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    status: 'Checked-In',
    roomNumber: '203'
  },
  {
    id: 'g4',
    name: 'Rajesh Shinde',
    mobile: '9922110033',
    address: 'Nashik, Maharashtra',
    numGuests: 2,
    checkIn: '2026-06-10',
    checkOut: '2026-06-14',
    idType: 'Passport',
    idNumber: 'Z1234567',
    status: 'Checked-Out',
    roomNumber: '301'
  }
];

// Initial booking requests (including some pending verification)
export const initialBookings = [
  {
    id: 'b1',
    guestName: 'Anil Joshi',
    mobile: '9011223344',
    category: 'Deluxe',
    checkIn: '2026-06-16',
    checkOut: '2026-06-19',
    numGuests: 2,
    status: 'Pending'
  },
  {
    id: 'b2',
    guestName: 'Pooja Sawant',
    mobile: '9890456123',
    category: 'AC',
    checkIn: '2026-06-18',
    checkOut: '2026-06-20',
    numGuests: 1,
    status: 'Confirmed'
  }
];

// Initial payments/transactions history (last few days revenue metrics)
export const initialPayments = [
  { id: 'p1', guestName: 'Rajesh Shinde', roomNumber: '301', amount: 5376, date: '2026-06-14', method: 'UPI QR', status: 'Completed' },
  { id: 'p2', guestName: 'Vikram Joshi', roomNumber: '202', amount: 7392, date: '2026-06-13', method: 'Cash', status: 'Completed' },
  { id: 'p3', guestName: 'Deepak Thorat', roomNumber: '102', amount: 11760, date: '2026-06-12', method: 'Card', status: 'Completed' },
  { id: 'p4', guestName: 'Sanjay Mane', roomNumber: '304', amount: 2688, date: '2026-06-11', method: 'UPI QR', status: 'Completed' }
];
