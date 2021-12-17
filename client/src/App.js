import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Canvas } from './components/Canvas';
import { SettingBar } from './components/SettingBar';
import { Toolbar } from './components/Toolbar';
import './styles/app.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/:id">
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date()).toString(16)}`} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
