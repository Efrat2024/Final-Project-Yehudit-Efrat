import React, { useEffect, useState, useRef } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../../css/components-of-css-temlate/Typography';
import AppForm from './AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../../css/components-of-form/RFTextFeild';
import FormButton from '../../css/components-of-form/FormButton';
import FormFeedback from '../../css/components-of-form/FormFeedback';
import SignUp from './SignUp';
import { useLoginMutation } from '../../../Store/Slices/authApiSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setToken } from "../../../Store/Slices/authSlice";
import { useDispatch } from 'react-redux';

function SignIn() {
 const [submitting, setSubmitting] = useState(false);
 const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation();
 

// const navigate = useNavigate();

 const validate = values => {
   const errors = required(['email', 'password'], values);
 
  if (!errors.email) {
    const emailError = email(values.email);
    if (emailError) {
      errors.email = emailError;
    }
  }

  return errors;
};
const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
        alert(error.error+"השם או הסיסמא אינם נכונים")
    }

}, [isError])
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data))
      if(data.status==2)
      {
              navigate("/Enter")
      }
              
      else
      {
          navigate("/homemanage")
      }
      window.location.reload(false)
    }
}, [isSuccess])

  const logister = useRef({

      password: "",

      identity: ""

  })

  const handleSubmit = async(formData) => {
    // debugger;
    const y=formData
    await  login(formData)
  };



  return (
    <React.Fragment>
      

      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center" style={{ color: '#28282a' }}>
          לכניסה
        </Typography>
        <Typography variant="body2" align="center" style={{ color: '#28282a' }}>
          {'עדיין לא חבר? '}
          <Link href="/signUp" align="center" underline="always">
          אתה לא רשום?  להכנס
          </Link>
        </Typography>
        <Routes>
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate} className="login-page-form"
        >
          {({ handleSubmit }) => (
            <Box component="form" noValidate sx={{ mt: 6 }} onSubmit={handleSubmit}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"


              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
                style={{ color: '#28282a', backgroundColor: '#ff3366' }}
              >
                {submitting ? 'בתהליך כניסה...' : 'להכנס'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
         
        </Typography>
      </AppForm>
     
    </React.Fragment>
  );
}

export default SignIn;
