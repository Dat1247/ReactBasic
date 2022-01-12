import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
	SET_PHIM_DANG_CHIEU,
	SET_PHIM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimTypes";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-next"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-prev"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

const MultipleRowSlick = (props) => {
	const { dangChieu, sapChieu } = useSelector(
		(state) => state.QuanLyPhimReducer
	);
	const dispatch = useDispatch();

	let activeClassDC =
		dangChieu === true
			? `${styleSlick["active_Schedule"]}`
			: `${styleSlick["none_Schedule"]}`;
	let activeClassSC =
		sapChieu === true
			? `${styleSlick["active_Schedule"]}`
			: `${styleSlick["none_Schedule"]}`;

	const renderFilms = () => {
		return props.arrFilm.slice(0, 12).map((item, index) => {
			return (
				<div className={`${styleSlick["width-item"]} mb-4`} key={index}>
					{/* <Film film={item} /> */}
					<Film_Flip film={item} />
				</div>
			);
		});
	};

	const settings = {
		className: "center variable-width container",
		centerMode: true,
		infinite: true,
		centerPadding: "60px",
		slidesToShow: 3,
		speed: 500,
		rows: 1,
		slidesPerRow: 2,
		variableWidth: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<div>
			<div className='container'>
				<button
					className={`${activeClassDC} font-bold p-3 mr-4  border-gray-800 border-2 rounded-lg`}
					onClick={() => {
						const action = {
							type: SET_PHIM_DANG_CHIEU,
						};
						dispatch(action);
					}}>
					PHIM ĐANG CHIẾU
				</button>
				<button
					className={`${activeClassSC} font-bold p-3 mr-4  border-gray-800 border-2 rounded-lg`}
					onClick={() => {
						const action = {
							type: SET_PHIM_SAP_CHIEU,
						};
						dispatch(action);
					}}>
					PHIM SẮP CHIẾU
				</button>
			</div>
			<Slider {...settings}>{renderFilms()}</Slider>
		</div>
	);
};

export default MultipleRowSlick;
