import React from 'react'
import CustomBtn from './button'
import { Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    bar: {
        paddingTop: "2rem",
        backgroundColor: "#111",
        '@media (max-width:780px)': {
            flexDirection: "column"
        }
    },
    logo: {
        width: "60%",
        '@media (max-width:780px)': {
            display: "none"
        }
    },
    logoMobile: {
        width: "100%",
        display: "none",
        '@media (max-width:780px)': {
            display: "inline-block"
        }
    },
    menuItem: {
        cursor: "pointer",
        flexGrow: 1,
        color: '#ffffff',
        "&:hover": {
            color: "#4f25f7"
        },
        '@media (max-width:780px)': {
            paddingBottom: "1rem"
        }
    },
    anchor: {
        display: "inline-block"
    },
    button: {
        marginLeft: 'auto',
        padding: '0 2rem'
    }
})

function NavBar(props: { cards?: any }) {
    const classes = styles()

    const btn = props.cards ? <span className={classes.button}> <CustomBtn cards={props.cards} txt="Eat Now" /> </span> : <></>

    return (
        <Toolbar color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
            <a href='/' className={classes.anchor}>
                <img src="https://uploads-ssl.webflow.com/600185b83396ce5247e6592a/61e54e9a835c1430abd91259_WalkUp%20by%20dojo%20V2.png" alt="Walkup - Dojo" className={classes.logo} />
            </a>
            
            {btn}
        </Toolbar>
    )
}

export default NavBar
