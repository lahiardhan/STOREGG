import cx from "classnames";

interface ButtonTabProps {
   title: string;
   active: boolean;
	onClicked: () => void;
}
export default function ButtonTab(props: Partial<ButtonTabProps>) {
   const {title, active, onClicked} = props;
   const buttonClass = cx ({
      "btn btn-status rounded-pill text-sm me-3": true,
      "btn-active": active
   });
	
	return (
		<button
			type="button"
			onClick={onClicked}
			className={buttonClass}
		>
			{title}
		</button>
	);
}
