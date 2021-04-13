import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/authReducer';
import { RootState } from '../../store/rootReducer';

type FormValues = {
  name: string | null
  email: string | null
  password: string | null
};

const AccountProfileDetails = () => {
  const dispatch = useDispatch();
  const { userId, isFetching } = useSelector((state: RootState) => state.auth);

  const submit = (data: FormValues) => {
    const { email, password, name } = data;
    dispatch(updateUser(userId, name, email, password));
  };

  const { name, email, password } = useSelector((state: RootState) => state.auth);

  return (
    <Formik
      initialValues={{
        email: email || '',
        name: name || '',
        password: password || '',
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          name: Yup.string().max(255).required('Name is required'),
          password: Yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character')
            .max(255)
            .min(8)
            .required('password is required'),
        })
      }
      onSubmit={submit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="Информацию можно редактировать"
              title="Ваш профиль"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <LoadingButton
                color="primary"
                variant="contained"
                disabled={isFetching}
                pending={isFetching}
                type="submit"
              >
                Сохранить
              </LoadingButton>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AccountProfileDetails;
