import React from 'react';
import compose from 'recompose/compose';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import ContentCreate from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import { NumberField } from 'react-admin';
import { linkToRecord } from 'ra-core';
import Modal from 'react-awesome-modal';

// import Viewer from 'react-viewer';
// import 'react-viewer/dist/index.css';
// import Lightbox from 'react-images'


const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },

    model: {
        backgroundColor: 'gray'
    },

    image: {
        height: 'initial',
        minHeight: 'initial',
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '100%',
        maxHeight: '100%',
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: 'auto', 
        marginBottom: 'auto', 
        display: 'block'
    },

};

const getColsForWidth = width => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 4;
    if (width === 'lg') return 5;
    return 6;
};

class GridList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            url: ""
        }
    }

    openModal(url) {
        this.setState({
            visible : true,
            url: url
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render(){
        const {classes, ids, data, basePath, width} = this.props;
        return (
            <div className={classes.root}>
                <MuiGridList
                    cellHeight={180}
                    cols={getColsForWidth(width)}
                    className={classes.gridList}
                >
                    {ids.map(id => (
                        <GridListTile key={id} onClick={() => this.openModal(data[id].name)}>
                            {/* <img src={data[id].thumbnail} alt="" /> */}
                            <img src={"http://localhost:3000/photos/" + data[id].name} alt="" />

                            <GridListTileBar
                                className={classes.tileBar}
                                title={data[id].reference}
                                actionIcon={
                                    <IconButton
                                        to={linkToRecord(basePath, data[id].id)}
                                        className={classes.link}
                                        component={Link}
                                    >
                                        <ContentCreate />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </MuiGridList>
                <Modal className={classes.model} visible={this.state.visible} width="800" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <img className={classes.image} src={"http://localhost:3000/photos/" + this.state.url} alt=""/>
                    
                </Modal>
            </div>
        )
    }

};

const enhance = compose(
    withWidth(),
    withStyles(styles)
);

export default enhance(GridList);
