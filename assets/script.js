// Get the current date and format it as "Month Day, Year"
function getCurrentDate() {
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  }
 // Generate time blocks for standard business hours
function generateTimeBlocks() {
    const timeBlocksContainer = document.getElementById('timeBlocksContainer');
    const businessHours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const currentTime = moment().format('h:mm A'); // Use moment.js library to get the current time
  
    businessHours.forEach(time => {
      const timeBlock = document.createElement('div');
      timeBlock.classList.add('time-block');
  
      const timeLabel = document.createElement('p');
      timeLabel.classList.add('block-time');
      timeLabel.textContent = time;
  
      const eventTextarea = document.createElement('textarea');
      eventTextarea.classList.add('block-event');
      eventTextarea.setAttribute('data-time', time);
  
      const saveButton = document.createElement('button');
      saveButton.classList.add('block-save');
      saveButton.textContent = 'Save';
      saveButton.setAttribute('data-time', time);
  
      // Add event listener to save button
      saveButton.addEventListener('click', () => {
        const eventText = eventTextarea.value;
        saveEvent(time, eventText);
      });
  
      timeBlock.appendChild(timeLabel);
      timeBlock.appendChild(eventTextarea);
      timeBlock.appendChild(saveButton);
  
      // Add color class based on time comparison
      if (moment(time, 'h:mm A') < moment(currentTime, 'h:mm A')) {
        timeBlock.classList.add('past');
      } else if (moment(time, 'h:mm A') > moment(currentTime, 'h:mm A')) {
        timeBlock.classList.add('future');
      } else {
        timeBlock.classList.add('present');
      }
  
      timeBlocksContainer.appendChild(timeBlock);
    });
  }
  // Save event to local storage
  function saveEvent(time, eventText) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = {
      time: time,
      text: eventText
    };
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
  
    showAlert(`Event saved:\nTime: ${time}\nText: ${eventText}`);
  }
  
  // Function to display event information in an alert dialog box
  function showAlert(message) {
    alert(message);
  }
  
  // Load saved events from local storage and populate the time blocks
  function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
  
    events.forEach(event => {
      const time = event.time;
      const text = event.text;
  
      const eventTextarea = document.querySelector(`.block-event[data-time="${time}"]`);
      if (eventTextarea) {
        eventTextarea.value = text;
        const eventInfo = document.createElement('p');
        eventInfo.textContent = `Saved: ${text}`;
        eventInfo.classList.add('event-info');
        eventTextarea.parentNode.insertBefore(eventInfo, eventTextarea.nextSibling);
      }
    });
  }
  
  // Update the current day at the top of the calendar
  document.getElementById('currentDay').textContent = getCurrentDate();
  
  // Generate time blocks and load events
  generateTimeBlocks();
  loadEvents();