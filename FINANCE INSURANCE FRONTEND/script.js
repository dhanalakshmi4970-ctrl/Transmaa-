function openFinance() {
    window.location.href = "finance.html";
}

function openInsurance() {
    window.location.href = "insurance.html";
}

function showHelp() {
    alert(
        "Select Finance or Insurance and enter your vehicle details."
    );
}

function submitDetails() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const vehicle = document.getElementById("vehicle").value.trim();
    const rc = document.getElementById("rc").value.trim();
    const loan = document.getElementById("loan").value.trim();

    if (
        name === "" ||
        phone === "" ||
        vehicle === "" ||
        rc === "" ||
        loan === ""
    ) {
        alert("Please fill all the details.");
        return;
    }

    window.location.href = "success.html";
}