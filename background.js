// background.js

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "log") {
    console.log(request.message);
  }
  
  if (request.action === "fillForm") {
    // Forward the message to the active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: fillFormFields,
        args: [request.profile]
      });
    });
  }
});

// Function to be executed in the content script context
function fillFormFields(profile) {
  let firstNameInput = document.querySelector('input[data-automation-id="legalNameSection_firstName"]');
  if (firstNameInput) firstNameInput.value = profile.firstName;

  let lastNameInput = document.querySelector('input[data-automation-id="legalNameSection_lastName"]');
  if (lastNameInput) lastNameInput.value = profile.lastName;

  let emailInput = document.querySelector('input[data-automation-id="contactInformation_email"]');
  if (emailInput) emailInput.value = profile.email;

  let phoneInput = document.querySelector('input[data-automation-id="phone-number"]');
  if (phoneInput) phoneInput.value = profile.phone;
}
