import React from 'react';


const Navigation = ({ OnRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return(
                <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => OnRouteChange('signout')} className='f3 link dim lightest-blue underline pa3 pointer'> Sign Out</p>
            </nav>
            );
        } else {
            return(
                <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => OnRouteChange('SignIn')} className='f3 link dim lightest-blue underline pa3 pointer'> Sign In</p>
                    <p onClick={() => OnRouteChange('Regester')} className='f3 link dim lightest-blue underline pa3 pointer'> Register</p>
                </nav>
            );
        }
    }


export default Navigation;