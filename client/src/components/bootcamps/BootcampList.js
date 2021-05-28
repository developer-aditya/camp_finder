import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getAllBootcamp,
	getDistanceBootcamp,
	setCurrentBootcamp,
} from '../../actions/bootcampAction';
import NotFound from '../reponse/NotFound';
import ServerError from '../reponse/ServerError';

const BootcampList = ({
	bootcamp: { loading, bootcamps, pagination, params },
	queryState,
	getAllBootcamp,
	getDistanceBootcamp,
	setCurrentBootcamp,
}) => {
	const [statusCode, setStatusCode] = useState(200);
	const [page, setPage] = useState(1);
	const history = useHistory();

	useEffect(() => {
		let query = `select=name,location,careers,averageRating,averageCost,photo&page=${page}`;
		if (queryState.rating !== '0') {
			query = query + `&averageRating=${queryState.rating}`;
		}
		query =
			query +
			`&averageCost[gte]=${queryState.range[0]}&&averageCost[lte]=${queryState.range[1]}`;

		if (params === null)
			getAllBootcamp(query)
				.then((res) => setStatusCode(200))
				.catch((error) => setStatusCode(error.response.status));
		else
			getDistanceBootcamp(query, params.distance, params.pincode)
				.then((res) => setStatusCode(200))
				.catch((error) => setStatusCode(error.response.status));

		// eslint-disable-next-line
	}, [page, params, queryState]);

	const setCurrent = (id) => {
		setCurrentBootcamp(id);
		history.push('/singleBootcamp');
	};

	if (loading)
		return (
			<div className='progress' style={{ backgroundColor: '#c0e7fa' }}>
				<div
					className='indeterminate'
					style={{ backgroundColor: '#1c9fe0' }}
				></div>
			</div>
		);

	if (statusCode === 500) return <ServerError />;
	else if (bootcamps.length === 0)
		return (
			<NotFound
				heading='Oops! Unable to Get Bootcamps Try Again...'
				msg='There Were No Bootcamps Found For Applied Filters Try Removing some or refresh the Page'
				link='Go To Home Page'
				route='/'
			/>
		);
	else
		return (
			<React.Fragment>
				{bootcamps.map((element, index) => (
					<div
						className='card horizontal'
						style={{ marginBottom: '2rem' }}
						key={index}
					>
						<div className='card-image hide-on-small-only'>
							<img
								src={`/uploads/${element.photo}`}
								alt='camp-img'
								style={{ width: '100%', height: '100%' }}
							/>
						</div>

						<div className='card-content' style={{ width: '100%' }}>
							<div className='card-title'>
								{/* eslint-disable-next-line */}
								<a
									href=''
									onClick={(e) => {
										e.preventDefault();
										setCurrent(element.id);
									}}
								>
									{element.name}
								</a>
								<span className='light-blue right white-text valign-wrapper rating'>
									{element.averageRating === null
										? 'UR'
										: element.averageRating}
								</span>
							</div>
							<p className='blue-grey-text'>
								{element.location.city} , {element.location.country}
							</p>
							<ul>
								{element.careers.map((career, index) => (
									<li key={index}>{career}</li>
								))}
							</ul>
						</div>
					</div>
				))}
				{pagination.next ? (
					<button
						className='btn light-blue right'
						style={{ textTransform: 'capitalize' }}
						onClick={(e) => setPage(pagination.next.page)}
					>
						Next Page <i className='fas fa-arrow-alt-circle-right'></i>
					</button>
				) : (
					''
				)}
				{pagination.prev ? (
					<button
						className='btn light-blue circle left'
						style={{ textTransform: 'capitalize' }}
						onClick={(e) => setPage(pagination.prev.page)}
					>
						<i className='fas fa-arrow-alt-circle-left'></i> Previous Page
					</button>
				) : (
					''
				)}
			</React.Fragment>
		);
};

const mapStateToProps = (state) => ({ bootcamp: state.bootcamp });

export default connect(mapStateToProps, {
	getAllBootcamp,
	getDistanceBootcamp,
	setCurrentBootcamp,
})(BootcampList);
