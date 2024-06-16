chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fillForm") {
    let profile = request.profile;
    if (profile) {
      let firstNameInput = document.querySelector('input[data-automation-id="legalNameSection_firstName"]');
      if (firstNameInput) firstNameInput.value = profile.firstName;

      let lastNameInput = document.querySelector('input[data-automation-id="legalNameSection_lastName"]');
      if (lastNameInput) lastNameInput.value = profile.lastName;

      let emailInput = document.querySelector('input[data-automation-id="contactInformation_email"]');
      if (emailInput) emailInput.value = profile.email;

      let phoneInput = document.querySelector('input[data-automation-id="phone-number"]');
      if (phoneInput) phoneInput.value = profile.phone;
    } else {
      console.error("Profile data not found in storage.");
    }
  }
});
