import cx from "classnames";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuItemProps {
	title: string;
	icon:
		| "ic-menu-overview"
		| "ic-menu-transactions"
		| "ic-menu-messages"
		| "ic-menu-card"
		| "ic-menu-rewards"
		| "ic-menu-settings"
		| "ic-menu-logout";
	active?: boolean;
	href?: string;
	onClicked?: boolean;
}
export default function MenuItem(props: Partial<MenuItemProps>) {
	const router = useRouter();
	const { title, icon, active, href='/', onClicked } = props;

	const className = cx({
		item: true,
		"mb-30": true,
		active: active,
	});

	const onLogOut = () => {
		Cookies.remove('token');
		router.push('/sign-in');
	}

	return (
		<div className={className}>
			<div className="me-3">
				<Image src={`/icon/${icon}.svg`} width={25} height={25} />
			</div>
			<p className="item-title m-0">
				{onClicked ? (
					<a className="text-lg text-decoration-none" onClick={onLogOut} style={{cursor: 'pointer'}}>{title}</a>
				) : (
					<Link href={href}>
						<a className="text-lg text-decoration-none">{title}</a>
					</Link>
				)}
			</p>
		</div>
	);
}
