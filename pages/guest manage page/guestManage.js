
  // Step 2: Select elements
  const nameInput = document.getElementById('guestName');
  const emailInput = document.getElementById('guestEmail');
  const addButton = document.getElementById('addGuestBtn');
  const guestListContainer = document.getElementById('guestList');
  const totalDisplay = document.getElementById('totalGuests');
  const unverifiedDisplay = document.getElementById('unverifiedCount');
  const attendingDisplay = document.getElementById('attendingCount');
  const notAttendingDisplay = document.getElementById('notAttendingCount');
  
  // Step 3: Create data storage
  let guests = [
    { id: 1, name: 'Peter', email: 'fake@email.com', status: 'pending' }
  ];
  let nextId = 2;
  
  // Step 4: Add guest function
  function addGuest() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (name === '' || email === '') {
      alert('Please enter both name and email');
      return;
    }
    
    const newGuest = {
      id: nextId,
      name: name,
      email: email,
      status: 'pending'
    };
    
    guests.push(newGuest);
    nextId++;
    
    nameInput.value = '';
    emailInput.value = '';
    
    renderGuests();
    updateStats();
  }
  
  // Step 5: Display guests
  function getStatusText(status) {
    if (status === 'pending') return 'Pending';
    if (status === 'yes') return 'Attending';
    if (status === 'no') return 'Not Attending';
    if (status === 'maybe') return 'Maybe';
    return status;
  }
  
  function renderGuests() {
    let html = '';
    
    for (let i = 0; i < guests.length; i++) {
      const guest = guests[i];
      
      html += `
        <div class="grid grid-cols-4 grid-rows-1 font-outfit text-main font-normal justify-items-center items-center pt-5 pb-5" data-guest-id="${guest.id}">
          <div class="guest-name">${guest.name}</div>
          <div class="guest-email">${guest.email}</div>
          <div class="guest-status">${getStatusText(guest.status)}</div>
          <div class="flex w-[70%] md:w-[50%] max-sm:w-[80%] h-[24px] bg-main text-white font-medium text-base rounded-[3px] pl-3 relative max-sm:text-xs">
            <select class="status-select appearance-none bg-transparent w-full outline-none cursor-pointer" data-guest-id="${guest.id}">
              <option value="pending" ${guest.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="yes" ${guest.status === 'yes' ? 'selected' : ''}>Yes</option>
              <option value="no" ${guest.status === 'no' ? 'selected' : ''}>No</option>
            </select>
            <div class="absolute right-[8px] top-[8px] pointer-events-none">
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1239 8.07599C8.94173 9.31639 6.96257 9.31639 5.78044 8.07599L0.396145 2.42634C-0.132393 1.87175 -0.132394 0.999884 0.396144 0.445297C0.96189 -0.148331 1.90907 -0.148331 2.47482 0.445297L5.78044 3.91383C6.96257 5.15423 8.94172 5.15423 10.1239 3.91383L13.4295 0.445297C13.9952 -0.148332 14.9424 -0.148331 15.5082 0.445297C16.0367 0.999884 16.0367 1.87175 15.5082 2.42634L10.1239 8.07599Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }
    
    guestListContainer.innerHTML = html;
    attachStatusListeners();
  }
  
  // Step 6: Update statistics
  function updateStats() {
    const total = guests.length;
    let unverified = 0;
    let attending = 0;
    let notAttending = 0;
    
    for (let i = 0; i < guests.length; i++) {
      if (guests[i].status === 'pending') {
        unverified++;
      } else if (guests[i].status === 'yes') {
        attending++;
      } else if (guests[i].status === 'no') {
        notAttending++;
      }
    }
    
    totalDisplay.textContent = total;
    unverifiedDisplay.textContent = unverified;
    attendingDisplay.textContent = attending;
    notAttendingDisplay.textContent = notAttending;
  }
  
  // Step 7: Handle status changes
function attachStatusListeners() {
  const selects = document.querySelectorAll('.status-select');
  
  for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener('change', function(event) {
      const guestId = parseInt(event.target.dataset.guestId);
      const newStatus = event.target.value;
      
      for (let j = 0; j < guests.length; j++) {
        if (guests[j].id === guestId) {
          guests[j].status = newStatus;
          break;
        }
      }
      
      // Fix: Use a more specific selector for the row div
      const row = event. target.closest('.grid[data-guest-id]');
      const statusDiv = row. querySelector('.guest-status');
      statusDiv.textContent = getStatusText(newStatus);
      
      updateStats();
    });
  }
}
  
  // Step 8: Connect button
  addButton.addEventListener('click', addGuest);
  emailInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addGuest();
    }
  });
  
  // Step 9: Initialize
  renderGuests();
  updateStats();
