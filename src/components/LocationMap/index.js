import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const LAT_INDEX = 0;
const LNG_INDEX = 1;
const URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places&key';

export default function LocationMap({ coordinates }) {
	function Map() {
		return (
			<GoogleMap defaultZoom={16} defaultCenter={{ lat: coordinates[LAT_INDEX], lng: coordinates[LNG_INDEX] }}>
				<Marker position={{ lat: coordinates[LAT_INDEX], lng: coordinates[LNG_INDEX] }} />
			</GoogleMap>
		);
	}

	const WrappedMap = withScriptjs(withGoogleMap(Map));

	return (
		<div style={{ height: '200px', width: '100%' }}>
			<WrappedMap googleMapURL={`${URL}=${process.env.REACT_APP_GOOGLE_KEY}`}
				loadingElement={<div style={{ height: '100%' }} />}
				containerElement={<div style={{ height: '200px' }} />}
				mapElement={<div style={{ height: '100%' }} />} />
		</div>
	);
}
