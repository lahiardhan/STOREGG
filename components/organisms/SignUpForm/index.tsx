import { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

export default function SignUpForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const className = {
		label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
	};

	const showPassword = () => {
		const pass = document.getElementById("password");
		const checkbox = document.getElementById("passCheck");
		const insideCheck = document.getElementById('inside-checkbox');
		
		if (checkbox?.classList.contains("checkbox-checked")) {
			checkbox.classList.remove("checkbox-checked");
			insideCheck?.classList.remove('inside-checked')
		} else {
			checkbox?.classList.add("checkbox-checked");
			insideCheck?.classList.add('inside-checked');
		}

		let typePass = pass!.getAttribute('type');
		if (typePass === "password") {
			pass!.setAttribute('type', 'text');
		} else {
			pass!.setAttribute('type', 'password');
		}
	};
	
	const onSubmit = () => {
		const KEY = "USER-FORM";
		const userForm = {
			email,
			name,
			password,
		};

		localStorage.setItem(KEY, JSON.stringify(userForm));

		router.push("/sign-up-photo");
	};
	return (
		<>
			<h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
			<p className="text-lg color-palette-1 m-0">
				Daftar dan bergabung dengan kami
			</p>
			<div className="pt-50">
				<label className={className.label}>Full Name</label>
				<input
					type="text"
					className="form-control rounded-pill text-lg"
					aria-describedby="name"
					placeholder="Enter your name"
					required
					value={name}
					onChange={(event) => {
						setName(event.target.value);
					}}
				/>
			</div>
			<div className="pt-30">
				<label className={className.label}>Email Address</label>
				<input
					type="email"
					className="form-control rounded-pill text-lg"
					aria-describedby="email"
					placeholder="Enter your email address"
					required
					value={email}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			</div>
			<div className="pt-30 pb-2">
				<label className={className.label}>Password</label>
				<input
					type="password"
					id="password"
					className="form-control rounded-pill text-lg"
					aria-describedby="password"
					placeholder="Your password (password must be at least 8 characters long)"
					required
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>
			<div className="container-checkbox" onClick={showPassword}>
				<div className="checkbox" id="passCheck">
					<div id="inside-checkbox" className="hide"></div>
				</div>
				<label className="checkboxLabel">Show Password</label>
			</div>
			<div className="button-group d-flex flex-column mx-auto pt-50">
				<button
					type="button"
					className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
					onClick={onSubmit}
				>
					Continue
				</button>

				<a
					className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
					href="/sign-in"
					role="button"
				>
					Sign In
				</a>
			</div>
		</>
	);
}
