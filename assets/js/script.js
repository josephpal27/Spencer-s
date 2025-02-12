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