import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { login } from '../store/authReducer';

type FormValues = {
  email: string
  password: string
};

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  const submit = (data: FormValues) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Login | RsLang</title>
      </Helmet>
      <Box>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={submit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Войти
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Введите ваш email и пароль
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
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
                <Box>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Войти
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Нет аккаунта?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Зарегистрироваться
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
