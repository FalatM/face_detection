// import { render } from '@testing-library/react';
import React from 'react';
import '../ImageLinkForm/ImageLinkForm.css';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmintSignIn = () => {
        fetch('http://localhost:3000/signIn', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(responce => responce.json())
        .then(data => {
            if (data === 'Success') {
                this.props.OnRouteChange('home');
            }
        })
        
    }

    render() {
        const { OnRouteChange } = this.props;
        return(
            <article className="br3 ba bg-black-30 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 lightest-blue">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 lightest-blue" 
                            htmlFor="email-address" >Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                             type="email" 
                             name="email-address"  
                             id="email-address" 
                             onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 lightest-blue" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}
                             />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmintSignIn}
                            className="b ph3 pv2 input-reset ba lightest-blue bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => OnRouteChange('Register')} className="f6 link dim lightest-blue db">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}



export default SignIn;