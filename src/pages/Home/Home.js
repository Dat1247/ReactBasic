import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";

import MultipleRowsSlick from "../../components/RSlick/MultipleRowsSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
	const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
	const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		const action = layDanhSachPhimAction();
		dispatch(action);
		dispatch(layDanhSachHeThongRapAction());
	}, []);

	return (
		<div>
			<HomeCarousel />

			<section className='text-gray-600 body-font'>
				<div className='px-5 py-24 mx-auto'>
					<MultipleRowsSlick arrFilm={arrFilm} />
				</div>
			</section>
			<div className='container mx-auto'>
				<HomeMenu heThongRapChieu={heThongRapChieu} />
			</div>
		</div>
	);
}
