document.addEventListener('DOMContentLoaded', function () {
    // Handle delete button click
    document.querySelectorAll('.btn-delete').forEach((button) => {
        button.addEventListener('click', function () {
            const row = button.closest('tr'); // Get the row to delete
            const question = row.cells[1].textContent; // Get the question for confirmation

            // Show confirmation dialog
            const isConfirmed = confirm(`Are you sure you want to delete the question: "${question}"?`);
            if (isConfirmed) {
                // Remove the row from the table
                row.remove();

                // For real applications, you can send a delete request to the server
                console.log(`Deleted: ${question}`);
            }
        });
    });
});