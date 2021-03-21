import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import InfoIcon from '@material-ui/icons/Info';
import Search from "./Search";
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
const drawerWidth = "33%";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        minWidth: 300,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        minWidth: 300,
        // background: "transparent"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function Topnav(props) {
    const update = props.update;
    const code = props.code;
    const [name, setname] = useState("");
    const [password, setpassword] = useState("")
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [memberList, setmemberList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const openinfo = Boolean(anchorEl);
    const id = openinfo ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    // all member of the room
    const call = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
            })
        };

        fetch('/room/all-user-in-room', requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                // console.log(data);
                if (data.msg === 'Success') {
                    setmemberList(data.users);
                }
            });
        // console.log(memberList);
    }
    const handleDrawerOpenMember = () => {
        call();
        setOpenChat(false);
        setOpen(!open);
        // console.log(memberList);
    };
    const handleDrawerCloseMember = () => {
        setOpen(false);
    };
    const handleDrawerOpenChat = () => {
        setOpen(false);
        setOpenChat(!openChat);
    };
    const handleDrawerCloseChat = () => {
        setOpenChat(false);
    };
    const getroom = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
            })
        };

        fetch('/room/get-room', requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                setpassword(data.password);
                setname(data.name);
            });
    };
    useEffect(() => {
        call();
    }, []);
    useEffect(() => {
        getroom();
    }, [])
    return (
        <div>
            <AppBar position="fixed" class="bg-dark text-white">
                <Toolbar>
                    {/* room code
                            room password
                            room name */}

                    <div class="mx-1">
                        <InfoIcon onClick={handleClick} />
                        <Popover
                            id={id}
                            open={openinfo}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Typography>Room Name : {name}</Typography>
                            <Typography>Code : {code}</Typography>
                            <Typography>Password : {password}</Typography>
                        </Popover>
                    </div>
                    <Typography variant="h6">{name}</Typography>
                    <div className={classes.grow}></div>
                    <div>
                        <Badge style={{ paddingRight: 5 }}><Search code={code} update={update} /></Badge>
                        <Badge badgeContent={memberList.length} color="secondary" style={{ paddingRight: 5 }} >
                            <ChatIcon onClick={handleDrawerOpenChat} />
                        </Badge>
                        <Badge badgeContent={memberList.length} color="secondary" style={{ paddingRight: 5 }}>
                            <PeopleIcon onClick={handleDrawerOpenMember} />
                        </Badge>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerCloseMember}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List class="bg-dark text-white">
                    {memberList.map((member) =>
                        <ListItem button key={member.first_name}>
                            <ListItemText primary={member.first_name + " " + member.last_name} />
                        </ListItem>
                    )}
                </List>
            </Drawer>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openChat}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerCloseChat}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <p>chat app</p>
            </Drawer>
        </div >
    );
}
