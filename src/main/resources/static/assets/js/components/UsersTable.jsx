import React from "react";
import {
	Table,
	Header
} from "semantic-ui-react";


const UsersTable = (props) => {
	const {
		users
	} = props;

	const rows = users.map((user) => {
		return <Table.Row>
			<Table.Cell>
				<Header as='h2' textAlign='center'>
					{user && user.userName}
				</Header>
			</Table.Cell>
			<Table.Cell singleLine>
				{user && user.role && user.role.name}
			</Table.Cell>
		</Table.Row>
	})

	return (
		<Table celled padded>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell singleLine>
						Name
					</Table.HeaderCell>
					<Table.HeaderCell>
						Role
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{rows}
			</Table.Body>
		</Table>
	)
}

export default UsersTable;