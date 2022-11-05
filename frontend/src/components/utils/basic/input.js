
const Input = (props) => {

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <input 
                className={props.className}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder} 
                id={props.id}
                step={props.step}
            />
            {
                props.icon ? 
                    <div
                        style={{
                            position: 'absolute',
                            right: '10px'
                        }}
                    >
                        {props.icon}
                    </div>
                : <></>
            }
        </div>
    )    
}

export default Input