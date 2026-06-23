const form = document.querySelector(".request-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  button.textContent = "Request captured";
  button.disabled = true;
});
