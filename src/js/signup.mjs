import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";
loadHeaderFooter();



document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");
    const signupError = document.getElementById("signup-error");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const avatar = document.getElementById("avatar").files[0]; 

        createUser(name, address, email, avatar);
    });

    function createUser(name, address, email, avatar) {
        const newUser = {
            name: name,
            address: address,
            email: email,
            avatar: avatar ? avatar.name : null // Save filename of avatar if provided
        };

        // Retrieve existing users from local storage 
        const existingUsers = getLocalStorage("users") || [];

        // Check if email already exists
        const existingUser = existingUsers.find(user => user.email === email);
        if (existingUser) {
            signupError.textContent = "Email already exists. Please use a different email.";
            return; 
        }
        // Add new user to existing users array
        existingUsers.push(newUser);

        // Save updated users array back to local storage
        setLocalStorage("users", existingUsers);

        // Set the logged-in user's name in local storage
        setLocalStorage("loggedInUser", name);
        window.alert("Logged in user from Local Storage:", loggedInUser);

        // Redirect to login page or perform any other action
        window.location.href = "../index.html";
    }
    const loggedInUser = getLocalStorage("loggedInUser");
    
    const signUpLink = document.querySelector("#user-name");
if (signUpLink) {
    signUpLink.textContent = loggedInUser;
} else {
    console.error("Element not found: ");
}
});