let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, button) {
    let image = button.parentElement.querySelector("img");

    if (!image) {
        image = document.querySelector('img[alt="' + name + '"]');
    }

    let product = {
        name: name,
        price: price,
        image: image ? image.src : ""
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}
function updateCartCount() {
    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function searchProducts() {
    let searchText = document.getElementById("search-input").value.toLowerCase();

    let sneakers = document.getElementById("classic-sneakers");
    let headphones = document.getElementById("wireless-headphones");
    let watch = document.getElementById("smart-watch");

    sneakers.style.display = "none";
    headphones.style.display = "none";
    watch.style.display = "none";

    if (sneakers.innerText.toLowerCase().includes(searchText)) {
        sneakers.style.display = "block";
    }

    if (headphones.innerText.toLowerCase().includes(searchText)) {
        headphones.style.display = "block";
    }

    if (watch.innerText.toLowerCase().includes(searchText)) {
        watch.style.display = "block";
    }
}
document.getElementById("search-input")?.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchProducts();
    }
});
function displayCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    cart.forEach(function(product, index) {
        total = total + product.price;

        let item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-product-image">

            <div>
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

updateCartCount();
displayCart();

function showMessage(event) {
    event.preventDefault();

    alert("Thank you for contacting PROMZSE STORE! We will get back to you soon.");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with PROMZSE STORE!");
}