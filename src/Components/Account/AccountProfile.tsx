import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { RootState } from '../../store/rootReducer';
import { setUserPhoto } from '../../store/authReducer';

const useStyles = makeStyles(() => createStyles(
  {
    input: {
      display: 'none',
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
));

const AccountProfile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isTranslated, isButtonsShowed } = useSelector((state: RootState) => state.settings);
  const { isFetchingPhoto, userPhoto } = useSelector((state: RootState) => state.auth);
  const { name, userId } = useSelector((state: RootState) => state.auth);

  const onUserPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(setUserPhoto(e.target.files[0], isTranslated, isButtonsShowed, userId));
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={userPhoto || undefined}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions className={classes.card}>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            disabled={isFetchingPhoto}
            onChange={onUserPhotoSelected}
          />
          <LoadingButton
            color="primary"
            component="span"
            fullWidth
            variant="text"
            disabled={isFetchingPhoto}
            pending={isFetchingPhoto}
          >
            Загрузить фото
          </LoadingButton>
        </label>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
