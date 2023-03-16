import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//Redux
import store from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify';
import { ProSidebarProvider } from 'react-pro-sidebar';
import 'react-toastify/dist/ReactToastify.css';


let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ProSidebarProvider>
            <App />
          </ProSidebarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
