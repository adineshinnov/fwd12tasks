const form = document.getElementById("regForm");
const toast = document.getElementById("toast");

function showError(id, message) 
{
  document.getElementById("err-" + id).textContent = message;
}

function validateForm() 
{
  let valid = true;

  // Name
  const name = document.getElementById("name").value.trim();
  if (name.length < 2) 
  {
    showError("name", "Enter at least 2 characters");
    valid = false;
  } else showError("name", "");

  // Email
  const email = document.getElementById("email").value.trim();
  if (!email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) 
  {
    showError("email", "Enter a valid email");
    valid = false;
  } else showError("email", "");

  // Phone
  const phone = document.getElementById("phone").value.trim();
  if (!phone.match(/^[6-9]\\d{9}$/)) 
  {
    showError("phone", "Enter valid 10-digit number");
    valid = false;
  } else showError("phone", "");

  // Type (Dropdown)
  const type = document.getElementById("type").value;
  if (type === "") 
  {
    showError("type", "Select an event type");
    valid = false;
  } else showError("type", "");

  // Mode (Radio)
  const modes = document.querySelectorAll('input[name="mode"]');
  let modeSelected = false;
  for (const m of modes) 
  {
    if (m.checked) modeSelected = true;
  }
  if (!modeSelected) 
  {
    showError("mode", "Choose a mode");
    valid = false;
  } else showError("mode", "");

  // Date
  const date = document.getElementById("date").value;
  if (!date)
 {
    showError("date", "Pick a date");
    valid = false;
  } else showError("date", "");

  // Seats
  const seats = parseInt(document.getElementById("seats").value);
  if (isNaN(seats) || seats < 1 || seats > 5) 
  {
    showError("seats", "Seats must be between 1–5");
    valid = false;
  } else showError("seats", "");

  // Terms
  const terms = document.getElementById("terms").checked;
  if (!terms) 
  {
    showError("terms", "You must accept terms");
    valid = false;
  } else showError("terms", "");

  return valid;
}

// Submit
form.addEventListener("submit", function (e) 
{
  e.preventDefault();

  if (validateForm()) {
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 3000);
    form.reset();
  } else {
    toast.style.display = "none";
  }
});

// Reset clears messages
form.addEventListener("reset", function () 
{
  setTimeout(() => {
    document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
    toast.style.display = "none";
  }, 0);
});
