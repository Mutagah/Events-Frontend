import React from 'react';
import Link from 'next/link';

const LeftMenu = () => {

    return (
      <>
      <div style={{display: "inline-flex", marginLeft: 40}}>
      <Link href="/" style={{textDecoration: "none"}}>
            <div className='headerLogo' >
                <p style={{fontWeight: "bolder", fontSize: 14, color: 'black', cursor: "pointer"}}>
                Events
                <br />
                <span style={{ color: "#d1410a", cursor: "pointer" }}>Bomboclat</span>
                </p>
            </div>
        </Link>
      </div>
      </>
    );
}

export default LeftMenu;