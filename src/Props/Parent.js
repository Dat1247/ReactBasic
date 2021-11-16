import React, { Component } from "react";
import Child from "./Child";
import ChildFunctional from "./ChildFunctional";

export default class Parent extends Component {
	product = {
		id: 1,
		src: "https://toigingiuvedep.vn/wp-content/uploads/2021/07/hinh-ve-don-gian-sieu-cute-sieu-de-thuong-1.jpg",
		name: "bitis hunter x2",
		desc: "lorem description",
		size: [36, 37, 38, 39, 40],
	};

	showInfo = (name) => {
		alert(name);
	};
	render() {
		return (
			<div>
				<input type='text' />
				{/* <Child propSource={this.src} name={this.name} /> */}
				{/* <Child propSource={'http://svcy2.myclass.vn/image/shoes3.jpg'} name={'bitis hunter x5'}/>
              <Child propSource={'http://svcy2.myclass.vn/image/shoes5.jpg'} name={'bitis hunter x7'}/> */}

				<ChildFunctional productItem={this.product} />
				<Child productItem={this.product} showAlert={this.showInfo} />
			</div>
		);
	}
}
