import React, { FC } from 'react';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';
import { Switch, Route, Redirect } from 'react-router-dom';

export const App: FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <UsersPage />
        </Route>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route path="/search">
          <UsersSearchPage />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
