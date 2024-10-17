//login form validation
function validateInputs() {
  const emailInput = document.getElementById("loginEmail").value.trim();
  const passwordInput = document.getElementById("loginPassword").value.trim();
  let errors = [];

  // Validate email and password
  if (!validateEmail(emailInput)) {
    errors.push("Please enter a valid email address.");
  }

  if (!validatePassword(passwordInput)) {
    errors.push(
      "Password must be at least 6 characters long and include uppercase, number, and special character."
    );
  }

  // Show errors if any
  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === emailInput && user.password === passwordInput
  );

  // Successful login
  if (user) {
    localStorage.setItem("loggedInUser", emailInput);
    console.log("Logged in user:", localStorage.getItem("loggedInUser"));

    showNotification("Login successful! Redirecting to products...");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 1000);
  } else {
    showErrors(["Invalid email or password."]);
  }
}

function validatePassword(password) {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  return re.test(password); // At least 6 characters, with an uppercase, number, and special char
}

// Show errors in a modal
function showErrors(errors) {
  if (errors.length > 0) {
    const modal = document.createElement("div");
    modal.id = "errorModal";
    modal.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";

    const modalContent = document.createElement("div");
    modalContent.className = "bg-white rounded-lg p-4 max-w-sm w-full";

    const title = document.createElement("h2");
    title.className = "text-xl font-semibold mb-2";
    title.textContent = "Error";

    const errorList = document.createElement("ul");
    errorList.className = "text-red-600";

    errors.forEach((error) => {
      const li = document.createElement("li");
      li.textContent = error;
      errorList.appendChild(li);
    });

    const closeButton = document.createElement("button");
    closeButton.className = "mt-4 bg-red-500 text-white py-2 px-4 rounded";
    closeButton.textContent = "Close";

    closeButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modalContent.appendChild(title);
    modalContent.appendChild(errorList);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }
}

// Show notification
function showNotification(message) {
  const modal = document.createElement("div");
  modal.id = "notificationModal";
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50";

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white rounded-lg p-4 max-w-sm w-full";

  const title = document.createElement("h2");
  title.className = "text-xl font-semibold mb-2";
  title.textContent = "Notification";

  const messageElement = document.createElement("p");
  messageElement.className = "text-green-600";
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.className = "mt-4 bg-green-500 text-white py-2 px-4 rounded";
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modalContent.appendChild(title);
  modalContent.appendChild(messageElement);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  // Automatically close the modal after 3 seconds
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 3000);
}

//register form validation
function validateRegisterForm() {
  const userName = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const rePassword = document.getElementById("registerRePassword").value.trim();

  let errors = [];

  if (!userName) {
    errors.push("Name is required.");
  }

  if (!validateEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email is already registered
  if (users.some((user) => user.email === email)) {
    errors.push("Email is already registered.");
  }

  if (!validatePhone(phone)) {
    errors.push("Please enter a valid phone number.");
  }

  if (!validatePassword(password)) {
    errors.push(
      "Password must be at least 6 characters, with uppercase, number, and special character."
    );
  }

  if (password !== rePassword) {
    errors.push("Passwords do not match.");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return false;
  }

  // Return the valid user data
  return { userName, email, phone, password };
}

function addToLocal() {
  const userData = validateRegisterForm();

  if (userData) {
    const { userName, email, phone, password } = userData;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Generate a unique userId
    const userId = Date.now(); // Use timestamp or generate random ID

    const newUser = {
      id: userId,
      name: userName,
      email: email,
      password: password,
      phone: phone,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showNotification("Registration successful!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return re.test(phone);
}
