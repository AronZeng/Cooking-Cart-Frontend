import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { login } from '../api/auth';
import AuthContext from '../context/AuthContext';
import cookies from 'js-cookie';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <h1>Please Login</h1>
          <p>{user?.username}</p>
        </Col>
      </Row>
      <Formik
        initialValues={{ username: '', password: '' }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          login(values.username, values.password)
            .then((res) => {
              console.log(res);
              setUser({
                username: res.data.data.user.username,
                token: res.data.data.token,
              });
              cookies.set('user', {
                username: res.data.data.user.username,
                token: res.data.data.token,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col span={12} offset={6}>
                <input
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={6}>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={6}>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
