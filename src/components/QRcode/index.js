import React from 'react';
import { QRCode } from 'react-qr-svg';

import './index.scss';

export default function QRcode() {
	return (
		<div>
			<div className="qr-code-container" id='qr'>
				<QRCode style={{ width: 256 }} value='http://facebook.github.io/react/' />
			</div>
		</div>
	);
}
