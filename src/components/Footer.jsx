import ReactDOM from 'react-dom'

import { LinkedIn, GitHub, Mail, LibraryMusic } from '@mui/icons-material'
import { grey} from '@mui/material/colors'



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
                <LinkedIn sx={{ color: grey[50] }} className='contact_item--icon' onClick={() => {
        window.open('https://www.linkedin.com/in/nnuccelli/', '_blank');
      }}/>
                <GitHub sx={{ color: grey[50] }} className='contact_item--icon' onClick={() => {
        window.open('https://github.com/nnfromthewindow', '_blank');
      }}/>
                <Mail sx={{ color: grey[50] }} className='contact_item--icon' onClick={() => {
    window.open(`mailto:nuccelli@hotmail.com`, '_blank');
  }}/>
                <LibraryMusic sx={{ color: grey[50] }} className='contact_item--icon' onClick={() => {
        window.open('https://open.spotify.com/artist/6mzXAePg8FLCOPptYuTn3O', '_blank');
      }}/>
            </div>
        
        </div>
       </footer>
  )
}

export default Footer