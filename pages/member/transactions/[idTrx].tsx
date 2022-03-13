import Head from "next/head";
import jwtDecode from "jwt-decode";
import TransactionContentDetail from "../../../components/organisms/TransactionContentDetail";
import {
	HistoryTransactionTypes,
	jwtPayloadTypes,
	userTypes,
} from "../../../services/data-types";
import { getTransactionDetail } from "../../../services/member";

interface TransactionDetailProps {
	transactionDetail: HistoryTransactionTypes;
}

export default function Detail(props: TransactionDetailProps) {
	const { transactionDetail } = props;

	return (
		<>
			<Head>
				<title>{transactionDetail.historyVoucherTopup.gameName} Voucher | STOREGG</title>
				<link
					rel="shortcut icon"
					href="/icon/logo.png"
					type="image/x-icon"
				/>
			</Head>
			<section className="transactions-detail overflow-auto">
				<TransactionContentDetail data={transactionDetail} />
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
	params: {
		idTrx: string;
	};
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
	const { idTrx } = params;
	const { token } = req.cookies;
	if (!token) {
		return {
			redirect: {
				destination: "/sign-in",
				permanent: false,
			},
		};
	}

	const jwtToken = Buffer.from(token, "base64").toString("ascii");
	const payload: jwtPayloadTypes = jwtDecode(jwtToken);
	const userDataPayload: userTypes = payload.player;
	const IMG = process.env.NEXT_PUBLIC_IMAGE;
	userDataPayload.avatar = `${IMG}/${userDataPayload.avatar}`;
	const response = await getTransactionDetail(idTrx, jwtToken);
	return {
		props: {
			transactionDetail: response.data,
		},
	};
}
