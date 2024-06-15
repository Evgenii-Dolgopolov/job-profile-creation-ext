document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let profile = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    resume: document.getElementById('resume').files[0]
  };
  chrome.storage.local.set({profile: profile}, function() {
    document.getElementById('confirmationMessage').style.display = 'block';
  });
});
