import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";

export default function CheckoutConfirmation() {
	const [checkbox, setCheckbox] = useState(false);
   const router = useRouter();

	const onSubmit = async () => {
      const dataItemLocal = localStorage.getItem('data-item');
      const dataCheckoutLocal = localStorage.getItem('data-checkout');
      
      const dataItem = JSON.parse(dataItemLocal!);
      const dataCheckout = JSON.parse(dataCheckoutLocal!);
      
      if (!checkbox) {
         toast.error("Pastikan Anda Telah Melakukan Pembayaran!", {
            theme: "colored",
			});
         return;
	   }; 

      const data = {
         voucher : dataItem._id,
         nominal : dataCheckout.nominalItem._id,
         payment : dataCheckout.paymentItem.payment._id,
         bank : dataCheckout.paymentItem.bank._id,
         name : dataCheckout.bankAccountName,
         accountUser : dataCheckout.verifyID,
     };
     
     const response = await setCheckout(data);
      if(response.error) {
			toast.error(response.message, {
				theme: 'colored'
			});
		} else {
			toast.success('Checkout Berhasil', {
				theme: 'colored'
			})
         router.push('/complete-checkout');
		}
	};

	return (
		<>
			<label className="checkbox-label text-lg color-palette-1">
				I have transferred the money
				<input
					type="checkbox"
					checked={checkbox}
					onChange={() => setCheckbox(!checkbox)}
				/>
				<span className="checkmark"></span>
			</label>
			<div className="d-md-block d-flex flex-column w-100 pt-50">
				<button
					className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
					type="button"
					onClick={onSubmit}
				>
					Confirm Payment
				</button>
			</div>
		</>
	);
}
