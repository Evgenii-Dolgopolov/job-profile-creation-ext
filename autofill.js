// Listen for messages from popup.js 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fillForm") {
    fillFormFields(request.profile) // Call the function to fill form fields
  }
})

// Function to fill form fields with profile data
function fillFormFields(profile) {
  if (profile) {
    // Find the input element for the first name using its data-automation-id attribute
    let firstNameInput = document.querySelector('input[data-automation-id="legalNameSection_firstName"]')
    if (firstNameInput) firstNameInput.value = profile.firstName

    // Find the input element for the last name using its data-automation-id attribute
    let lastNameInput = document.querySelector('input[data-automation-id="legalNameSection_lastName"]')
    if (lastNameInput) lastNameInput.value = profile.lastName

    // Find the input element for the email using its data-automation-id attribute
    let emailInput = document.querySelector('input[data-automation-id="email"]')
    if (emailInput) emailInput.value = profile.email

    // Find the input element for the phone number using its data-automation-id attribute
    let phoneInput = document.querySelector('input[data-automation-id="phone-number"]')
    if (phoneInput) phoneInput.value = profile.phone
  } else {
    // Log an error message to the console if the profile data is not found
    console.error("Profile data not found in storage.")
  }
}
