import React, {Component, Fragment, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {getUsers} from "../actions/user";

import {
	Dimmer,
	Segment,
	Loader
} from "semantic-ui-react";

import UsersTable from "../components/UsersTable";


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {

			isLoading: false
		}
	}

	componentDidMount() {
		this.props.dispatch(getUsers());
	}

	render() {
		let {
			users,
			usersLoaded
		} = this.props;

		let content = usersLoaded ? <Dimmer active>
				<Loader indeterminate>
					Loading...
				</Loader>
			</Dimmer>
			:
			<UsersTable users={users}/>

		return (
			<Fragment>
				<Segment placeholder>
					{content}
				</Segment>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		userData: state.auth.userData,
		users: state.user.users,
		usersLoaded: state.user.usersLoaded
	}
};

export default withRouter(connect(mapStateToProps)(Dashboard));
