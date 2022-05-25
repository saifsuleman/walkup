import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0, 
        background: "#3071f2",
        color: "#fff",
        transform: "none",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            background:  "#2a06ba"
          },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

function CustomBtn(props: any) {
    return (
        <StyledButton onClick={() => props.cards.current.scrollIntoView({ behavior: 'smooth', block: 'start' })} variant="contained">{props.txt}</StyledButton>
    )
}

export default CustomBtn