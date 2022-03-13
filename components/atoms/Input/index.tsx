import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   label: string;
   type?: string;
   ID?: string;
   name?: string;
   placeholder: string;
}
export default function Input(props: Partial<InputProps>) {
   const {label, type, ID, name, placeholder, ...nativeProps } = props;
	return (
		<>
			<label
				htmlFor={name}
				className="form-label text-lg fw-medium color-palette-1 mb-10"
			>
				{label}
			</label>
			<input
				type={type}
				className="form-control rounded-pill text-lg"
				id={ID}
				name={name}
				aria-describedby={name}
				placeholder={placeholder}
            {...nativeProps}
			/>
		</>
	);
}
