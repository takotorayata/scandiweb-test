const DvdInput = (props) => {
    if (props.additional === 'DVD') {
        return (
            <div>
                <label className="tooltip" htmlFor={props.name}>{props.title}
                    <span className="tooltiptext">{props.tooltip}</span>
                </label>
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type}  onKeyDown={ (e) => (e.key === '.' || e.key ==='e') && e.preventDefault() }
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={props.placeholder}
                    required
                />
            </div>
        )
    } else {
        return <div></div>
    }
}
export default DvdInput;
