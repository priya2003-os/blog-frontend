import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import updateId from "../../reducers/updateId";
import user from "../../reducers/user";
import Headers from "@/components/Headers";
import { useEffect } from "react";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// const store = configureStore({
//   reducer: { 
//     updateId,
//     user,
//    }
// })

const reducers = combineReducers({ user, updateId });
const persistConfig = { key: "carnet-des-mots", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {

  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Headers />
        <Component {...pageProps} />
        <Toaster />
        </PersistGate>
    </Provider>
);
}


