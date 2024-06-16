document.getElementById("profileForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Construct the profile object from form inputs
  let profile = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    resume: document.getElementById("resume").files[0] // Assuming file input for resume
  };

  // Save profile to local storage
  chrome.storage.local.set({ profile: profile }, function () {
    // Check if the profile was successfully saved
    chrome.storage.local.get('profile', function(data) {
      if (data.profile) {
        document.getElementById("confirmationMessage").style.display = "block";
        chrome.runtime.sendMessage({ action: "log", message: 'Profile saved to local storage: ' + JSON.stringify(data.profile) });
      } else {
        chrome.runtime.sendMessage({ action: "log", message: 'Failed to save profile.' });
      }
    });
  });
});

document.getElementById("autofill").addEventListener("click", function () {
  // Retrieve profile data from local storage
  chrome.storage.local.get('profile', function(data) {
    let profile = data.profile;
    if (profile) {
      // Send message to background script to fill form fields
      chrome.runtime.sendMessage({ action: "fillForm", profile: profile });
    } else {
      chrome.runtime.sendMessage({ action: "log", message: 'Profile data not found in storage.' });
      alert('Profile data not found. Please create a profile or autofill profile information.');
    }
  });
});
