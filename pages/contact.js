document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = form.querySelector('#name').value;
        const message = form.querySelector('#message').value;

        const payload = {
            content: `\`\`\`css\n# New Form Submission\n\n\`\`\`**Name:** ${name}\n**Message:** ${message}\n`,
        };
		
		swal("", "Comanda efectuata cu success!", "success");

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    });
});

function showAlert(message) {
    const modal = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    modal.classList.add('active');
}

function closeAlert() {
    const modal = document.getElementById('custom-alert');
    modal.classList.remove('active');
}
