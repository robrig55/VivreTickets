import { ImInstagram } from 'react-icons/im'

const InstagramIcon = (props) => {
    return (
        <div
            style={{
                backgroundColor: '#52c7c1',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '2.5px'
            }} 
            className={props.className}
        >
            <ImInstagram color='white' size={props.size} />
        </div>
    )
}

export default InstagramIcon