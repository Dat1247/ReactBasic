import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselActions";

export default function HomeCarousel() {
	const { arrBanner } = useSelector((state) => state.CarouselReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCarouselAction());
	}, []);

	const contentStyle = {
		height: "600px",
		color: "#fff",
		lineHeight: "160px",
		textAlign: "center",
		backgroundPosition: "center",
		backgroundSize: "100%",
		backgroundRepeat: "no-repeat",
	};

	const renderBanner = () => {
		return arrBanner.map((item, index) => {
			return (
				<div key={index}>
					<div
						style={{
							...contentStyle,
							backgroundImage: `url(${item.hinhAnh})`,
						}}>
						<img
							src={item.hinhAnh}
							className='w-full opacity-0'
							alt={item.hinhAnh}
						/>
					</div>
				</div>
			);
		});
	};
	return (
		<Carousel effect='fade' style={{ position: "relative", zIndex: 1 }}>
			{renderBanner()}
		</Carousel>
	);
}
