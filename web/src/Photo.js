import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    root: { display: 'inline-block', marginTop: '1em', zIndex: 2 },
    content: { padding: 0, '&:last-child': { padding: 0 } },
    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '50em',
        maxHeight: '18em',
    },
};

const Poster = withStyles(styles)(({ classes, record }) => (
    <Card className={classes.root}>
        <CardContent className={classes.content}>
            <img src={"http://localhost:3000/photos/" + record.name} alt="" className={classes.img} />
        </CardContent>
    </Card>
));

export default Poster;
