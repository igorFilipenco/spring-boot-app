import React, {Component, Fragment} from 'react';
import {authUser} from "../actions/auth";

import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Input,
	Segment
} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class LoginPage extends Component {
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
			inputDisabled,
			isLoading
		} = this.state;

		return (
			<Fragment>
				<Segment placeholder>
					<Header icon as='h2'>
						<Icon name='terminal'/>
						Already have account? Log in
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
					<div>
						<Button onClick={() => this.props.history.push("/")}>
							Back
						</Button>
						<Divider hidden/>
						<Button primary
						        onClick={() => this.onLoginButtonClick()}
						>
							Log in
						</Button>
					</div>
				</Segment>
			</Fragment>
		)
	}

	onLoginButtonClick = () => {
		const that = this;
		let promise = new Promise((resolve, reject) => resolve(1));

		promise
			.then(() => that.setState({inputDisabled: true, isLoading: true}))
			.then(() => {
				return that.props.dispatch(authUser({
					userName: that.state.userName,
					password: that.state.password
				}));
			})
			.then(() => {
				this.props.history.push("/dashboard");
			});
	}
}

export default withRouter(connect()(LoginPage));
