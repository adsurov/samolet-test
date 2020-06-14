import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { Home } from './pages/Home';
import {Library} from './pages/Library'

import './app.css';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/:kopuk" component={Library} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
}
