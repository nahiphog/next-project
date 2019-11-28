/* Import package components */
import React from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: "#1589FF" } // This is just green.A700 as hex.
  }
});

export default function RatingInputForm({ userReview, setUserReview }) {
  const classes = useStyles();
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Rating */}
          <div style={{ position: "relative", bottom: "70px" }}>
            <Typography>
              Please rate and write to us below, Thank you!
            </Typography>
            <Rating
              name="customized-empty"
              value={userReview.rating}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              style={{ fontSize: "50px" }}
              onChange={(e, newValue) =>
                setUserReview({
                  rating: newValue,
                  recommend: userReview.recommend,
                  comment: userReview.comment
                })
              }
            />
          </div>
          {/* Feedback */}
          <TextField
            id="outlined-full-width"
            label="Feedback"
            style={{ margin: 8 }}
            placeholder="Feedback"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            type="text"
            value={userReview.comment}
            onChange={e =>
              setUserReview({
                rating: userReview.rating,
                recommend: userReview.recommend,
                comment: e.target.value
              })
            }
          />

          {/* Recommend */}
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              Would you recommend to your friend?
            </FormLabel>
            <RadioGroup
              aria-label="Recommend"
              name="recommend"
              value={userReview.recommend}
              onChange={e => {
                setUserReview({
                  rating: userReview.rating,
                  recommend: e.target.value,
                  comment: userReview.comment
                });
              }}
              color="secondary"
            >
              <FormControlLabel value="True" control={<Radio />} label="Yes" />
              <FormControlLabel value="False" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
