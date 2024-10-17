function renderCart() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    showNotification("Please log in to view your cart.", "red");
    return;
  }

  const userCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
  const cartItems = userCarts[loggedInUser] || [];

  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  cartContainer.innerHTML = ""; // Clear existing items

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartContainer.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"; // Add grid classes

    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "border p-4 rounded shadow-lg bg-white";

      cartItem.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${item.name}</h3>
            <img src="${
              item.image
            }" class="w-full h-96 object-cover mb-4" alt="${item.name}">
            <p class="text-xl font-semibold">$${item.price.toFixed(2)}</p>
            <button class="bg-red-500 text-white py-2 px-4 rounded mt-2 remove-item">Remove</button>
          `;

      // Add event listener for removing item from cart
      cartItem.querySelector(".remove-item").addEventListener("click", () => {
        removeFromCart(index);
      });

      cartContainer.appendChild(cartItem);
      totalPrice += item.price;
    });
  }

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    showNotification("Please log in first.", "red");
    return;
  }

  let userCarts = JSON.parse(localStorage.getItem("userCarts"));
  let cart = userCarts[loggedInUser];

  if (cart && cart.length > 0) {
    const removedItem = cart.splice(index, 1); // Remove the item from the cart
    userCarts[loggedInUser] = cart; // Update cart for the user
    localStorage.setItem("userCarts", JSON.stringify(userCarts)); // Update local storage
    renderCart(); // Re-render the cart

    showNotification(`${removedItem[0].name} removed from the cart!`, "green");
  }
}

// Function to show notifications
function showNotification(message, color = "green") {
  const notification = document.getElementById("cart-notification");
  notification.textContent = message;
  notification.className = `fixed bottom-4 right-4 bg-${color}-500 text-white py-2 px-4 rounded shadow-lg`; // Dynamic color
  notification.classList.remove("hidden");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", renderCart);
