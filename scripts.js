// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('mobile-nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('hidden');
    });
  }
  
  // Touch support: allow tap-to-toggle overlay on team cards without changing layout
  if ('ontouchstart' in window) {
    document.querySelectorAll('.team-card').forEach(function(card){
      card.addEventListener('click', function(e){
        // Check if the click is on an icon link
        if (e.target.closest('.icon')) {
          return; // Allow link clicks
        }
        // Toggle the active class
        if (card.classList.contains('active')) {
          card.classList.remove('active');
        } else {
          // Close other open cards
          document.querySelectorAll('.team-card.active').forEach(function(c){ c.classList.remove('active'); });
          card.classList.add('active');
        }
        e.preventDefault();
      });
    });

    // Close overlays when tapping outside any card
    document.addEventListener('click', function(e){
      if (!e.target.closest('.team-card')) {
        document.querySelectorAll('.team-card.active').forEach(function(c){ c.classList.remove('active'); });
      }
    });
  }
  
  // Insert a full-card image fill element for each team card and coordinator card so the image
  // can visually expand to cover the card on hover/tap without changing layout.
  document.querySelectorAll('.team-card, .coordinator-card').forEach(function(card){
    // avoid inserting twice
    if (card.querySelector('.team-image-fill')) return;
    var img = card.querySelector('.team-image');
    if (!img) return;
    var fill = document.createElement('div');
    fill.className = 'team-image-fill';
    try { fill.style.backgroundImage = 'url("' + img.getAttribute('src') + '")'; } catch(e) {}
    // insert before overlay so overlay sits above the fill
    var overlay = card.querySelector('.team-overlay');
    if (overlay) card.insertBefore(fill, overlay);
    else card.appendChild(fill);
  });
});
