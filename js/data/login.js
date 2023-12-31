function login() {
    var emailOrNickname = document.getElementById('emailOrNickname').value.trim();
    var password = document.getElementById('password').value.trim();

    if (emailOrNickname === '' || password === '') {
        document.getElementById('errorMessage').textContent = 'Please fill in all fields.';
        return;
    }

    firebase.auth().signInWithEmailAndPassword(emailOrNickname, password)
        .then(function (userCredential) {
            var user = userCredential.user;
            showCustomAlert('Login successful.');
            window.location.href = 'forum.html';
        })
        .catch(function (error) {
            console.error('Login error:', error);

            // Check for specific error codes
            switch (error.code) {
                case 'auth/user-not-found':
                    showCustomAlert('User not found. Please check your email or nickname.');
                    break;
                case 'auth/wrong-password':
                    showCustomAlert('Incorrect password. Please try again.');
                    break;
                default:
                    showCustomAlert('Login failed. Please try again.');
            }

            document.getElementById('errorMessage').textContent = ''; // Clear default error message
        });
}

function showCustomAlert(message) {
    // Get the custom alert element
    var customAlert = document.getElementById("customAlert");

    // Set the alert message
    document.getElementById("alertMessage").textContent = message;

    // Show the custom alert
    customAlert.style.display = "block";

    // Automatically close the alert after 3000 milliseconds (3 seconds)
    setTimeout(function () {
        closeAlert();
    }, 3000);
}

function closeAlert() {
    // Get the custom alert element
    var customAlert = document.getElementById("customAlert");

    // Hide the custom alert
    customAlert.style.display = "none";
}

