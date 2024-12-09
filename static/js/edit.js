document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("edit-button");
    const editSection = document.getElementById("edit-section");
    const editFormsContainer = document.getElementById("edit-forms-container");
    const addEditFormButton = document.getElementById("add-edit-form-button");
    const submitAllButton = document.getElementById("submit-all-button");

    // Show the edit section
    editButton.addEventListener("click", () => {
      editSection.classList.toggle("hidden");
    });

    // Add a new edit form block
    addEditFormButton.addEventListener("click", () => {
      const newEditSection = document.querySelector(".edit-section-container").cloneNode(true);
      const inputs = newEditSection.querySelectorAll("input, textarea");
      inputs.forEach(input => (input.value = "")); // Clear input values
      editFormsContainer.appendChild(newEditSection);
    });

    // Handle submission of all forms
    submitAllButton.addEventListener("click", () => {
      const forms = document.querySelectorAll(".edit-form");
      const data = Array.from(forms).map((form) => {
        const formData = new FormData(form);
        const question = formData.get("question");
        const answers = formData.get("answers");
        const imageUpload = formData.get("image-upload");

        return {
          question,
          answers,
          image: imageUpload ? imageUpload.name : "No image uploaded",
        };
      });

      console.log("All Submitted Data:", data);
      alert("All questions and answers have been submitted successfully!");

      // Clear all forms
      editFormsContainer.innerHTML = `
        <div class="edit-section-container">
          <form class="edit-form">
            <div class="form-group">
              <label for="question">Question:</label>
              <input type="text" name="question" placeholder="Enter the question" required>
            </div>
            <div class="form-group">
              <label for="answers">Answer:</label>
              <textarea name="answers" rows="4" placeholder="Enter the answer(s)" required></textarea>
            </div>
            <div class="form-group">
              <label for="image-upload">Upload Image:</label>
              <input type="file" name="image-upload" accept="image/*">
            </div>
          </form>
        </div>
      `;
    });
  });