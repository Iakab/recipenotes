import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from 'context/favourites.context';
import { SearchProvider } from 'context/search.context';
import { StorageProvider } from 'context/storage.context';
import { CategoriesProvider } from './context/categories.context';
import { UserProvider } from './context/user.context';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <StorageProvider>
        <FavouritesProvider>
          <SearchProvider>
            <CategoriesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CategoriesProvider>
          </SearchProvider>
        </FavouritesProvider>
      </StorageProvider>
    </UserProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
