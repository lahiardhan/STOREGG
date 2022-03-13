import Link from "next/link";
import { useState } from "react";
import cx from "classnames";
import { toast } from 'react-toastify';
import { setLogin } from "../../../services/auth";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const classNames = {
		label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
		input: cx("form-control rounded-pill text-lg"),
	};

	const onSubmit = async () => {
		const data = {
			email,
			password,
		}

		if(!email && !password) {
			toast.error('Email dan Password Harus Diisi!', {
				theme: 'colored'
			})
		} else if(!email) {
			toast.error('Email Harus Diisi!', {
				theme: 'colored'
			})
		} else if(!password) {
			toast.error('Password Harus Diisi!', {
				theme: 'colored'
			})
		} else {
			const response = await setLogin(data);
			if(response.error === true) {
				toast.error(response.message, {
					theme: 'colored'
				});
			} else {
				toast.success('Login Berhasil', {
					theme: 'colored'
				})
				const TOKEN = response.data.token;
				const tokenBase64 = btoa(TOKEN);
				Cookies.set('token', tokenBase64, { expires : 1 })

				router.push('/');
			}
		}
	}
	return (
		<>
			<h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
			<p className="text-lg color-palette-1 m-0">
				Masuk untuk melakukan proses top up
			</p>
			<div className="pt-50">
				<label className={classNames.label}>Email Address</label>
				<input
					type="email"
					className={classNames.input}
					placeholder="Enter your email address"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
			</div>
			<div className="pt-30">
				<label className={classNames.label}>Password</label>
				<input
					type="password"
					className={classNames.input}
					placeholder="Your password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<div className="button-group d-flex flex-column mx-auto pt-50">
				<button type="button" className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16" onClick={onSubmit}>
					Continue to Sign In
				</button>
				<Link href="sign-up">
					<a className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill">
						Sign Up
					</a>
				</Link>
			</div>
		</>
	);
}
