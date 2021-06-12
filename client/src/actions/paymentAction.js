import axios from 'axios';

export const setOrder = (setOrderObject) => async () => {
	try {
		const options = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			data: setOrderObject,
			url: `/orders/payment`,
			timeout: '4000',
		};
		const order = await axios(options);
		return Promise.resolve(order.data.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const confirmOrder = (confirmObject) => async () => {
	try {
		const options = {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			data: confirmObject,
			url: `/orders/check`,
			timeout: '4000',
		};
		const order = await axios(options);
		return Promise.resolve(order.data);
	} catch (error) {
		return Promise.reject(error);
	}
};
