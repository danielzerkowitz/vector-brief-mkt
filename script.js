const form = document.querySelector(".request-form");
const status = form.querySelector(".form-status");
const button = form.querySelector("button");
const defaultLabel = button.textContent;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (form.action.includes("YOUR_FORM_ID")) {
    setStatus("Form is not configured yet — add your Formspree ID to the form action.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Sending…";
  setStatus("", "");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      button.textContent = "Contact details captured";
      setStatus("Thank you — a specialist will follow up shortly.", "success");
      return;
    }

    const data = await response.json().catch(() => ({}));
    const message = data.errors?.map((e) => e.message).join(", ");
    setStatus(message || "Something went wrong. Please email us directly.", "error");
  } catch (err) {
    setStatus("Network error. Please check your connection and try again.", "error");
  } finally {
    if (!button.textContent.startsWith("Contact details")) {
      button.disabled = false;
      button.textContent = defaultLabel;
    }
  }
});

function setStatus(message, kind) {
  status.textContent = message;
  status.className = kind ? `form-status form-status--${kind}` : "form-status";
}
