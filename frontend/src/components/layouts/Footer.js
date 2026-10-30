import React from 'react';
import icon_fb from '../../assets/svg/icon-facebook.svg';
import icon_ig from '../../assets/svg/icon-instagram.svg';
import icon_yt from '../../assets/svg/icon-youtube.svg';
import icon_wa from '../../assets/svg/icon-whatsapp.svg';
import icon_tw from '../../assets/svg/icon-twitter.svg';
import footer_banner from '../../assets/svg/backdrop-5.svg';
import logo_minimal from '../../assets/svg/logo-minimal.svg';

const Footer = () => {
  const links = [
    {
      _id: 1,
      heading: 'Links',
      links: [
        {
          _id: 1,
          heading: 'Home',
          link: ''
        },
        {
          _id: 2,
          heading: 'Browse',
          link: '/browse'
        }
      ]
    },
    {
      _id: 2,
      heading: 'About',
      links: [
       
      ]
    },
    {
      _id: 3,
      heading: 'Contact Us',
      links: [
        {
          _id: 1,
          heading: '(876) 543-2198',
          tooltip: '(Mobile)',
          link: ''
        },
        {
          _id: 2,
          heading: '52 Riddley Ave. Portmore P.O',
          tooltip: '(Address)',
          link: ''
        }
      ]
    }
  ]
  return <footer className='row flex m-auto'>
          <div className='footer-bd mt-20'>
            <img src={logo_minimal} alt='logo' width="360" height="30" className="d-inline-block align-top"></img>
          </div>
          <div className='row flex flex-col'>
            <span className='link-cols flex m-auto pt-32'>
              {
                links.map(link => ( <span className='col mx-8 flex flex-col items-center' key={link._id}>
                    <span className='heading text-4xl' style={{
                        fontFamily: 'Qunotz, Arial, serif',
                    }}>{link.heading}</span>
                    <span className='links flex flex-col'>{
                      link.links.map(link_item => (<span key={link_item._id}>
                        <a className='flex flex-col text-xl text-center my-2' href={link_item.link} style={{
                          fontFamily: 'Bunderan, Arial, serif',
                          maxWidth: '10rem'
                        }}>
                          {link_item.tooltip && (
                            <span className='tooltip' style={{ color: '#55B1D0' }}>{link_item.tooltip}</span>
                          )}
                          {link_item.heading}
                        </a>
                      </span>))
                    }</span>
                  </span>
                ))
              }
             
            </span>
            <span className='socials flex justify-center items-center my-32'>
              <div className='social-bd absolute -z-10'>
                <img src={footer_banner} alt='logo' width="1200" height="30" className="d-inline-block align-top"></img>
              </div>
              <div className='icons flex items-center mt-8'>
                <span className='icon mx-4'>
                  <a href='/#'>
                    <img src={icon_fb} alt='facebook_logo' width="18" height="28" className="d-inline-block align-top"></img>
                  </a>
                </span>
                <span className='icon mx-4'>
                  <a href='/#'>
                    <img src={icon_yt} alt='youtube_logo' width="30" height="30" className="d-inline-block align-top"></img>
                  </a>
                </span>
                <span className='icon mx-4'>
                  <a href='/#'>
                    <img src={icon_wa} alt='whatsapp_logo' width="30" height="30" className="d-inline-block align-top"></img>
                  </a>
                </span>
                <span className='icon mx-4'>
                  <a href='/#'>
                    <img src={icon_ig} alt='instagram_logo' width="30" height="30" className="d-inline-block align-top"></img>
                  </a>
                </span>
                <span className='icon mx-4'>
                  <a href='/#'>
                    <img src={icon_tw} alt='twitter_logo' width="30" height="30" className="d-inline-block align-top"></img>
                  </a>
                </span>
              </div>
            </span>
          </div>
          <div className="row">
              <div className='col text-center py-3 text-white'>
                  Copyright &copy; App
              </div>
          </div>
  </footer>
}

export default Footer