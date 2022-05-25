import React, { useRef, useState } from "react";
import "./App.css";
import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import NavBar from "./components/navbar";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Paper,
  Stack,
} from "@mui/material/";
import { makeStyles } from "@material-ui/core/styles";
import ShufflingText from "./components/shufflingtext";
import FoodSearchBar from "./components/foodsearchbar";
import Particles from "react-tsparticles";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Background from "./components/background";
import { ClassNames } from "@emotion/react";

const Restaurants: any[] = require("./walkuprestaurants.json");

const averageDescriptionLength =
  Restaurants.filter((r) => r.description.length > 10)
    .map((r) => r.description.length)
    .reduce((a, b) => a + b) / Restaurants.length;

const theme = createTheme({
  palette: {
    primary: {
      main: `#32ffdd`,
    },
    secondary: {
      main: `#32ffdd`,
    },
    background: {
      default: `#111`,
    },
  },
  typography: {
    fontFamily: "Roboto",
    allVariants: {
      color: "white",
    },
    h2: {
      fontWeight: 600,
      fontSize: 48,
      lineHeight: "3.0rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "2rem",
    },
    h5: {
      fontWeight: 100,
      lineHeight: "2rem",
      fontSize: 18,
    },
  },
});

const styles = makeStyles({
  centrebody: {
    width: "100%",
    height: "100%",
    padding: "10rem 0rem",
  },
  restaurantbody: {
    width: "100%",
    height: "100%",
    padding: "0rem 0rem",
    textAlign: `center`,
  },
  restaurantbodytext: {
    padding: "5rem",
  },
  slogan: {
    padding: "5rem",
  },
  foodsearchbar: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 60,
    textAlign: "center",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
});

function getRandomRestaurants(size: number, blacklist: any[] = []): any[] {
  const restaurants = Restaurants.filter(
    (restaurant) => restaurant.vendor_type === "restaurant"
  ).filter((restaurant) => !blacklist.includes(restaurant));
  const arr = [];
  for (let i = 0; i < size; i++) {
    const idx = Math.floor(Math.random() * restaurants.length);
    arr.push(restaurants[idx]);
    restaurants.slice(idx, 1);
  }
  return arr;
}

function truncatedText(string: string, max = averageDescriptionLength) {
  if (string.length > max) {
    return `${string.substr(0, max)}...`;
  } else {
    return string;
  }
}

function CardArea() {
  const classes = styles();

  const [selected, setSelected] = useState(NaN);
  const [cards, setCards] = useState(getRandomRestaurants(9));

  const nav = useNavigate();

  window.addEventListener("scroll", () => {
    const scrollHeight = document.scrollingElement?.scrollHeight;
    if (!scrollHeight) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >=
      scrollHeight
    ) {
      setCards(cards.concat(getRandomRestaurants(3, cards)));
    }
  });

  return (
    <div>
      <Grid
        container
        spacing={10}
        alignItems="stretch"
        display="flex"
        height="100%"
        justifyContent="center"
      >
        {cards.map((restaurant, id) => {
          return (
            <Grid item key={id}>
              <Card
                classes={{ root: selected === id ? classes.cardHovered : "" }}
                onMouseOut={() => setSelected(NaN)}
                raised={selected === id}
                onMouseOver={() => setSelected(id)}
                onClick={() => nav(`/restaurant/${restaurant.restaurant_id}`)}
                sx={{ maxWidth: 400, height: '57vh' }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`${restaurant.cover_photo}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="text.secondary"
                      component="div"
                    >
                      {`${restaurant.name} (${restaurant.location.area})`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truncatedText(restaurant.description)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function Home() {
  const classes = styles();

  const slogans = [
    "Book a seat and you're ready to eat.",
    "I'm lovin' it.",
    "Finger licking good.",
    "Just Do It",
    "Think Different",
    "Red Bull gives you wings",
    "Let's Go Places",
    "Quality never goes out of style",
  ];

  let cardsRef = useRef(null);

  return (
    <div className="App">
      <Background />

      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <NavBar cards={cardsRef} />

            <div className={classes.centrebody}>
              <div className={classes.slogan}>
                <Typography variant="h2">
                  <ShufflingText interval={1500} text={slogans} />
                </Typography>
              </div>
              <div className={classes.foodsearchbar}>
                <FoodSearchBar />
              </div>
            </div>

            <div ref={cardsRef}>
              <CardArea />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

function RestaurantPage() {
  const classes = styles();
  let { id } = useParams();

  let restaurant;
  for (const r of Restaurants) {
    if (r.restaurant_id == id) {
      restaurant = r;
      break;
    }
  }
  if (!restaurant) {
    return <Navigate to="/" />;
  }

  const descriptionLength = restaurant.description.length;
  const cardHeight = descriptionLength > 500 ? 75 : 60;

  return (
    <div className="App">
      <Background />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <NavBar />
          <div className={classes.restaurantbody}>
            <div className={classes.restaurantbodytext}>
              <Typography variant="h2">
                {`${restaurant.name} - ${restaurant.location.area}`}
              </Typography>
            </div>

            <Grid
              container
              spacing={5}
              alignItems="stretch"
              display="flex"
              height="100%"
              justifyContent="center"
            >
              <Grid item key={0}>
                <Card
                  sx={{
                    height: `${cardHeight}vh`,
                    maxWidth: `32vw`,
                    b: "10rem",
                    display: `flex`,
                  }}
                >
                  <CardActionArea
                    sx={{ display: `flex`, flexDirection: `column` }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={`${restaurant.cover_photo}`}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        color="text.secondary"
                        component="div"
                      >
                        {restaurant.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item key={1}>
                <Stack spacing={"2vh"}>
                  <Card
                    sx={{
                      height: `${cardHeight / 2 - 1}vh`,
                      maxWidth: "25.5rem",
                      b: "10rem",
                      display: `flex`,
                    }}
                  >
                    <CardActionArea
                      sx={{ display: `flex`, flexDirection: `column` }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          color="text.secondary"
                          component="div"
                        >
                          {restaurant.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  <Card
                    sx={{
                      height: `${cardHeight / 2 - 1}vh`,
                      maxWidth: "25.5rem",
                      b: "10rem",
                      display: `flex`,
                    }}
                  >
                    <CardActionArea
                      sx={{ display: `flex`, flexDirection: `column` }}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          color="text.secondary"
                          component="div"
                        >
                          {restaurant.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}
