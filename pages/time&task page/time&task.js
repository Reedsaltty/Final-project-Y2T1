// Store timeline activities and tasks in memory (temporary)
let timelineActivities = [];
let tasks = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  setupTimeActivityForm();
  setupTaskForm();
  setupTimeInputValidation();
});

// Setup time input validation
function setupTimeInputValidation() {
  const hourInput = document.querySelector('input[name="hour"]');
  const minuteInput = document.querySelector('input[name="minute"]');

  hourInput.addEventListener('input', function() {
    if (this.value > 12) this.value = 12;
    if (this.value < 1 && this.value !== '') this.value = 1;
  });

  minuteInput.addEventListener('input', function() {
    if (this.value > 59) this.value = 59;
    if (this.value < 0) this.value = 0;
  });
}

// Setup time & activity form
function setupTimeActivityForm() {
  const form = document.getElementById('timeActivityForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hour = form.querySelector('input[name="hour"]').value;
    const minute = form.querySelector('input[name="minute"]').value;
    const period = form.querySelector('select[name="period"]').value;
    const activityInput = form.querySelector('input[name="activity"]');
    const activity = activityInput.value.trim();
    
    if (!hour || !minute || !activity) {
      alert('Please fill in all fields');
      return;
    }
    
    // Add to timeline
    timelineActivities.push({
      id: Date.now(),
      hour: hour.padStart(2, '0'),
      minute: minute.padStart(2, '0'),
      period: period,
      activity: activity
    });
    
    // Reset activity input
    activityInput.value = '';
    
    // Render timeline
    renderTimeline();
  });
}

// Render timeline using DOM manipulation
function renderTimeline() {
  const timelineContainer = document.querySelector('.line1 .w-full.h-\\[400px\\]');
  
  // Make container scrollable
  timelineContainer.style.overflowY = 'auto';
  timelineContainer.style.maxHeight = '400px';
  
  // Clear existing content except the title
  timelineContainer.innerHTML = '';
  
  // Create title
  const title = document.createElement('div');
  title.className = 'font-extrabold text-2xl self-center pt-8 pb-4';
  title.textContent = 'TIMELINE';
  timelineContainer.appendChild(title);
  
  // Create scrollable content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'flex flex-col gap-4 pb-4';
  
  // If no activities, show default items
  if (timelineActivities.length === 0) {
    createDefaultTimelineItem(contentWrapper, 'Event Start', '09', '00', 'AM');
    createDefaultTimelineItem(contentWrapper, 'Registration', '09', '30', 'AM');
    createDefaultTimelineItem(contentWrapper, 'Main Session', '10', '00', 'AM');
  } else {
    // Create activity items
    timelineActivities.forEach(activity => {
      createTimelineItem(contentWrapper, activity);
    });
  }
  
  timelineContainer.appendChild(contentWrapper);
}

// Create a default timeline item (for display purposes)
function createDefaultTimelineItem(container, text, hour, minute, period) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'pl-8 text';
  
  const flexDiv = document.createElement('div');
  flexDiv.className = 'flex gap-8 items-center';
  
  const dot = document.createElement('div');
  dot.className = 'w-[20px] h-[20px] rounded-2xl bg-main';
  
  const label = document.createElement('span');
  label.className = 'font-light';
  label.textContent = text;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'bg-main text-white px-1 self-center';
  
  const hourSpan = document.createElement('span');
  hourSpan.textContent = hour;
  const colonSpan = document.createElement('span');
  colonSpan.textContent = ':';
  const minuteSpan = document.createElement('span');
  minuteSpan.textContent = minute;
  const periodSpan = document.createElement('span');
  periodSpan.textContent = period;
  
  timeDiv.appendChild(hourSpan);
  timeDiv.appendChild(colonSpan);
  timeDiv.appendChild(minuteSpan);
  timeDiv.appendChild(periodSpan);
  
  flexDiv.appendChild(dot);
  flexDiv.appendChild(label);
  flexDiv.appendChild(timeDiv);
  itemDiv.appendChild(flexDiv);
  container.appendChild(itemDiv);
}

// Create a timeline item from activity data
function createTimelineItem(container, activity) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'pl-8 text';
  
  const flexDiv = document.createElement('div');
  flexDiv.className = 'flex gap-8 items-center';
  
  const dot = document.createElement('div');
  dot.className = 'w-[20px] h-[20px] rounded-2xl bg-main';
  
  const label = document.createElement('span');
  label.className = 'font-light';
  label.textContent = activity.activity;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'bg-main text-white px-1 self-center';
  timeDiv.textContent = `${activity.hour}:${activity.minute} ${activity.period}`;
  
  flexDiv.appendChild(dot);
  flexDiv.appendChild(label);
  flexDiv.appendChild(timeDiv);
  itemDiv.appendChild(flexDiv);
  container.appendChild(itemDiv);
}

// Setup task form
function setupTaskForm() {
  const taskForm = document.querySelector('.line2 form');
  
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = this.querySelector('input[name="activity"]');
    const taskName = taskInput.value.trim();
    
    if (!taskName) {
      alert('Please enter a task');
      return;
    }
    
    // Add to tasks
    tasks.push({
      id: Date.now(),
      name: taskName,
      completed: false
    });
    
    // Reset form
    taskInput.value = '';
    
    // Render tasks
    renderTasks();
  });
}

// Render tasks using DOM manipulation
function renderTasks() {
  const taskContainer = document.querySelector('.line2 .w-full.h-\\[400px\\]');
  
  // Make container scrollable
  taskContainer.style.overflowY = 'auto';
  taskContainer.style.maxHeight = '400px';
  
  // Clear existing content except the title
  taskContainer.innerHTML = '';
  
  // Create title
  const title = document.createElement('div');
  title.className = 'font-extrabold text-2xl self-center pt-8 pb-4';
  title.textContent = 'Task';
  taskContainer.appendChild(title);
  
  // Create scrollable content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'flex flex-col gap-4 pb-4';
  
  // If no tasks, show default items
  if (tasks.length === 0) {
    createDefaultTask(contentWrapper, 'Invite Mr. Beast');
    createDefaultTask(contentWrapper, 'Book Venue');
    createDefaultTask(contentWrapper, 'Order Catering');
  } else {
    // Create task items
    tasks.forEach(task => {
      createTaskItem(contentWrapper, task);
    });
  }
  
  taskContainer.appendChild(contentWrapper);
}

// Create a default task item (for display purposes)
function createDefaultTask(container, text) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'pl-8';
  
  const label = document.createElement('label');
  label.className = 'flex items-center gap-8 cursor-pointer';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'peer hidden';
  
  const checkboxDiv = document.createElement('div');
  checkboxDiv.className = 'w-[40px] h-[20px] rounded-[6px] outline outline-1 outline-graytext flex items-center justify-center relative peer-checked:bg-green';
  
  const innerDiv = document.createElement('div');
  innerDiv.className = 'w-[38px] h-[18px] rounded-[5px] bg-transparent outline-1 outline-white';
  
  const taskText = document.createElement('span');
  taskText.className = 'font-light text-black';
  taskText.textContent = text;
  
  checkboxDiv.appendChild(innerDiv);
  label.appendChild(checkbox);
  label.appendChild(checkboxDiv);
  label.appendChild(taskText);
  itemDiv.appendChild(label);
  container.appendChild(itemDiv);
}

// Create a task item from task data
function createTaskItem(container, task) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'pl-8';
  
  const label = document.createElement('label');
  label.className = 'flex items-center gap-8 cursor-pointer';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'peer hidden';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', function() {
    toggleTask(task.id);
  });
  
  const checkboxDiv = document.createElement('div');
  checkboxDiv.className = 'w-[40px] h-[20px] rounded-[6px] outline outline-1 outline-graytext flex items-center justify-center relative peer-checked:bg-green';
  
  const innerDiv = document.createElement('div');
  innerDiv.className = 'w-[38px] h-[18px] rounded-[5px] bg-transparent outline-1 outline-white';
  
  const taskText = document.createElement('span');
  taskText.className = task.completed ? 'font-light text-black line-through' : 'font-light text-black';
  taskText.textContent = task.name;
  
  checkboxDiv.appendChild(innerDiv);
  label.appendChild(checkbox);
  label.appendChild(checkboxDiv);
  label.appendChild(taskText);
  itemDiv.appendChild(label);
  container.appendChild(itemDiv);
}

// Toggle task completion
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}