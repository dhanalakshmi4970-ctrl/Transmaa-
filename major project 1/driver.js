function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    window.scrollTo(0, 0);
}
function sendOTP() {

    const mobile = document.getElementById("loginMobile").value;

    if (mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    alert("OTP sent successfully.");

    document.getElementById("otpBox").classList.remove("hidden");
}


function loginDriver() {

    const otp = document.getElementById("otp").value;

    if (otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    alert("Login successful!");

    showPage("loads");
}

function registerOTP() {

    const mobile = document.getElementById("registerMobile").value;

    if (mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    alert("OTP sent successfully.");

    document
        .getElementById("registerOtpBox")
        .classList.remove("hidden");
}

function nextStep(step) {

    if (step === 2) {

        const otp = document.getElementById("registerOtp").value;

        if (otp.length !== 6) {
            alert("Please enter a valid OTP.");
            return;
        }
    }


    if (step === 3) {

        const name = document.getElementById("driverName").value;
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;

        if (!name || !dob || !gender) {
            alert("Please fill all personal information.");
            return;
        }
    }


    if (step === 4) {

        const experience =
            document.getElementById("experience").value;

        const vehicleType =
            document.getElementById("vehicleType").value;

        const vehicleModel =
            document.getElementById("vehicleModel").value;

        const vehicleNumber =
            document.getElementById("vehicleNumber").value;

        const dl =
            document.getElementById("dlNumber").value;

        const pan =
            document.getElementById("panNumber").value;


        if (
            !experience ||
            !vehicleType ||
            !vehicleModel ||
            !vehicleNumber ||
            !dl ||
            !pan
        ) {
            alert("Please fill all vehicle details.");
            return;
        }

        document.getElementById("checkName").textContent = document.getElementById("driverName").value;

        document.getElementById("checkDob").textContent = document.getElementById("dob").value;

        document.getElementById("checkGender").textContent = document.getElementById("gender").value;

        document.getElementById("checkExperience").textContent = experience + " Years";

        document.getElementById("checkVehicle").textContent = vehicleType;

        document.getElementById("checkModel").textContent = vehicleModel;

        document.getElementById("checkNumber").textContent = vehicleNumber;

        document.getElementById("checkDL").textContent = dl;

        document.getElementById("checkPAN").textContent = pan;
    }

    document.querySelectorAll(".register-step")
        .forEach(stepElement => {
            stepElement.classList.add("hidden");
        });

    document
        .getElementById("registerStep" + step)
        .classList.remove("hidden");
}

function startJourney() {

    alert(
        "Registration submitted successfully. " +
        "Your background verification is in progress."
    );

    showPage("verification");
}

function searchLoads() {

    const from =
        document.getElementById("fromRoute").value;

    const to =
        document.getElementById("toRoute").value;

    if (!from || !to) {
        alert("Please enter From and To locations.");
        return;
    }

    alert(
        "Searching available loads from " +
        from + " to " + to
    );
}

function acceptLoad(route) {

    document.getElementById("acceptedRoute")
        .textContent = route;

    showPage("accepted");

    addToHistory(route);
}

function addToHistory(route) {

    const historyList =
        document.getElementById("historyList");

    const historyCard =
        document.createElement("div");

    historyCard.className = "history-card";

    historyCard.innerHTML = `
        <div>
            <h3>${route}</h3>
            <p>New Accepted Load</p>
        </div>

        <span class="status-way">
            Accepted
        </span>
    `;

    historyList.prepend(historyCard);
}