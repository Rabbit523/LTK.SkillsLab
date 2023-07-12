import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const MyInput = ({ field, form, ...props }) => {
  return <TextField {...field} {...props} fullWidth sx={{ padding: 2 }} />;
};

const BasicForm = () => {
  const dispatch = useDispatch();

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        Add TODO
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={(values, { resetForm }) => {
          const id = uuidv4();
          dispatch({ type: "ADD_TODO", payload: { ...values, id }});
          resetForm();
        }}
      >
        <Form>
          <Grid container>
            <Field
              component={MyInput}
              name="firstName"
              placeholder="First Name"
            />
            <Field
              component={MyInput}
              name="lastName"
              placeholder="Last Name"
            />
            <Field component={MyInput} name="email" placeholder="Email" />
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              type="submit"
              sx={{ p: 2, m: 2 }}
            >
              Add
            </Button>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default BasicForm;
