import React from "react";
import { Tabs, Radio, Space } from "antd";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
	return (
		<>
			<Tabs tabPosition='left'>
				<TabPane
					tab={
						<img
							src='https://picsum.photos/100'
							className='rounded-full w-12'
							alt='1'
						/>
					}
					key='1'>
					Content of Tab 1
				</TabPane>
				<TabPane
					tab={
						<img
							src='https://picsum.photos/100'
							className='rounded-full w-12'
							alt='1'
						/>
					}
					key='2'>
					Content of Tab 2
				</TabPane>
				<TabPane
					tab={
						<img
							src='https://picsum.photos/100'
							className='rounded-full w-12'
							alt='1'
						/>
					}
					key='3'>
					Content of Tab 3
				</TabPane>
			</Tabs>
		</>
	);
}
