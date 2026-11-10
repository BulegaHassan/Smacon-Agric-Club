

// Automatically update the copyright year in every footer.
document.querySelectorAll(".current-year").forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

// The contact form opens an email draft. It does not send or save data itself.
const enquiryForm = document.querySelector("#enquiryForm");

if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const requestedProduct = params.get("product");
  const productSelect = document.querySelector("#product");

  if (requestedProduct && productSelect) {
    const matchingOption = Array.from(productSelect.options).find(function (option) {
      return option.text.toLowerCase() === requestedProduct.toLowerCase();
    });
    if (matchingOption) productSelect.value = matchingOption.value;
  }

  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // TODO: Replace this placeholder with the school's official email address.
    const schoolEmail = "replace-with-school-email@example.com";
    const formData = new FormData(enquiryForm);
    const customerName = formData.get("customerName");
    const customerEmail = formData.get("customerEmail");
    const product = formData.get("product") || "Not specified";
    const message = formData.get("message");

    if (schoolEmail === "replace-with-school-email@example.com") {
      document.querySelector("#formMessage").textContent =
        "The form is ready for testing. Your teacher must add the school's official email in js/script.js before using it.";
      document.querySelector("#formMessage").className = "small mt-3 text-danger";
      return;
    }

    const subject = encodeURIComponent("Farm produce enquiry: " + product);
    const body = encodeURIComponent(
      "Name: " + customerName + "\nEmail: " + customerEmail +
      "\nProduct: " + product + "\n\nMessage:\n" + message
    );
    window.location.href = "mailto:" + schoolEmail + "?subject=" + subject + "&body=" + body;
  });
}
