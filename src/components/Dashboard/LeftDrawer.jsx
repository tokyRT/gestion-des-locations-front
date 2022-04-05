import React from 'react';
import styled from 'styled-components';
import * as styles from '../../styles/variables';
import {
    Toolbar,
    Drawer,
    List,
    ListItem,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import appLogo from '../../assets/img/analytica.svg'

export default function LeftDrawer(props) {
    const { window } = props;

    const drawer = (
        <DrawerContent>
            <div className="top">
                <Toolbar sx={{
                    height: 110
                }}>
                    <img src={appLogo} alt="app logo" />
                </Toolbar>
                <Divider sx={{
                    borderColor: 'rgb(45, 55, 72)',
                    mb: 7
                }} />
                <strong className="subheader">GENERAL</strong>
                <List
                    sx={{
                        pl: 2,
                        pr: 2
                    }}
                >
                    <ListItem button className='list-item'>
                        <Link to='/' className='active'>
                            <HomeRoundedIcon />
                            Tableau de bord
                        </Link>
                    </ListItem>
                    <ListItem button className='list-item'>
                        <Link to='/'>
                            <LeaderboardRoundedIcon />
                            Analytics
                        </Link>
                    </ListItem>
                    <ListItem button className='list-item'>
                        <Link to='/'>
                            <GroupRoundedIcon />
                            Utilisateurs
                        </Link>
                    </ListItem>
                    <ListItem button className='list-item'>
                        <Link to='/'>
                            <AutoGraphRoundedIcon />
                            Activités
                        </Link>
                    </ListItem>
                    <ListItem button className='list-item'>
                        <Link to='/'>
                            <AutoGraphRoundedIcon />
                            Activités
                        </Link>
                    </ListItem>
                </List>
            </div>
            <div className="bottom">
                <Divider sx={{
                    borderColor: 'rgb(45, 55, 72)',
                    mb: 2
                }} />
                <List
                    sx={{
                        pl: 2,
                        pr: 2
                    }}
                >
                    <ListItem button className='list-item'>
                        <Link to='/'>
                            <PowerSettingsNewRoundedIcon />
                            Se déconnecter
                        </Link>
                    </ListItem>
                </List>
                <small>
                    made with <FavoriteRoundedIcon className='heart'/> by Team Yasai
                </small>
            </div>
        </DrawerContent>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const drawerWidth = props.drawerWidth;
    return (
        <div>
            <Drawer
                container={container}
                variant="temporary"
                open={props.drawerMobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        background: styles.colors.drawerBg,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        background: styles.colors.drawerBg,
                        color: styles.colors.drawerColor,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </div>
    );
}

const DrawerContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .subheader{
        color: #6b7280;
        font-size: 12px;
        margin-left: 32px;
    }
    .list-item{
        border-radius: ${styles.size.borderRadius};
        height: 42px;
        padding: 0;
        margin-bottom: 4px;
        overflow: hidden;
        a{
            color: ${styles.colors.drawerColor};
            text-decoration: none;
            font-weight: bold;
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            font-size: 14px;
            padding: 9px 24px;
            transition: all .25s;
            letter-spacing: 1px;
            svg{
                width: 20px;
                margin-right: 10px;
            }
            &:hover, &.active{
                background-color: rgba(255, 255, 255, 0.08);
            }
            &.active{
                color: ${styles.colors.green};
            }
        }
    }
    .bottom{
        a:hover{
            background-color: #fd14146b;
        }
        small{
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 7px;
            .heart{
                color: red;
                width: 14px;
                margin-left: 7px;
                margin-right: 7px;
            }
        }
    }
`;