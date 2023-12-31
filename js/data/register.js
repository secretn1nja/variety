function register() {
    var form = document.getElementById('registerForm');
    var nickname = form.nickname.value.trim();
    var email = form.email.value.trim();
    var password = form.password.value.trim();
    var dob = form.dob.value.trim();
    var gender = form.gender.value.trim();

    // Validate the form data
    if (!nickname || !email || !password || !dob || !gender) {
        showCustomAlert('Please fill in all fields.');
        return;
    }

    // Additional validation for email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showCustomAlert('Please enter a valid email address.');
        return;
    }

    // Validate the date format and ensure it is not greater than the present date
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dob)) {
        showCustomAlert('Please enter a valid date in the format YYYY-MM-DD.');
        return;
    }

    var inputDate = new Date(dob);
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without considering the time

    if (isNaN(inputDate.getTime()) || inputDate > currentDate) {
        showCustomAlert('Please enter a valid date that is not greater than the present date.');
        return;
    }

    // Validate password requirements
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
        showCustomAlert('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol, and be at least 8 characters long.');
        return;
    }

    // Check if email is already in use
    checkEmailExists(email)
        .then(function (exists) {
            if (exists) {
                showCustomAlert('Email is already in use. Please use a different email address.');
            } else {
                // Create user in Firebase Authentication
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function (userCredential) {
                        // Signed in
                        var user = userCredential.user;

                        // Store additional user details in Firestore
                        saveUserDetails(user.uid, {
                            nickname: nickname,
                            email: email,
                            dob: dob,
                            gender: gender
                        });

                        // TODO: Handle registration success
						showCustomAlert('Registration successful.');
                        console.log('Registration successful:', user);
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        showCustomAlert('Error: ' + errorMessage);
                        // TODO: Handle registration errors
                    });
            }
        });
}


function checkEmailExists(email) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
        .then(function (signInMethods) {
            // If the array is empty, the email is not in use
            return signInMethods.length > 0;
        })
        .catch(function (error) {
            console.error('Error checking email:', error);
            return false;
        });
}

function saveUserDetails(userId, userDetails) {
    // Save user details to Firestore or your preferred database
    // In this example, we're assuming you have initialized Firestore earlier
    var db = firebase.firestore();
    
    db.collection('users').doc(userId).set(userDetails)
        .then(function () {
            console.log('User details saved successfully');
        })
        .catch(function (error) {
            console.error('Error saving user details:', error);
        });
}


function showCustomAlert(message) {
    var customAlertText = document.getElementById('customAlertText');
    customAlertText.textContent = message;
    var customAlertPopup = document.getElementById('customAlertPopup');
    customAlertPopup.style.display = 'block';
}

function closeCustomAlert() {
    var customAlertPopup = document.getElementById('customAlertPopup');
    customAlertPopup.style.display = 'none';
}



function setMaxDate() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    var dd = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    var maxDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('dob').setAttribute('max', maxDate);
}

// Call the function to set the max attribute when the page loads
setMaxDate();