import Link from "next/link";

interface ItemLinkProps {
   item: string;
   link: string;
   nextPage?: string;
}
export default function FooterItemLink(props: Partial<ItemLinkProps>) {
   const { item, link, nextPage } = props;
   return (
      <li className="mb-6">
         <Link href={`${link}`}>
            <a 
               target={nextPage}
               className="text-lg color-palette-1 text-decoration-none"
            >
               {item}
            </a>
         </Link>
      </li>
   );
}
