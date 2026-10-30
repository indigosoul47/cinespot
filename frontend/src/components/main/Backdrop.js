import React from 'react';
import backdrop from '../../assets/svg/backdrop.svg';

const Backdrop = ({isMain = true}) => {
  return (
    <div className='absolute -z-10 w-full opacity-60'>
      <div className='section-1 absolute mt-52' style={{
          marginLeft: '-5rem'
        }}>
        <img src={backdrop} alt='backdrop' width="100%" height="100%" className="d-inline-block align-top h-full" style={{
          margin: '-5rem -5rem 0 0',
          width: '48rem',
        }}></img>
        {/* 
        <img src={gf_youth} alt='youth_graphic' width="250" height="30" className="d-inline-block align-top" style={{
              marginLeft: '55vw',
              marginTop: '40rem'
        }}></img>
        <img src={gf_culture} alt='culture_graphic' width="100" height="30" className="d-inline-block align-top" style={{
              marginLeft: '25vw',
              marginTop: '5rem'
        }}></img>
        <img src={gf_dogs} alt='dogs_graphic' width="250" height="30" className="d-inline-block align-top" style={{
              marginLeft: '65vw',
              marginTop: '5rem'
        }}></img>
        <img src={gf_sun} alt='sun_graphic' width="45" height="30" className="d-inline-block align-top" style={{
              marginLeft: '15vw',
              marginTop: '5rem'
        }}></img> */}
      </div>
      { isMain && (
        <div className='section-2' style={{
          display: 'grid',
        }}>
          <div className='sub-section-1 flex flex-col items-center relative' style={{
            marginBottom: '96rem'
          }}>
            {/* <img src={paint_blotch} alt='logo' width="800" height="30" className="d-inline-block align-top absolute" style={{
              left: '50%',
              transform: 'translate(-50%, 0)'
            }}></img> */}
            <div className='overlay'>
              {/* <img src={wall_text} alt='logo' width="820" height="30" className="d-inline-block align-top absolute" style={{
                'WebkitMaskImage': `url("${paint_mask}")`,
                'WebkitMaskRepeat': 'no-repeat',
                'WebkitMaskSize': 'contain',
                left: '50%',
                transform: 'translate(-41%, 12%)'
              }}></img> */}
            </div>
          </div>
          <div className='sub-section-2 flex flex-col items-center relative mt-56'>
            {/* <img src={cloud_effect} alt='logo' width="1200" height="30" className="d-inline-block align-top -z-10"></img> */}
            <div className='overlay flex justify-evenly w-screen pt-32 absolute top-32 left-40'>
              {/* <img src={tire_tracks} alt='logo' width="600" height="30" className="d-inline-block align-top"></img> */}
              {/* <img src={paw_prints} alt='logo' width="90" height="30" className="d-inline-block align-top"></img> */}
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

export default Backdrop