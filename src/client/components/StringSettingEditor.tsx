import { nanoid } from 'nanoid';
import React from 'react';

interface ICompProps {
	settingName: string;
	value: string;
	valueChanged: (oldValue: string, newValue: string) => void;
}

const StringSettingEditor = (props: ICompProps) => {
	const id = nanoid();
	return (
		<div>
			<label htmlFor={id}>{props.settingName}</label>
			<input
				id={id}
				type="text"
				value={props.value}
				onChange={event => props.valueChanged(props.value, event.target.value)}
			/>
		</div>
	);
};

export default StringSettingEditor;
