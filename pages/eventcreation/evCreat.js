
const eventForm = document.getElementById('eventForm')
const createBtn = document.getElementById('submitButton')


function showMessage(message, type) {
  alert(message);
}

function validateForm() {
  const formData = {
            title: document.getElementById('eventTitle').value,
            type: document.getElementById('eventType').value,
            time: document.getElementById('eventTime').value,
            date: document.getElementById('eventDate').value,
            guests: document.getElementById('guestCount').value,
            budget: document.getElementById('budget').value
}
console.log('Event Data:', formData);
if (!formData.title.trim()) {
            showError('titleError', 'Event title is required');
            return false;
      }
  
  showMessage('Event created successfully!', 'success');
  return true;
}
          


createBtn.addEventListener('click',function(event) {
  event.preventDefault();
  if (validateForm()){
    
    window.location.href = '../guest manage page/guestManage.html';
  }
})

