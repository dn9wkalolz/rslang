import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Container,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/authReducer';
import { RootState } from '../store/rootReducer';

type FormValues = {
  name: string
  email: string
  password: string
};

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, isRegister } = useSelector((state: RootState) => state.auth);

  const submit = (data: FormValues) => {
    const { email, password, name } = data;
    dispatch(createUser(email, password, name));
  };

  if (isRegister) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="registration">
      <Helmet>
        <title>Register | RsLang</title>
      </Helmet>
      <Box>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              password: '',
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Введите валидный email').max(255).required('Введите email'),
                name: Yup.string().max(255).required('Введите имя'),
                password: Yup
                  .string()
                  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Пароль должен содержать 8 символов, один в верхнем регистре, один в нижнем регистре, одно число и один специальный символ.')
                  .max(255)
                  .min(8)
                  .required('Введите пароль'),
              })
            }
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
                    Создать новый аккаунт
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Используйте свою электронную почту, чтобы создать новую учетную запись
                  </Typography>
                </Box>
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
                  <LoadingButton
                    color="primary"
                    disabled={isSubmitting}
                    pending={isFetching}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Зарегистрироваться
                  </LoadingButton>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Уже есть аккаунт?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Войти
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </main>
  );
};

export default Register;
