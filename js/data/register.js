function register() {
    const form = document.getElementById('registerForm');
    const nickname = form.nickname.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;
    const gender = form.gender.value;

    // TODO: Validate the form data (e.g., check for valid email format)

    // Create user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // TODO: Store additional user details in Firestore or Realtime Database
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            // TODO: Handle registration errors
        });
}
