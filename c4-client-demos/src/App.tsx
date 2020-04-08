import React, { Component } from 'react'
import { GroupsList } from './components/GroupsList'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { NotFound } from './components/NotFound'
import { CreateGroup } from './components/CreateGroup'

export interface AppProps {}
export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router>
                  // the menu is a common element on all pages
                  {this.generateMenu()}
                
                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
    )
  }
  // Display one of 3 pages, depending on the current path in the browser
  generateCurrentPage() {
    return (
      <Switch>
        <Route path="/groups/create" exact component={CreateGroup} />
        // Route runs the component that matches the current path 
        <Route path="/" exact component={GroupsList} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
