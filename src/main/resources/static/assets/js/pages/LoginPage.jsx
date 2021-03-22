import React, {Component, Fragment} from 'react';
import {Button, Divider, Form, Header, Icon, Input, Segment} from "semantic-ui-react";

export default class LoginPage extends Component {
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
		let {inputDisabled, isLoading} = this.state;

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
									userName: data.userName
								})}
							/>
						</Form.Field>
						<Form.Field>
							<Input placeholder='password...'
							       disabled={inputDisabled}
							       loading={isLoading}
							       onChange={(event, data) => this.setState({
								       password: data.password
							       })}
							/>
						</Form.Field>
					</Form>
					<Divider hidden/>
					<div>
						<Button onClick={() => this.props.history.push("/")}>
							Back
						</Button>
						<Button primary
						        onClick={this.onRegisterButtonClick()}
						>
							Log in
						</Button>
					</div>
				</Segment>
			</Fragment>
		)
	}

	onRegisterButtonClick = () => {

	}
}