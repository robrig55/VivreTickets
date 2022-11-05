
const Button = (props) => {
    return (
        <button 
            className={props.className}
            onClick={props.onClick}
        >
            {
                props.content
            }
        </button>
    )
}

export default Button