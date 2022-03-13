import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import SideBar from "../../components/organisms/SideBar";
import { jwtPayloadTypes, userTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";

interface UserStateTypes {
	id: string;
	name: string;
	email: string;
	avatar: any;
}
export default function EditProfile() {
	const [user, setUser] = useState<UserStateTypes>({
		id: "",
		name: "",
		email: "",
		avatar: "",
	});
	const [imagePreview, setImagePreview] = useState('/');
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("token");
		if(token) {
			const jwtToken = atob(token);
			const payload: jwtPayloadTypes = jwtDecode(jwtToken);
			const userDataPayload: userTypes = payload.player;
			const IMG = process.env.NEXT_PUBLIC_IMAGE;
			userDataPayload.avatar = `${IMG}/${userDataPayload.avatar}`;
			setUser(userDataPayload);
		}
	}, []);

	const onSubmit = async () => {
		const data = new FormData();
		data.append('image', user.avatar);
		data.append('name', user.name);

		const response = await updateProfile(data);
		if (response.error) {
			toast.error(response.message, {
				theme: 'colored'
			})
		} else {
			Cookies.remove('token');
			toast.success('Berhasil update profile silahkan login kembali', {
				theme: 'colored'
			});
			router.push('/sign-in');
		}
	}

	return (
		<section className="edit-profile overflow-auto">
			<SideBar activeMenu="settings" />
			<main className="main-wrapper">
				<div className="ps-lg-0">
					<h2 className="text-4xl fw-bold color-palette-1 mb-30">
						Settings
					</h2>
					<div className="bg-card pt-30 ps-30 pe-30 pb-30">
						<form action="">
							<div className="photo d-flex">
								<div className="image-upload">
									<label htmlFor="avatar">
										{imagePreview === '/' ? (
											<img
											src={user.avatar}
											alt="icon upload"
											width={90}
											height={90}
											style={{borderRadius: '100%', objectFit: 'cover'}}
											/>
										) : (
											<img
											src={imagePreview}
											alt="icon upload"
											width={90}
											height={90}
											style={{borderRadius: '100%', objectFit: 'cover'}}
											/>
										)}
									</label>
									<br />
									<label className="color-palette-2">
										Click image to change the photo
									</label>
									<input
										id="avatar"
										type="file"
										name="avatar"
										accept="image/png, image/jpeg"
										onChange={(event) => {
											const img = event.target.files![0];
											setImagePreview(URL.createObjectURL(img));
											return setUser({
												...user,
												avatar: img,
											});
										}}
									/>
								</div>
							</div>
							<div className="pt-30">
								<Input
									label="Full Name"
									type="text"
									ID="name"
									name="name"
									placeholder="Enter your name"
									value={user.name}
									onChange={(event) => setUser({
										...user,
										name: event.target.value
									})}
								/>
							</div>
							<div className="pt-30">
								<Input
									label="Email Address"
									type="email"
									ID="email"
									name="email"
									placeholder="Enter your email"
									value={user.email}
									disabled
								/>
							</div>
							{/* <div className="pt-30">
								<Input
									label="Phone"
									type="tel"
									ID="phone"
									name="phone"
									placeholder="Enter your phone number"
								/>
							</div> */}
							<div className="button-group d-flex flex-column pt-50">
								<button
									type="button"
									className="btn btn-save fw-medium text-lg text-white rounded-pill"
									onClick={onSubmit}
								>
									Save My Profile
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</section>
	);
}