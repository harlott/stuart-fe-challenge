import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';

import './style.css';

const client = new ApolloClient({
  uri: 'https://stuart-frontend-challenge.vercel.app/graphql',
  cache: new InMemoryCache(),
});

const INITIAL_COORDS = {
  latitude: 48.86982,
  longitude: 2.334579
};

function initMap(): void {
  window.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: INITIAL_COORDS.latitude, lng: INITIAL_COORDS.longitude },
    zoom: 15,
    disableDefaultUI: true,
  });
  window.markers = [];
};

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

declare global {
  interface Window {
    initMap: () => void;
    map: google.maps.Map;
    markers: google.maps.Marker[];
  }
}

window.initMap = initMap;
