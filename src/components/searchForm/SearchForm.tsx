import React, { useState, ReactElement, useEffect } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

import Form from './Form';
import Toast from '../toast/Toast';

const GET_COORDINATES = gql`query getCoordinates($address: String!) {
  geocode(address: $address) {
    address
    latitude
    longitude
  }
}`;

const CREATE_JOB = gql`mutation createJob ($pickup: String!, $dropoff:String!) {
  job(pickup: $pickup, dropoff: $dropoff) {
    pickup{
      address
    }
    dropoff{
      address
    }
  }
}`;

const SearchForm = ():ReactElement => {
  const [searchingAddressType, setSearchingAddressType] = useState(null);
  const [toast, setToast] = useState({ active: false, message: ''});
  const [geolocalize, { error, data }] = useLazyQuery(GET_COORDINATES);
  const [setJob, { loading: jobLoading, error: jobError, data: jobData }] = useMutation(CREATE_JOB, {
    variables: { pickup: '', dropoff: '' } 
  });
  const MARKERS_LIST: {[index: string]:number} = { pick: 0, drop: 1};  
  
  const addMarker = (latitude: number, longitude: number, address: string) => {
    const center = new window.google.maps.LatLng(latitude, longitude);
    window.map.setCenter(center);
    const marker = new window.google.maps.Marker({
      position: center,
      map: window.map,
      title: address.toString()
    });
    window.markers.push(marker);
  };

  const removeMarker = (type:string) => {
    const markerTypeIndex = MARKERS_LIST[type];
      if (window.markers.length > 0 && (window.markers.length > 0 && window.markers[markerTypeIndex])) {
        window.markers[markerTypeIndex]?.setMap(null);
        window.markers = window.markers.filter((marker:any, idx:number) => idx !== markerTypeIndex);
      }
  }
  
  const geolocalizeAddress = (value:string, type:string):void => {
    if (value !== '') {
      setSearchingAddressType(type);
      geolocalize({ variables: { address: value } });
    } else {
      removeMarker(type);
    }
  };
  
  useEffect(() => {
    const markerTypeIndex = MARKERS_LIST[searchingAddressType?.type];
    if (data && error === undefined) {
      if (window.markers.length === 0 || (window.markers.length > 0 && !window.markers[markerTypeIndex])) {
        const { latitude, longitude, address} = data.geocode;
        addMarker(latitude, longitude, address);  
      } 
    } else {
      if (error !== undefined) {
        removeMarker(searchingAddressType?.type);
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (jobData && !jobError) {
      setToast({ active: true, message: 'Job has been created successfully!'});
      window.markers.map((marker:any) => {
        marker.setMap(null);
      });
      window.markers = [];
    }
  }, [jobData, jobError]);
  
  const createJob = (pickup:string, dropoff:string):void => {
    setJob({ variables: { pickup, dropoff }});
  };

  const status:any = `${jobLoading ? 'loading' : ''}${jobData ? 'success' : ''}${jobError ? 'error' : ''}`;
  
  return (
    <>
      {toast.active &&
        <Toast
          hideToast={() => setToast({ active: false, message: ''})}
          message={toast.message}
        />
      }
      <Form
        createJob={createJob}
        status={status}
        geolocalizeAddress={geolocalizeAddress}
      />
    </>
  );
};

export default SearchForm;