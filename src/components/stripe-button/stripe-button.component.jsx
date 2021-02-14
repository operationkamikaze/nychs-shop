import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { generatePayementLink } from '../../payment';
import { useState } from 'react';
import { Button, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const StripeCheckoutButton = ({ price }) => {
	const [loading, setLoading] = useState(false);
	const priceForStripe = price;
	const publishableKey =
		'pk_test_51GqdsWJ5kGLDsVifD3181kTYJB5DAjIB4pi4bYzDwVK24BeBpuXaAKvlksPb77qbYZGx2oumD04WEs7jdI04tBoZ00HWdBOBFM';

	const onToken = (token) => {
		console.log(token);
		alert('Payment Successful');
	};

	const onClick = async (values) => {
		setLoading(true);
		const linkPay = await generatePayementLink({ amount: priceForStripe });

		if (linkPay) {
			window.location.reload();
			return (window.location.href = linkPay);
		}
	};

	return (
		<div>
			{loading ? (
				<Spin />
			) : (
				// <StripeCheckout
				// 	label='Pay Now'
				// 	name='Crown Clothing Ltd.'
				// 	billingAddress
				// 	shippingAddress
				// 	image='https://svgshare.com/i/CUz.svg'
				// 	description={`Your total is $${price}`}
				// 	amount={priceForStripe}
				// 	panelLabel='Pay Now'
				// 	token={onToken}
				// 	stripeKey={publishableKey}
				// />
				<Button
					type='primary'
					shape='round'
					icon={<DownloadOutlined />}
					size='large'
					onClick={onClick}>
					Pay now
				</Button>
			)}
		</div>
	);
};

export default StripeCheckoutButton;
