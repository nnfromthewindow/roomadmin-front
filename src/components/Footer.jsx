import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


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
        
      <FontAwesomeIcon icon={faLinkedin}  color='white' className='contact_item--icon' onClick={() => {
        window.open('https://www.linkedin.com/in/nnuccelli/', '_blank');
      }}/>
           
      <FontAwesomeIcon icon={faGithub}  color='white' className='contact_item--icon' onClick={() => {
        window.open('https://github.com/nnfromthewindow', '_blank');
      }}/>

    <FontAwesomeIcon icon={faEnvelope}  color='white' className='contact_item--icon' onClick={() => {
    window.open(`mailto:nuccelli@hotmail.com`, '_blank');
  }}/>

    <FontAwesomeIcon icon={faSpotify} className='contact_item--icon'  color='white' onClick={() => {
          window.open('https://open.spotify.com/artist/6mzXAePg8FLCOPptYuTn3O', '_blank');
        }}/>
          
        
            </div>
        
        </div>
       </footer>
  )
}

export default Footer