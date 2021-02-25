import React from 'react';
import SocialLogin from 'react-social-login';

class SocialButton extends React.Component {
	render() {
		const { triggerLogin, ...rest } = this.props;

		return (
			<button onClick={triggerLogin} {...rest}>
				<i className='fab fa-facebook fa-lg'></i>
				{this.props.children}
			</button>
		);
	}
}

export default SocialLogin(SocialButton);
