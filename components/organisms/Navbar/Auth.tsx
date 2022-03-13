import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jwtPayloadTypes, userTypes } from "../../../services/data-types";

export default function Auth() {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({
		avatar: "",
	});

	useEffect(() => {
		const TOKEN = Cookies.get("token");
		if (TOKEN) {
			const jwtToken = atob(TOKEN);
			const payload: jwtPayloadTypes = jwtDecode(jwtToken);
			const userDataPayload: userTypes = payload.player;
			const IMG = process.env.NEXT_PUBLIC_IMAGE;
			user.avatar = `${IMG}/${userDataPayload.avatar}`;
			setUser(user);
			setIsLogin(true);
		}
	}, []);

	const onLogOut = () => {
		Cookies.remove('token');
		setIsLogin(false);
		router.push('/sign-in');
	}

	if (isLogin) {
		return (
			<li className="nav-item my-auto dropdown d-flex">
				<div className="vertical-line d-lg-block d-none"></div>
				<div>
					<a
						className="dropdown-toggle ms-lg-40"
						href="#"
						role="button"
						id="dropdownMenuLink"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							src={
								user.avatar !==
								"https://bwa-storegg-web-server.herokuapp.com/uploads/undefined"
									? user.avatar
									: "/img/user.png"
							}
							className="rounded-circle"
							width="40"
							height="40"
							alt=""
						/>
					</a>

					<ul
						className="dropdown-menu border-0"
						aria-labelledby="dropdownMenuLink"
					>
						<li>
							<Link href="/member">
								<a className="dropdown-item text-lg color-palette-2">
									My Profile
								</a>
							</Link>
						</li>
						<li>
							<Link href="#">
								<a className="dropdown-item text-lg color-palette-2">
									Wallet
								</a>
							</Link>
						</li>
						<li>
							<Link href="/member/edit-profile">
								<a className="dropdown-item text-lg color-palette-2">
									Account Settings
								</a>
							</Link>
						</li>
						<li onClick={onLogOut}>
							<Link href="#">
								<a className="dropdown-item text-lg color-palette-2">
									Log Out
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</li>
		);
	}
	return (
		<li className="nav-item my-auto">
			<Link href="/sign-in">
				<a
					className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
					role="button"
				>
					Sign In
				</a>
			</Link>
		</li>
	);
}
