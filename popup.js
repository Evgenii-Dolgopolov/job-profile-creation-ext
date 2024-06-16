// Listen for form submission
document
  .getElementById("profileForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    // Construct the profile object from form inputs
    let profile = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      resume: document.getElementById("resume").files[0],
    }

    // Save profile to local storage
    chrome.storage.local.set({ profile: profile }, function () {
      // Retrieve the profile from local storage to confirm it was saved
      chrome.storage.local.get("profile", function (data) {
        if (data.profile) {
          // Show confirmation message
          document.getElementById("confirmationMessage").style.display = "block"
          // Log success message to the console
          console.log(
            "Profile saved to local storage: " + JSON.stringify(data.profile)
          )
        } else {
          // Log failure message to the console
          console.log("Failed to save profile.")
        }
      })
    })
  })

// Listen for autofill button click
document.getElementById("autofill").addEventListener("click", function () {
  // Retrieve profile data from local storage
  chrome.storage.local.get("profile", function (data) {
    let profile = data.profile
    if (profile) {
      // Send message to autofill script to fill the form fields
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "fillForm",
          profile: profile,
        })
      })
    } else {
      console.log("Profile data not found in storage.")
      alert(
        "Profile data not found. Please create a profile."
      )
    }
  })
})
