import Image from "next/image";
import { useEffect, useState } from "react";

export default function CheckoutItem() {
   const [dataItem, setDataItem] = useState({
      name: '',
      thumbnail: '',
      category: {
         name: '',
      },
   });

   useEffect(() => {
      const dataItemLocal = localStorage.getItem('data-item');
      const dataItemLocalParsed = JSON.parse(dataItemLocal!);
      setDataItem(dataItemLocalParsed)
   }, []);

   const IMG = process.env.NEXT_PUBLIC_IMAGE;
   return (
      <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
         <div className="pe-4">
            <div className="cropped">
               <Image src={`${IMG}/${dataItem.thumbnail}`} className="img-fluid" alt="" objectFit="cover" height={200} width={263}/>
            </div>
         </div>
         <div>
            <p className="fw-bold text-xl color-palette-1 mb-10">
               {dataItem.name}
            </p>
            <p className="color-palette-2 m-0">Category: {dataItem.category.name}</p>
         </div>
      </div>
   );
}
