// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// Add Firebase products that you want to use
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB7BgkhXxtFzqneJId3jTfBkqT5k-wHbVY",
	authDomain: "sheviour-681f7.firebaseapp.com",
	projectId: "sheviour-681f7",
	storageBucket: "sheviour-681f7.appspot.com",
	messagingSenderId: "57121534276",
	appId: "1:57121534276:web:35d1bc344854b63b99a711",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("🚀 ~ file: app.js:20 ~ app:", app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("🚀 ~ file: app.js:34 ~ auth:", auth);
const googleProvider = new GoogleAuthProvider();

async function signUpWithEmail() {
	signOut(auth)
		.then(() => {
			console.log("Sign-out successful.");
		})
		.catch((error) => {
			console.log("sorry bro, An error happened.", error);
		});
	let email = document.getElementById("signup-email").value;
	let password = document.getElementById("signup-password").value;
	await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
			console.log(userCredential);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			alert(errorMessage);
		});
}

// Sign In ---------------------------------------------------
// const signInButton = document.querySelector(`[data-js="signInButton"]`);
// signInButton.addEventListener("click", async () => {
// 	// await loginWithEmail();
// });

async function loginWithEmail() {
	signOut(auth)
		.then(() => {
			console.log("Sign-out successful.");
		})
		.catch((error) => {
			console.log("sorry bro, An error happened.", error);
		});
	let email = document.getElementById("login-email").value;
	let password = document.getElementById("login-password").value;
	await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
			console.log(userCredential);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			alert(errorMessage);
		});
}

// Login with Gmail ---------------------------------------------------
const googleGmailLogins = document.querySelectorAll(
	`[data-js="googleGmailLogin"]`
);

Array.from(googleGmailLogins).forEach((googleGmailLogin) => {
	googleGmailLogin.addEventListener("click", () => {
		signOut(auth)
			.then(() => {
				console.log("Sign-out successful.");
			})
			.catch((error) => {
				console.log("sorry bro, An error happened.", error);
			});
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				console.log(token);

				const user = result.user;
				console.log(user);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential =
					GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	});
});

// to redirect different pages ---------------------------------------------------
const forms = document.querySelectorAll(".modal__form-container--form");
console.log("🚀 ~ file: app.js:136 ~ forms:", forms);
const loginButtons = document.querySelectorAll(`[data-js="loginButton"]`);

console.log("🚀 ~ file: app.js:141 ~ loginButtons:", loginButtons);
Array.from(loginButtons).forEach((loginButton, index) => {
	console.log(
		"🚀 ~ file: app.js:142 ~ Array.from ~ loginButton:",
		loginButton
	);

	loginButton.addEventListener("click", () => {
		forms.forEach((form) => {
			form.action = `/#`;
			form.onsubmit = async () => {
				console.log("inside onsubmit");
				// signOut(auth)
				// 	.then(() => {
				// 		console.log("Sign-out successful.");
				// 	})
				// 	.catch((error) => {
				// 		console.log("sorry bro, An error happened.", error);
				// 	});
				if (form.id == "signInForm") {
					console.log("Signed In");
					await loginWithEmail();
				} else if (form.id == "signUpForm") {
					console.log("Signed Up");
					await signUpWithEmail();
				}
				onAuthStateChanged(auth, function (user) {
					if (user) {
						console.log("User Email: ", user.email);
						window.location.href = form.action;
						console.log("User Email: ", user.email);
					}
				});
			};
		});
	});
});
