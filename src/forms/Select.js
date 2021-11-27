const Select = (props) => {
	return (
		<div>
			<label className="tooltip" htmlFor={props.name}>
				{props.title}
				<span className="tooltiptext">{props.tooltip}</span>
			</label>
			<select
				id={props.id}
				name={props.name}
				value={props.value}
				onChange={props.handleChange}
				required>
				<option value="" disabled selected>
					#type
				</option>
				{props.options.map((option) => {
					return (
						<option key={option} value={option} label={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
