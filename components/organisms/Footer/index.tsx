import Image from "next/image";
import FooterItemLink from "../../atoms/FooterItemLink";

export default function Footer() {
   return (
      <section className="footer pt-50">
         <footer>
            <div className="container-fluid">
               <div className="row">
                  <div className="col-lg-4 text-lg-start text-center">
                     <a href="/" className="mb-30">
                        <Image src="/icon/logo.svg" alt="logo" width={60} height={60} />
                     </a>
                     <p className="mt-30 text-lg color-palette-1 mb-30">
                        StoreGG membantu gamers
                        <br /> untuk menjadi pemenang sejati
                     </p>
                     <p className="mt-30 text-lg color-palette-1 mb-30">
                        Copyright 2021. All Rights Reserved.
                     </p>
                  </div>
                  <div className="col-lg-8 mt-lg-0 mt-20">
                     <div className="row gap-sm-0">
                        <div className="col-md-4 col-6 mb-lg-0 mb-25">
                           <p className="text-lg fw-semibold color-palette-1 mb-12">
                              Company
                           </p>
                           <ul className="list-unstyled">
                              <FooterItemLink item="About Us" link="/" />
                              <FooterItemLink item="Press Release" link="/" />
                              <FooterItemLink item="Terms of Use" link="/" />
                              <FooterItemLink item="Privacy & Policy" link="/" />
                           </ul>
                        </div>
                        <div className="col-md-4 col-6 mb-lg-0 mb-25">
                           <p className="text-lg fw-semibold color-palette-1 mb-12">
                              Support
                           </p>
                           <ul className="list-unstyled">
                              <FooterItemLink item="Refund Policy" link="/" />
                              <FooterItemLink item="Unlock Reward" link="/" />
                              <FooterItemLink item="Live Chatting" link="/" />
                           </ul>
                        </div>
                        <div className="col-md-4 col-12 mt-lg-0 mt-md-0 mt-25">
                           <p className="text-lg fw-semibold color-palette-1 mb-12">
                              Connect
                           </p>
                           <ul className="list-unstyled">
                              <FooterItemLink item="hi@store.gg" link="mailto: hi@store.gg" />
                              <FooterItemLink item="team@store.gg" link="mailto: team@store.gg" />
                              <FooterItemLink item="Pasific 12, Jakarta Selatan" link="http://maps.google.com/?q=Pasific 12, Jakarta Selatan" nextPage="_blank" />
                              <FooterItemLink item="021 - 1122 - 9090" link="tel: 02111229090" />
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </section>
   );
}
