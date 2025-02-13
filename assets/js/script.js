document.addEventListener("DOMContentLoaded", function() {
    const otpInputs = document.querySelectorAll(".otp-form .inp-field input");

    otpInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, 1); // Ensure only one character is entered
            }
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].removeAttribute("disabled");
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && index > 0 && input.value.length === 0) {
                otpInputs[index - 1].focus();
            }
        });

        input.addEventListener("paste", (event) => {
            const pasteData = event.clipboardData.getData('text').slice(0, otpInputs.length);
            otpInputs.forEach((otpInput, i) => {
                otpInput.value = pasteData[i] || '';
                if (i < otpInputs.length - 1) {
                    otpInputs[i + 1].removeAttribute("disabled");
                }
            });
            otpInputs[Math.min(pasteData.length, otpInputs.length) - 1].focus();
            event.preventDefault();
        });
    });
});



// Functionality for auto add / in DOB input
document.addEventListener("DOMContentLoaded", function() {
    const dobInput = document.getElementById("dob");

    dobInput.addEventListener("input", function() {
        let value = dobInput.value.replace(/\D/g, ''); // Remove all non-digit characters
        if (value.length >= 2 && value.length <= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (value.length > 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
        }
        dobInput.value = value;
    });

    dobInput.addEventListener("keydown", function(event) {
        if (event.key === "Backspace" && (dobInput.value.endsWith('/') || dobInput.value.length === 3 || dobInput.value.length === 6)) {
            dobInput.value = dobInput.value.slice(0, -1);
        }
    });
});