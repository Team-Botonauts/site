const form = document.querySelector("#contactform") as HTMLFormElement;
const formError = document.querySelector("#form_error") as HTMLParagraphElement;
const sendBtn = document.querySelector("#form_send_btn") as HTMLButtonElement;
const formSuccess = document.querySelector("#form_success") as HTMLDivElement;


function showFormError(text: string) {
    formError.innerText = text
    formError.classList.remove("hidden")
}

function clearFormError() {
    formError.innerText = ""
    formError.classList.add("hidden")
}

async function sendData() {
    sendBtn.disabled = true;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length == 0) {
        showFormError("Name is a required field.")

    } else if (name.length > 100) {
        showFormError("Name is too long.")

    } else if (email.length == 0) {
        showFormError("Email is a required field.")

    } else if (email.length > 254) {
        showFormError("Email is too long.")

    } else if (!emailRegex.test(email)) {
        showFormError("Please enter a valid email.")

    } else if (message.length == 0) {
        showFormError("Message is a required field.")

    } else if (message.length > 3000) {
        showFormError("Message is too long. Max 3000 chars")

    } else if (message.length < 15) {
        showFormError("Message is too short. Min 15 chars")
    } else {
        clearFormError()

        try {
            const response = await fetch(`/api/contact`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                showFormError(result.error);
                sendBtn.disabled = false;
                return;
            }

            form.classList.add("opacity-0", "pointer-events-none")
            formSuccess.classList.remove("hidden")
            
        } catch (e) {
            console.error(e);
            sendBtn.disabled = false;
        }
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});