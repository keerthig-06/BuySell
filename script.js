function register() {

    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let phone = document.getElementById("registerPhone").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (name == "" || email == "" || phone == "" ||
        password == "" || confirmPassword == "") {

        alert("Please fill all the fields");
        return;
    }

    if (password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let user = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    localStorage.setItem("dealhubUser", JSON.stringify(user));

    alert("Registration successful!");

    window.location.href = "login.html";
}


function login() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = localStorage.getItem("dealhubUser");

    if (storedUser == null) {
        alert("No account found. Please register first.");
        return;
    }

    let user = JSON.parse(storedUser);

    if (email == user.email && password == user.password) {

        alert("Login successful!");

        window.location.href = "home.html";

    } else {

        alert("Invalid email or password");

    }
}


function buyProduct(name, price, emi) {

    if (emi) {

        let months = prompt(
            "Choose EMI duration:\n1. 3 months\n2. 6 months\n3. 12 months"
        );

        if (months == "3") {
            months = 3;
        } else if (months == "6") {
            months = 6;
        } else if (months == "12") {
            months = 12;
        } else {
            alert("Invalid EMI duration");
            return;
        }

        let monthly = Math.round(price / months);

        alert(
            "Product: " + name +
            "\nPrice: ₹" + price.toLocaleString("en-IN") +
            "\nEMI: " + months + " months" +
            "\nMonthly payment: ₹" + monthly.toLocaleString("en-IN")
        );

    } else {

        alert("Order placed successfully!");

    }
}


function searchProducts() {

    let text = document.getElementById("search").value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        let name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(text)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


function showCategory(category) {

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        let productCategory = card.getAttribute("data-category");

        if (category == "All" || productCategory == category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


function goToSell() {
    window.location.href = "sell.html";
}


function logout() {
    window.location.href = "login.html";
}


/* SELL PRODUCT */

function postProduct() {

    let name = document.getElementById("productName").value;
    let category = document.getElementById("productCategory").value;
    let price = document.getElementById("productPrice").value;
    let location = document.getElementById("productLocation").value;
    let image = document.getElementById("productImage").files[0];
    let description = document.getElementById("productDescription").value;

    if (name == "" || category == "" || price == "" ||
        location == "" || image == null) {

        alert("Please fill all the details");
        return;
    }

    let reader = new FileReader();

    reader.onload = function() {

        let product = {
            name: name,
            category: category,
            price: price,
            location: location,
            description: description,
            image: reader.result
        };

        localStorage.setItem("product", JSON.stringify(product));

        alert("Product posted successfully!");

        window.location.href = "home.html";
    };

    reader.readAsDataURL(image);
}


/* SHOW NEW PRODUCT */

function showNewProduct() {

    let product = localStorage.getItem("product");

    if (product == null) {
        return;
    }

    product = JSON.parse(product);

    let container = document.getElementById("newProduct");

    if (container == null) {
        return;
    }

    container.innerHTML = `
        <div class="card" data-category="${product.category}">

            <img src="${product.image}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <p class="location">📍 ${product.location}</p>

                <p class="emi">
                    ${product.price >= 10000
                    ? "✓ EMI Available"
                    : "Cash Payment"}
                </p>

                <button class="buy"
                    onclick="buyProduct('${product.name}', ${product.price}, ${product.price >= 10000})">
                    Buy Now
                </button>

            </div>
        </div>
    `;
}


showNewProduct();