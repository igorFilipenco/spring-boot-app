import React, {Component}    from 'react';
import {Link}                from 'react-router-dom';

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<div>Not found</div>
				<div>Go <Link to='/'>home</Link></div>
			</div>
		)
	}
}