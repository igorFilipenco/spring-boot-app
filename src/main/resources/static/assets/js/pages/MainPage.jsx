import React, {Component, Fragment} from 'react';
import {Button, Divider, Header, Icon, Segment} from "semantic-ui-react";

export default class MainPage extends Component {
	render() {
		return (
			<Fragment>
				<Segment placeholder>
					<Header icon as='h2'>
						<Icon name='terminal'/>
						Welcome to spring-boot test-app
					</Header>
					<Button primary
					        onClick={() => this.props.history.push("/registration")}
					>
						Register
					</Button>
					<Divider hidden/>
					<Button secondary
					        onClick={() => this.props.history.push("/login")}
					>
						Log In
					</Button>
				</Segment>
			</Fragment>
		)
	}
}