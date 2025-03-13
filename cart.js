// Function to add item to cart
function addToCart(button) {
    const product = button.parentElement;
    const name = product.querySelector('h2').textContent; // Product name
    const image = product.querySelector('img').src; // Product image
    let quantity = 1; // Default quantity

    // Retrieve cart items from localStorage or initialize as empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        // If product already exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If it's a new product, add it with quantity 1
        cartItems.push({ name, image, quantity });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert(`${name} has been added to your cart!`);
}

// Function to update the quantity of an item in the cart
function updateQuantity(itemName, action) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the item in the cart
    const item = cartItems.find(item => item.name === itemName);

    if (item) {
        // Update the quantity based on the action ('increase' or 'decrease')
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Reload the cart page to reflect the changes
        window.location.reload();
    }
}

// Function to remove an item from the cart
function removeFromCart(item) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Filter out the item to be removed
    const updatedCartItems = cartItems.filter(cartItem => cartItem.name !== item.name);

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Reload the page to reflect the changes
    window.location.reload();
}

// On page load, display the cart items
window.onload = function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            // Create the product image
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;

            // Create the product name
            const itemName = document.createElement('div');
            itemName.classList.add('cart-item-name');
            itemName.textContent = item.name;

            // Create the quantity controls
            const itemQuantity = document.createElement('div');
            itemQuantity.classList.add('cart-item-quantity');
            itemQuantity.innerHTML = `
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'decrease')">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'increase')">+</button>
            `;

            // Remove button to remove the product
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-btn');
            removeButton.textContent = 'Remove';
            removeButton.onclick = function() {
                removeFromCart(item);
            };

            // Append everything to the cart item div
            cartItemDiv.appendChild(itemImage);
            cartItemDiv.appendChild(itemName);
            cartItemDiv.appendChild(itemQuantity);
            cartItemDiv.appendChild(removeButton);

            // Append the cart item div to the cart container
            cartContainer.appendChild(cartItemDiv);
        });
    }
}
