import ReactDOM from 'react-dom'

import { LinkedIn, GitHub, Mail, MusicNoteRounded } from '@mui/icons-material'
import { pink,grey} from '@mui/material/colors'



const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer_developer">
            <h3 className="developer"> Designed and developed by:<br></br> Nicolás Nuccelli © 2023</h3>
        </div>
        <div className="footer_contact">
            <div className="contact_title">
                <h3>CONTACT:</h3>
            </div>
            <div className="contact_item">
                <LinkedIn sx={{ color: grey[50] }} className='contact_item--icon'/>
                <GitHub sx={{ color: grey[50] }} className='contact_item--icon'/>
                <Mail sx={{ color: grey[50] }} className='contact_item--icon'/>
                <MusicNoteRounded sx={{ color: grey[50] }} className='contact_item--icon'/>
            </div>
        
        </div>
       </footer>
  )
}

export default Footer