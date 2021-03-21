import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
const columns = [
    { id: 'ind', label: 'Index', minWidth: 10 },
    { id: 'song_name', label: 'Title', minWidth: 150 },
    // { id: 'video_id', label: 'Video id', minWidth: 30, maxWidth: 30 },
    { id: 'delete', label: 'Delete', minWidth: 10 },

];

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


export default function StickyHeadTable(props) {

    const windowDimensions = getWindowDimensions();
    const h1 = windowDimensions.height - 0.5625 * windowDimensions.width - 64;
    const h2 = windowDimensions.width * 0.375;
    let maxHeight = Math.max(h1, h2);
    const useStyles = makeStyles({
        container: {
            maxHeight: maxHeight,
        },
    });
    const code = props.code;
    const update = props.update;
    // let deletevideo = props.deletevideo;
    const [deletevideo, setdeletevideo] = useState(props.deletevideo);
    let rows = [];
    for (const [index, value] of props.queue.entries()) {
        let song_name = value.song_name;
        let video_id = value.video_id;
        let ind = index + 1;
        rows.push({ ind, song_name, video_id })
    }
    const classes = useStyles();
    const enddeletevideo = () => {
        if (deletevideo !== "")
            dele(deletevideo);
    }
    const dele = (video_id) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
                video_id: video_id
            })
        };

        fetch('/room/delete-video', requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {
                update("room deleted" + video_id);
            });
        // console.log(video_id);
        // console.log(code);
    }

    useEffect(() => {
        setdeletevideo(props.deletevideo);
        enddeletevideo(deletevideo);
    }, [props]);

    if (rows.length === 0) {
        return (
            <div>Add video from search to play </div>
        )
    }
    else {

        return (
            <Paper>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            if (row.ind === 1) {
                                                if (column.id === 'ind') {
                                                    return (<TableCell key={column.id} align={column.align}>
                                                        <i class="fas fa-play" style={{ color: "green" }}></i>
                                                    </TableCell>);
                                                }
                                                else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>);
                                                }
                                            }
                                            else {
                                                if (column.id === "delete") {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <DeleteOutlineOutlinedIcon color="secondary" onClick={() => dele(row.video_id)} />
                                                        </TableCell>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>);
                                                }
                                            }

                                        })}
                                    </TableRow>
                                );

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );

    }
}
