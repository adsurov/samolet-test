import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import ruRU from 'antd/lib/locale-provider/ru_RU';
import App from './app';
import * as serviceWorker from './serviceWorker';
import {store} from "./redux";

import 'antd/dist/antd.css';


ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
