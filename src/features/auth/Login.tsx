import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {selectorIsLoggedIn} from './selectors';
import {useTypedDispatch} from 'hooks/useTypedDispatch';
import {useTypedSelector} from 'hooks/useTypedSelector';
import {appActions} from 'app';
import {useActions} from 'hooks/useActions';
import {authActions} from 'features/auth';

type ErrorsType = {
    email?: string
    password?: string
}
type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    const dispatch = useTypedDispatch()
    const {login} = useActions(authActions)
    const {setStatus} = useActions(appActions)
    const isLoggedIn = useTypedSelector(selectorIsLoggedIn)

    setStatus({status: 'idle'})

    const formik = useFormik({
        validate: (values) => {
            const errors: ErrorsType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Field should be 3 symbols or more'
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }

        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>

    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                disabled={!!formik.errors.email || !!formik.errors.password}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}