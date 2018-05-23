
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/components/containers/Home/Home';
import Foo from '@/components/containers/Foo/Foo';
import Bar from '@/components/containers/Bar/Bar';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/foo" component={Foo}/>
      <Route path="/bar" component={Bar}/>
    </Switch>
  </main>
);

export default Main;
