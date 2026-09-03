function showBuy() {

    document.getElementById("buySection").style.display = "block";
    document.getElementById("sellSection").style.display = "none";

    document.getElementById("buyBtn").className = "active-btn";
    document.getElementById("sellBtn").className = "outline-btn";
}


function showSell() {

    document.getElementById("buySection").style.display = "none";
    document.getElementById("sellSection").style.display = "block";

    document.getElementById("buyBtn").className = "outline-btn";
    document.getElementById("sellBtn").className = "active-btn";
}


// Show BUY section when page opens
showBuy();
function showInterest(vehicle) {
    alert("Thank you for your interest in " + vehicle + "!");
}
function saveVehicle(event) {
    event.preventDefault();

    const form = event.target;

    const name = form.querySelector('input[type="text"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (phone === "") {
        alert("Please enter your phone number.");
        return;
    }

    if (phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }

    alert("Vehicle details saved successfully!");
}
function previewImage(input, previewId) {

    const preview = document.getElementById(previewId);

    if (input.files && input.files[0]) {

        const reader = new FileReader();

        reader.onload = function(event) {

            preview.innerHTML =
                '<img src="' + event.target.result + '" alt="Vehicle photo">';

        };

        reader.readAsDataURL(input.files[0]);
    }
}
function filterVehicles() {

    const searchText =
        document.getElementById("vehicleSearch").value.toLowerCase();

    const priceValue =
        document.getElementById("priceFilter").value;

    const yearValue =
        document.getElementById("yearFilter").value;

    const vehicles =
        document.querySelectorAll(".vehicle-card");

    vehicles.forEach(function(vehicle) {

        const vehicleText =
            vehicle.innerText.toLowerCase();

        const priceMatch =
            vehicleText.match(/₹([\d,]+)/);

        const price = priceMatch
            ? Number(priceMatch[1].replace(/,/g, ""))
            : 0;

        const searchMatch =
            vehicleText.includes(searchText);

        const priceMatchResult =
            !priceValue ||
            price <= Number(priceValue);

        const yearMatchResult =
            !yearValue ||
            vehicleText.includes(yearValue);

        if (
            searchMatch &&
            priceMatchResult &&
            yearMatchResult
        ) {
            vehicle.style.display = "flex";
        } else {
            vehicle.style.display = "none";
        }

    });
}

function showDetails(vehicle, price, location, year) {

    const popup = document.getElementById("detailsPopup");

    const details = document.getElementById("popupDetails");

    details.innerHTML = `
        <p>🚗 <b>Vehicle:</b> ${vehicle}</p>
        <p>💰 <b>Price:</b> ${price}</p>
        <p>📍 <b>Location:</b> ${location}</p>
        <p>📅 <b>Year:</b> ${year}</p>
    `;

    popup.style.display = "flex";
}

function closeDetails() {

    document.getElementById("detailsPopup").style.display = "none";
}
function toggleFavorite(button) {

    if (button.classList.contains("saved")) {

        button.classList.remove("saved");
        button.innerHTML = "♡ Favorite";

    } else {

        button.classList.add("saved");
        button.innerHTML = "♥ Saved";

    }
}
