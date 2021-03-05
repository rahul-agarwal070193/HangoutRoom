import React from 'react';
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
    { id: 'ind', label: 'Index', minWidth: 50 },
    { id: 'song_name', label: 'Title', minWidth: 200 },
    { id: 'video_id', label: 'Video id', minWidth: 170 },
    // { id: 'delete', label: 'Delete', minWidth: 30 },

];


const useStyles = makeStyles({
    container: {
        maxHeight: 400,
    },
});

export default function StickyHeadTable(props) {
    let rows = [];
    for (const [index, value] of props.queue.entries()) {
        let song_name = value.song_name;
        let video_id = value.video_id;
        let ind = index + 1;
        rows.push({ ind, song_name, video_id })
    }
    const classes = useStyles();
    if (rows.length === 0) {
        return (
            <div>Add video from search to play </div>
        )
    }
    return (
        <Paper className={classes.root}>
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
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                    <DeleteOutlineOutlinedIcon color="secondary" />
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
