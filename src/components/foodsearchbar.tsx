import { Autocomplete, Box, IconButton, InputBase, Paper, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles"
import SearchIcon from '@mui/icons-material/Search'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Restaurants: any[] = require("../walkuprestaurants.json").filter((restaurant:any) => restaurant.vendor_type === "restaurant")

// render

const styles = makeStyles({
  inputRoot: {
    color: 'black'
  }
})

export default function FoodSearchBar() {
  const classes = styles()
  const nav = useNavigate()

  const [input, setInput] = useState({} as any)

  const handleSearch = (restaurant: any) => {
    if (!restaurant) return
    nav(`/restaurant/${restaurant.restaurant_id}`)
  }

  return(
    <form onSubmit={(event) => {
      event.preventDefault()
      handleSearch(input)
    }}>
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
        <Autocomplete
          id="combo-box-demo"
          options={Restaurants}
          getOptionLabel={(option) => `${option.name} - ${option.location.area}`}
          style={{ width: 400, color:'black' }}
          classes={classes}
          onChange={(event, values) => {
            setInput(values)
          }}
          filterOptions={(options, state) => {
            return options.filter(option => `${option.name} - ${option.location.area}`.toLowerCase().includes(state.inputValue.toLowerCase()))
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Box
                component="span"
                sx={{
                  width: 14,
                  height: 14,
                  flexShrink: 0,
                  borderRadius: '3px',
                  mr: 1,
                  mt: '2px',
                }}
                style={{ backgroundColor: option.color }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  color: '#586069',
                }}
              >
                {`${option.name} - ${option.location.area}`}
              </Box>
            </li>
          )}
          renderInput={(params)=>{
            const {InputLabelProps,InputProps,...rest} = params;
            
            return (
              <InputBase
                {...params.InputProps} {...rest}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Find your Restaurant"
              />
            )
          }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  )
}