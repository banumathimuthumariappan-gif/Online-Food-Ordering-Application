document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  const filterButtons = document.querySelectorAll(".category-button");

  let products = [];
  let cart = {};
  let activeFilter = "all";

  // FETCHING JSON DATA
  fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data.products;
      window.setProducts(products);
      displayMenu(products); // Showing all products on load
      document
        .querySelector('.category-button[data-filter="All"]')
        .classList.add("active");
    })
    .catch((error) => console.error("Error loading JSON Data"));

  // ==============================================
  // Function to display menu items
  function displayMenu(items) {
    menuContainer.innerHTML = "";

    if (items.length == 0) {
      menuContainer.innerHTML = `<p class="text-center">No items found</p>`;
      return;
    }

    items.forEach((item) => {
      const quantity = cart[item.itemId] ? cart[item.itemId] : 0;
      menuContainer.innerHTML += `
                <div class="card menu-card" style="width: 19rem">
                    <img src="${item.imageURL}" alt="${item.itemName}" />
                    <div class="card-body menu-body">
                        <h5 class="card-title menu-name">
                            ${item.itemName}
                        </h5>
                        <p class="card-subtitle menu-price">Price: Rs.${
                          item.price
                        }</p>
                        <p class="card-text menu-description">${
                          item.description
                        }</p>

                    </div>
                    <div class="card-footer menu-footer">
                        <div>
                            <span class="badge rounded-pill text-bg-warning text-light-emphasis">${
                              item.bestSeller ? `<span>BestSeller</span>` : ""
                            }</span>
                            
                            ${
                              item.itemType && item.itemType !== "Both"
                                ? `
                            <span class="badge rounded-pill text-bg-primary text-body-emphasis">
                            ${
                              item.itemType === "Vegetarian" ? "Veg" : "Non-Veg"
                            }
                            </span>
                            `
                                : ""
                            }
                        </div>
                        <div>
                        ${
                          quantity === 0
                            ? `<button class="cart-btn btn btn-primary" data-id="${item.itemId}">Add to Cart</button>`
                            : `<div class="quantity-controls d-flex align-items-center" data-id="${item.itemId}">
                            <button class="btn btn-sm btn-outline-danger minus-btn" data-id="${item.itemId}">-</button>
                            <span class="mx-2 quantity-text">${quantity}</span>
                            <button class="btn btn-sm btn-outline-success plus-btn" data-id="${item.itemId}">+</button>
                        </div>`
                        }    
                        </div>
                    </div>
                </div>
            `;
    });

    attachCartEvents();
  }

  // ==============================================
  // Attaching event listeners to "Add to Cart" buttons
  function attachCartEvents() {
    document.querySelectorAll(".cart-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.dataset.id;
        cart[id] = 1;
        window.addToCart(id, 1);
        refreshMenuAfterCartChange();
      });
    });

    // PLUS BUTTON
    document.querySelectorAll(".plus-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        cart[id] = (cart[id] || 0) + 1;
        window.addToCart(id, cart[id]);
        refreshMenuAfterCartChange();
      });
    });

    // MINUS BUTTON
    document.querySelectorAll(".minus-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        if (cart[id] > 1) {
          cart[id]--;
          window.addToCart(id, cart[id]);
        } else {
          delete cart[id];
          window.removeFromCart(id);
        }
        refreshMenuAfterCartChange();
      });
    });
  }

  function refreshMenuAfterCartChange() {
    if (activeFilter === "all") {
      displayMenu(products);
    } else {
      const filteredItems = products.filter(
        (item) => item.category.toLowerCase() === activeFilter
      );
      displayMenu(filteredItems);
    }
  }
  // ==============================================
  // Filter menu items when a button is clicked
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Removing "active" class from all buttons
      filterButtons.forEach((button) => button.classList.remove("active"));

      // Adding "active" class to the clicked button
      button.classList.add("active");

      activeFilter = button.dataset.filter.toLowerCase();

      if (activeFilter == "all") {
        displayMenu(products);
      } else {
        const filteredItems = products.filter(
          (item) => item.category.toLowerCase() == activeFilter
        );
        displayMenu(filteredItems);
      }
    });
  });
});
