document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth Scrolling for Nav Links
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }

      const targetId = this.getAttribute('href');
      if(targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Set minimum date for booking to today
  const dateInput = document.getElementById('bookDate');
  if(dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Handle WhatsApp Booking Form
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get selected services
      const serviceCheckboxes = document.querySelectorAll('input[name="service"]:checked');
      const selectedServices = Array.from(serviceCheckboxes).map(cb => cb.value);

      if (selectedServices.length === 0) {
        alert('Please select at least one service.');
        return;
      }

      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const name = document.getElementById('bookName').value;

      // Format date
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

      // Construct Message
      const message = `Hello City Barbers & Spa! I'd like to book an appointment.\n\n` +
                      `*Services:* ${selectedServices.join(', ')}\n` +
                      `*Date:* ${formattedDate}\n` +
                      `*Preferred Time:* ${time}\n` +
                      `*Name:* ${name}\n\n` +
                      `Please confirm if this slot is available.`;

      // URL Encode Message
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp Number
      const waNumber = '233543334762';
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    });
  }
});
