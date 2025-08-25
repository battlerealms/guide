// Logo references
const originalLogo = document.getElementById('original-logo');
const remasterLogo = document.getElementById('remaster-logo');
// Hover text reference
const hoverText    = document.getElementById('hover-text');

// Fade-out scheduling
let fadeOutTimeout     = null; // Delays the start of fade-out
let removeTextTimeout  = null; // Clears text after fade-out

// Set up initial inline styles for smooth text transitions.
hoverText.style.opacity    = '0';               // Initially hidden
hoverText.style.transition = 'opacity 0.3s';    // Smooth fade (0.3s)

// Smooth image scale transitions
originalLogo.style.transition = 'transform 0.3s';
remasterLogo.style.transition = 'transform 0.3s';

/**
 * Show (fade in) a new message immediately, canceling any pending fade-outs.
 * @param {string} message The message to display
 */
function showMessage(message) {
  // Cancel any scheduled fade-out or text removal
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }
  if (removeTextTimeout) {
    clearTimeout(removeTextTimeout);
    removeTextTimeout = null;
  }

  // Set the new text and fade in
  hoverText.textContent = message;
  hoverText.style.opacity = '1';
}

/**
 * Hide (fade out) the current message with a short delay, so that
 * a quick hover over the other logo cancels the fade.
 */
function hideMessage() {
  // Clear any existing timeouts before scheduling a new hide
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }
  if (removeTextTimeout) {
    clearTimeout(removeTextTimeout);
    removeTextTimeout = null;
  }

  // Schedule the fade-out after a short delay (e.g., 150ms)
  fadeOutTimeout = setTimeout(() => {
    hoverText.style.opacity = '0';

    // After the fade-out transition (0.3s), clear the text completely
    removeTextTimeout = setTimeout(() => {
      hoverText.textContent = "";
    }, 300);
  }, 150);
}

// ---------- Original Game Hover ----------
originalLogo.addEventListener('mouseenter', () => {
  // Scale image up
  originalLogo.style.transform = 'scale(1.1)';
  // Fade text in
  showMessage(
    "Selecting this will take you to the guide for the latest 1.50q version of the original classic game - Battle Realms: Winter of the Wolf (2002)"
  );
});
originalLogo.addEventListener('mouseleave', () => {
  // Scale image back
  originalLogo.style.transform = 'scale(1)';
  // Fade text out (with slight delay)
  hideMessage();
});

// ---------- Remaster Game Hover ----------
remasterLogo.addEventListener('mouseenter', () => {
  // Scale image up
  remasterLogo.style.transform = 'scale(1.1)';
  // Fade text in
  showMessage(
    "Selecting this will take you to the guide for the 1.59.1 version of the remastered Steam release - Battle Realms: Zen Edition (2019-present)"
  );
});
remasterLogo.addEventListener('mouseleave', () => {
  // Scale image back
  remasterLogo.style.transform = 'scale(1)';
  // Fade text out (with slight delay)
  hideMessage();
});
