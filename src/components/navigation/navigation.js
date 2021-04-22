import React from 'react';


const Navigation = ({ OnRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return(
                <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => OnRouteChange('signout')} className='f4 link dim lightest-blue underline pa3 pointer'> Sign Out</p>
            </nav>
            );
        } else {
            return(
                <div className='bg-black-30 w-100 pa1'>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <p onClick={() => OnRouteChange('SignIn')} className='f4 link dim lightest-blue underline pa3 pointer'> Sign In</p>
                        <p onClick={() => OnRouteChange('Regester')} className='f4 link dim lightest-blue underline pa3 pointer'> Register</p>
                    </nav>
                </div>
            );
        }
    }


export default Navigation;