import axios from 'axios';
import faker from 'faker';
export const generatePayementLink = async ({
	amount,
	currency,
	firstname,
	lastname,
	email,
	customerPhone,
	customerCity,
	customerAddr,
	customerState,
	customerCountryCode,
	customerPostalCode,
}) => {
	const requestPayload = {
		transactionName: 'shop checkout',
		amount: amount,
		currency: 'USD',
		transactionReference: faker.finance.bitcoinAddress(),
		customerFirstName: faker.name.firstName(),
		customerLastName: faker.name.lastName(),
		customerEmail: faker.internet.email(),
		customerPhone: faker.phone.phoneNumber(),
		customerAddress: faker.address.streetAddress(),
		customerCity: faker.address.city(),
		customerState: faker.address.county(),
		customerCountryCode: faker.address.countryCode(),
		customerPostalCode: faker.address.zipCodeByState(),
		merchantPublicKey: 'cc4fa9d32e574bd59d865ef9ab789a3c',
	};
	console.log(requestPayload);
	let paymentLink = '';
	const HOSTED_CHECKOUT_LINK =
		'https://checkout.sparco.io/gateway/api/v1/checkout';

	try {
		const payload = await axios.post(HOSTED_CHECKOUT_LINK, requestPayload);
		if (payload) {
			paymentLink = payload.data.paymentUrl;
			console.log(payload.data.paymentUrl);

			return paymentLink;
		}
	} catch (error) {
		return;
	}
	return paymentLink;
};
