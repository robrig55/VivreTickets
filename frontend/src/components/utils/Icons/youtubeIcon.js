import { SiYoutube } from 'react-icons/si'

const YoutubeIcon = (props) => {
    return (
        <div
            style={{
                backgroundColor: '#52c7c1',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} 
            className={props.className}
        >
            <SiYoutube color='white' size={props.size} />
        </div>
    )
}

export default YoutubeIcon