const BookInput = (props) => {
    if(props.additional === 'Book') {
        return (
            <div>
                <label className="tooltip" htmlFor={props.name}>{props.title}
                    <span className="tooltiptext">{props.tooltip}</span>
                </label>
                <input
                    id={props.id}
                    name={props.name}
                    type={props.type} step=".01"
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
export default BookInput;
