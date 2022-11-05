import './footer.css'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import InstagramIcon from '../utils/Icons/instagramIcon'
import YoutubeIcon from '../utils/Icons/youtubeIcon'

const Footer = () => {
    return (
        <div className="footer">
            <div className="followus">
                <div className='f-sky'> FOLLOW US </div>
                <div className='social-btns' >
                    <BsFacebook className='icon f-sky f-facebook'  />
                    <AiFillTwitterCircle className='icon f-sky f-twitter' />
                    <InstagramIcon className='icon f-instagram'/>
                    <YoutubeIcon className='icon f-instagram' />
                </div>
            </div>
            <div className="copyright">
                VIVRE TICKETS | @2022 COPYRIGHT
            </div>
        </div>
    )
}

export default Footer