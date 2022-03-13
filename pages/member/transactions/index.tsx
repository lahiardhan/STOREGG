import Head from "next/head";
import SideBar from "../../../components/organisms/SideBar";
import TransactionContent from "../../../components/organisms/TransactionContent";

export default function Transactions() {
	return (
		<>
			<Head>
				<title>My Transactions</title>
				<link
					rel="shortcut icon"
					href="/icon/logo.png"
					type="image/x-icon"
				/>
			</Head>
			<section className="transactions overflow-auto">
				<SideBar activeMenu="transactions" />
				<TransactionContent />
			</section>
		</>
	);
}

interface GetServerSideProps {
	req: {
		cookies: {
			token: string;
		};
	};
}

export async function getServerSideProps({ req }: GetServerSideProps) {
	const { token } = req.cookies;
	if (!token) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
