document.addEventListener("DOMContentLoaded", () => {

  // Function to display User Info + Log Out button
  function displayUser(userName) {
    const authSection = document.getElementById("auth-section");
    authSection.innerHTML = `
    <div id="profile-section">
        <img
            src="./images/avatar-1.jpeg"
            alt="Avatar"
            class="rounded-circle me-2"
            width="32"
            height="32"
        />
        <span class="fw-semibold">${userName}</span>
        <button class="btn btn-danger" id="logout">Logout</button>
    </div>
    `;

    // Attach logout listener
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
      authSection.innerHTML = `
      <button
        id="signInButton"
        class="btn btn-primary mb-2 mb-sm-0"
        data-bs-toggle="modal"
        data-bs-target="#signInModal"
        >
        Sign In
      </button>
      `;
    });
  }

  // =============== SIGN IN ====================

  document.getElementById("signInForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    alert(`Signed in successfully with the email: ${email}`);

    // UserName
    const userName = email.split("@")[0];

    const modalElement = document.getElementById("signInModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    displayUser(userName);
  });

  // ======================= REGISTER ======================
  // Opening Register Modal
  document.getElementById("registerLink").addEventListener("click", (e) => {
    // Closing sign In modal
    const signInModalElement = document.getElementById("signInModal");
    const signInModal = bootstrap.Modal.getOrCreateInstance(signInModalElement);
    signInModal.hide();

    // Opening Register Modal
    const registerModalElement = document.getElementById("registerModal");
    const registermodal =
      bootstrap.Modal.getOrCreateInstance(registerModalElement);
    registermodal.show();
  });

  // Register Modal
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const registeremail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (registerPassword !== confirmPassword) {
      alert("Password do not match. Please enter again");
    } else {
      alert(`User registered with email ${registeremail}`);

      // UserName
      const userName = registeremail.split("@")[0];

      const modalElement = document.getElementById("registerModal");
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide();

      displayUser(userName);
    }
  });

  // Back To Sign In Modal
  document.getElementById("backTosignInLink").addEventListener("click", (e) => {
    // Closing Register Modal
    const registerModalElement = document.getElementById("registerModal");
    const registerModal =
      bootstrap.Modal.getOrCreateInstance(registerModalElement);
    registerModal.hide();

    // Opening Sign In Modal
    const signInModalElement = document.getElementById("signInModal");
    const signInModal = bootstrap.Modal.getOrCreateInstance(signInModalElement);
    signInModal.show();
  });

  // ================ CART MODEL =================
  let cart = [];
  let products = [];
  const cartModalBody = document.getElementById("cartModalBody");

  function addToCart(id) {
    const product = products.find((item) => item.itemId == id);
    const existingItem = cart.find((item) => item.itemId == id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    const existingItem = cart.find((item) => item.itemId == id);

    if(existingItem) {
      if(existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        cart = cart.filter((item) => item.itemId !== id);
      }
      updateCartUI();
    }
  }

  // Function update Cart
  function updateCartUI() {
    if (cart.length == 0) {
      cartModalBody.innerHTML = `<p>Your Cart is empty!!!</p>`;
      return;
    }

    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    cartModalBody.innerHTML = `
      <ul class="list-group cart-items">
          ${cart
            .map(
              (item) => `
            <li class="d-flex align-items-center mb-3">
            <img src="${item.imageURL}" class="rounded me-2" width="25" height="25" />
            ${item.itemName} * ${item.quantity}
            <span> = Rs.${Number(item.price) * item.quantity.toFixed(2)}</span>
            </li>`
            )
            .join("")}
      </ul>
      <div id="cart-total">
            <span>Total Items: ${totalItems}</span>
            <span>Total Price: ${totalPrice}</span>
      </div>
      `;
  }

  // ============ CHECKOUT PAGE OPEN ==================
  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", () => {
    localStorage.setItem("cartData", JSON.stringify(cart));
    window.location.href = "checkout.html";
  });

  //  Make cart functiions available globally for menu.js
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart
  window.setProducts = (data) => {
    products = data;
  };

  //  ============== CART MODAL OPEN =======================
  document.getElementById("cart-button").addEventListener("click", (e) => {
    const cartMoodalElement = document.getElementById("cartModal");
    const cartModal = bootstrap.Modal.getOrCreateInstance(cartMoodalElement);
    cartModal.show();
    updateCartUI();
  });

  // ================ FOOTER =================
  // Social Media Icons
  // Instagram
  document.getElementById("instagram-icon").addEventListener("click", () => {
    window.open("https://www.instagram.com/", "_blank");
  });

  // Facebook
  document.getElementById("facebook-icon").addEventListener("click", () => {
    window.open("https://www.facebook.com/", "_blank");
  });

  // Whatsapp
  document.getElementById("whatsapp-icon").addEventListener("click", () => {
    window.open("https://www.whatsapp.com/", "_blank");
  });

  // Mobile app download
  // Apple Store
  document.getElementById("apple-store").addEventListener("click", () => {
    window.open("https://apps.apple.com/", "_blank");
  });

  // Play Store
  document.getElementById("play-store").addEventListener("click", () => {
    window.open("https://play.google.com/", "_blank");
  });

  // ================ RECIPES =================
  // Order Now Button Navigation
  document.getElementById("orderButton").addEventListener("click", () => {
    document.getElementById("recipes").scrollIntoView({
      behavior: "smooth",
    });
  });

  // ================ SUBSCRIBE ===============
  document.getElementById("subscribe-submit").addEventListener("click", () => {
    alert("Thanks for subscribing!");
  });
});
