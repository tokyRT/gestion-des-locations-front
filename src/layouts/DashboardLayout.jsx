import React from 'react';
import * as styles from '../styles/variables';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import UserAvatarMenu from '../components/Dashboard/UserAvatarMenu';
import LeftDrawer from '../components/Dashboard/LeftDrawer';
import DrawerToggler from '../components/Dashboard/DrawerToggler';



const drawerWidth = styles.size.drawerWidth;
export default function DashboardLayout() {

	const [drawerMobileOpen, setdrawerMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setdrawerMobileOpen(!drawerMobileOpen);
	};
	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar
				elevation={2}
				sx={{
					width: { lg: `calc(100% - ${drawerWidth}px)` },
					ml: { lg: `${drawerWidth}px` },
					background: 'white'
				}}
			>
				<Toolbar sx={{
					justifyContent: 'space-between'
				}}>
					<DrawerToggler handleDrawerToggle={handleDrawerToggle} />
					<Box sx={{
						mr: 0,
						ml: 'auto'
					}}>
						<UserAvatarMenu />
					</Box>
				</Toolbar>
			</AppBar>
			<LeftDrawer
				drawerWidth={drawerWidth}
				handleDrawerToggle={handleDrawerToggle}
				drawerMobileOpen={drawerMobileOpen}
			/>

			<Box sx={{
				ml: { lg: `${drawerWidth}px` },
				mt: '50px',
				p: 2,
				height: '130vh',
				width: '100%'
			}}>
				{/* ------ main content goes here ------- */}
				<Outlet />
			</Box>


		</Box>
	);
}
