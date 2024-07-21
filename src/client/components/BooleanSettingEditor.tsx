import { nanoid } from 'nanoid';
import React from 'react';

interface ICompProps {
	settingName: string;
	value: boolean;
	valueChanged: (oldValue: boolean, newValue: boolean) => void;
}

const BooleanSettingEditor = (props: ICompProps) => {
	const id = nanoid();
	return (
		<div>
			<label htmlFor={id}>{props.settingName}</label>
			<input
				id={id}
				type="checkbox"
				checked={props.value}
				onChange={event => props.valueChanged(props.value, event.target.checked)}
			/>
		</div>
	);
};

export default BooleanSettingEditor;
