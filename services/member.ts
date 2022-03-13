import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getMemberOverview() {
   const URL = `${ROOT_API}/${API_VERSION}/players/dashboard`;

   return callAPI({
      url: URL,
      method: "GET",
      token: true,
   })
}

export async function getMemberTransactions(valueParams: string) {
   let params = '';
   if(valueParams === 'all') {
      params: '';
   } else {
      params: `?status=${valueParams}`;
   }

   const URL = `${ROOT_API}/${API_VERSION}/players/history${params}`;

   return callAPI({
      url: URL,
      method: "GET",
      token: true,
   })
}

export async function getTransactionDetail(id: string, token: string) {
   const URL = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`;

   return callAPI({
      url: URL,
      method: "GET",
      serverToken: token,
   })
}

export async function updateProfile(data: FormData) {
   const URL = `${ROOT_API}/${API_VERSION}/players/editprofile`;

   return callAPI({
      url: URL,
      method: "PUT",
      data,
      token: true,
   })
}
