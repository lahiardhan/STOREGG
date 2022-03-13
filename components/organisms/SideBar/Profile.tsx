import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { jwtPayloadTypes, userTypes } from "../../../services/data-types";

export default function Profile() {
	const [user, setUser] = useState({
		avatar: '',
		name: '',
		email: '',
	})

	useEffect(() => {
		const TOKEN = Cookies.get("token");
		if (TOKEN) {
			const jwtToken = atob(TOKEN);
			const payload: jwtPayloadTypes = jwtDecode(jwtToken);
			const userDataPayload: userTypes = payload.player;
			const IMG = process.env.NEXT_PUBLIC_IMAGE;
			userDataPayload.avatar = `${IMG}/${userDataPayload.avatar}`;
			setUser(userDataPayload);
		}
	}, []);
	return (
		<div className="user text-center pb-50 pe-30">
			<img
				src={user.avatar}
				alt='profile'
				width={90}
				height={90}
				className="mb-20"
				style={{borderRadius: '100%', objectFit: 'cover'}}
			/>
			<h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
			<p className="color-palette-2 m-0">{user.email}</p>
		</div>
	);
}
