
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "user" && password === "1234") {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "products.html";
            } else {
                alert("Invalid username or password");
            }
        });
    }
    if (document.getElementById("productList")) {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            window.location.href = "login.html";
        }


        const products = [
            { id: 1, name: "TV", price: 10000, img: "https://cdn-icons-png.flaticon.com/512/1320/1320765.png" },
            { id: 2, name: "Headphones", price: 199, img: "https://img.icons8.com/ios/512/headphones.png" },
            { id: 3, name: "Laptop", price: 49999, img: "https://img.icons8.com/ios/512/laptop.png" },
            { id: 4, name: "Camera", price: 24999, img: "https://img.icons8.com/ios/512/camera.png" },
        ];



        const container = document.getElementById("productList");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        document.getElementById("cartCount").textContent = cart.length;

        products.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
      `;
            container.appendChild(card);
        });
    }
    if (document.getElementById("checkoutList")) {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            window.location.href = "login.html";
        }

        const checkoutList = document.getElementById("checkoutList");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;

        checkoutList.innerHTML = cart.length
            ? ""
            : "<p>Your cart is empty 🛒</p>";

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
        <span>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
            checkoutList.appendChild(div);
        });

        document.getElementById("totalPrice").textContent = total;
    }
});

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    document.getElementById("cartCount").textContent = cart.length;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}
function goToProducts() {
    window.location.href = "products.html";
}
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
