import * as React from 'react'
import { GroupModel } from '../types/GroupModel'
import { Group } from './Group'
import { getGroups } from '../api/groups-api'
import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

// a history object from the React library, keeps history of routes
// to keep track of current route
interface GroupsListProps {
  history: History
}

interface GroupsListState {
  groups: GroupModel[]
}

export class GroupsList extends React.PureComponent<GroupsListProps, GroupsListState> {
  state: GroupsListState = {
    groups: []
  }

  // when the 'Create new group' button is pushed, this handler
  // changes the current path to /groups/create
  handleCreateGroup = () => {
    this.props.history.push(`/groups/create`)

  }

  async componentDidMount() {
    try {
      const groups = await getGroups()
      this.setState({
        groups
      })
    } catch (e) {
      alert(`Failed to fetch groups: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Groups</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateGroup}
        >
          Create new group
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.groups.map(group => {
            return <Group key={group.id} group={group} />
          })}
        </Card.Group>
      </div>
    )
  }
}
