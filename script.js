let currentStage = 1;
let valid = false;
const stages = document.querySelectorAll(".stage");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");
const email = document.getElementById("email");
const submitted = document.getElementById("submitted");
const tickIcon = document.getElementById("tick");
const emailRadio = document.getElementById("radioEmail");
const accountRadio = document.getElementById("radioAccount");
const anonRadio = document.getElementById("radioAnon");

const indOne = document.getElementById("one");
const indTwo = document.getElementById("two");
const indThree = document.getElementById("three");

let canSubmit = false;

indOne.classList.add("bg-blue-300");

nextBtn.addEventListener("click", () => {
  if (validInputs()) {
    if (currentStage < stages.length) {
      stages[currentStage - 1].classList.add("hidden");
      stages[currentStage].classList.remove("hidden");
      currentStage++;
      updateButtons();
    } else {
      return;
    }
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStage > 1) {
    stages[currentStage - 1].classList.add("hidden");
    stages[currentStage - 2].classList.remove("hidden");
    currentStage--;
    updateButtons();
  }
});

submitBtn.addEventListener("click", (event) => {
  if (emailRadio.checked && email.value != "") {
    canSubmit = true;
  }
  if (anonRadio.checked || accountRadio.checked) {
    canSubmit = true;
  }
  if (canSubmit) {
    event.preventDefault();
    stages[currentStage - 1].classList.add("hidden");
    stages[currentStage].classList.remove("hidden");
    currentStage++;
    tickIcon.setAttribute("fill", "#63E6BE");
    updateButtons();
  }
});

function validInputs() {
  // Get all input, radio, and select elements within the div
  var inputs = stages[currentStage - 1].querySelectorAll(
    "input, select, textarea"
  );
  var allValid = true; // Flag to track if all elements are valid

  // Loop through each element
  inputs.forEach((element) => {
    // Reset the background color
    element.style.borderColor = "";
    element.style.color = "black";

    // Check if the element is a radio button
    if (element.type === "radio") {
      var name = element.name;
      var radios = stages[currentStage - 1].querySelectorAll(
        `input[name="${name}"]`
      );

      var isChecked = Array.from(radios).some((radio) => radio.checked);
      if (!isChecked) {
        radios.forEach((radio) => (radio.style.borderColor = "#ff6666"));
        allValid = false; // If no radio button in the group is checked, set flag to false
      }
    } else if (element.tagName === "SELECT") {
      // Check if the select element has a selected value
      if (element.value === "") {
        element.style.borderColor = "#ff6666"; // If the select element has no value, make it red
        allValid = false; // Set flag to false
      }
    } else {
      // Check if the input value is empty
      if (element.value === "") {
        element.style.borderColor = "#ff6666"; // If any input is empty, make it red
        allValid = false; // Set flag to false
      }
    }
  });

  return allValid; // Return the flag indicating if all elements are valid
}
function showEmail(input) {
  if (input.value == "account" || input.value == "none") {
    email.style.display = "none";
    canSubmit = true;
    return;
  }

  email.style.display = "block";
}

function updateButtons() {
  if (currentStage === 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    indOne.classList.add("bg-blue-300");
    indTwo.classList.remove("bg-blue-300");
    indThree.classList.remove("bg-blue-300");
  } else if (currentStage === 3) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    indThree.classList.add("bg-blue-300");
    indOne.classList.remove("bg-blue-300");
    indTwo.classList.remove("bg-blue-300");
  } else if (currentStage === 4) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    indThree.classList.remove("bg-blue-300");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    indTwo.classList.add("bg-blue-300");
    indOne.classList.remove("bg-blue-300");
    indThree.classList.remove("bg-blue-300");
  }
}
