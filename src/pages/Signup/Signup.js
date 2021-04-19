import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

const RegisterForm = () => {
  const { REACT_APP_API_LOGIN } = process.env;
  // console.log({REACT_APP_API_LOGIN})
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const handleRegistration = (data) => console.log(data);
  const handleRegistration = (data) => axios.post(REACT_APP_API_LOGIN + "/register",
    data
  ).then(result => {
    if (result.status === 200) {
      // setAuthTokens(result.data);
      // setLoggedIn(true);
    } else {
      // setIsError(true);
    }
  }).catch(e => {
    // setIsError(true);
  });

  const handleError = (errors) => { };
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };
  return (
    <div className="container mt-4 col-md-2">
      <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
        <FormGroup className="mt-4">
          <Label>Name</Label>
          <Input name="name" {...register("name", registerOptions.name)} />
          <small className="text-danger">
            {errors.name && errors.name.message}
          </small>
        </FormGroup>
        <FormGroup className="mt-4">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            {...register("email", registerOptions.email)}
          />
          <small className="text-danger">
            {errors.email && errors.email.message}
          </small>
        </FormGroup>
        <FormGroup className="mt-4 mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            {...register("password", registerOptions.password)}
          />
          <small className="text-danger">
            {errors.password && errors.password.message}
          </small>
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
};
export default RegisterForm;