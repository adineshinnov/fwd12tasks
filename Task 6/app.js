// ==============================================
// Title      : Task 6 — Conditional Greetings with Transitions & Animations
// Objective  : Derive time slot; sanitize inputs; animate.
// Author     : <Your Name / Roll No.>
// Date       : 2025-11-04
// Notes      : Academic lab-quality JS with comments.
// ==============================================
function timeSlot(h){ return h<12? 'morning' : h<17? 'afternoon' : 'evening'; }
const form = document.getElementById('greetForm');
const out = document.getElementById('out');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = form.name.value.trim() || 'Friend';
  const mood = form.mood.value;
  const slot = timeSlot(new Date().getHours());
  out.textContent = `Good ${slot}, ${name}! Glad you’re feeling ${mood}.`;
  out.classList.remove('show');
  requestAnimationFrame(()=> out.classList.add('show'));
});
