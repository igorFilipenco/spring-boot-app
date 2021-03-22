import React, {Component, Fragment, useContext} from 'react';
import {Button, Segment, Form, Input, Icon, Header, Divider} from "semantic-ui-react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {registerNewUser} from "../actions/user";


class RegistryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			inputDisabled: false,
			isLoading: false
		}
	}

	render() {
		let {
			userName,
			password,
			inputDisabled,
			isLoading
		} = this.state;

		return (
			<Fragment>
				<Segment placeholder>
					<Header icon as='h2'>
						<Icon name='terminal'/>
						Register new user
					</Header>
					<Divider hidden/>
					<Form>
						<Form.Field>
							<Input
								placeholder='login...'
								disabled={inputDisabled}
								loading={isLoading}
								onChange={(event, data) => this.setState({
									userName: data.value
								})}
							/>
						</Form.Field>
						<Form.Field>
							<Input placeholder='password...'
							       disabled={inputDisabled}
							       loading={isLoading}
							       onChange={(event, data) =>
								       this.setState({
									       password: data.value
								       })}
							/>
						</Form.Field>
					</Form>
					<Divider hidden/>

					<Button onClick={() => this.props.history.push("/")}>
						Back
					</Button>
					<Divider hidden/>
					<Button primary
					        onClick={() => this.onRegisterButtonClick()}
					>
						Register
					</Button>

				</Segment>
			</Fragment>
		)
	}

	onRegisterButtonClick = () => {
		const that = this;
		let promise = new Promise((resolve, reject) => resolve(1));

		promise
			.then(() => that.setState({inputDisabled: true, isLoading: true}))
			.then(() => {
				return that.props.dispatch(registerNewUser({
					userName: that.state.userName,
					password: that.state.password
				}));
			})
	}
}

const mapStateToProps = state => {
	return {
		userData: state.user.userData,
		userLoaded: state.user.userData
	}
};

export default withRouter(connect(mapStateToProps)(RegistryPage));
