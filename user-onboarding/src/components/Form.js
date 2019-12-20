import React, { useState, useEffect } from "react";
import { Formik, Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm( { values, errors, touched, status } ) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(user => [...user, status])
    }, [status]);

    return(
        <div className = "form-class">
        <Form>
            <label htmlFor = "name">Name</label>
            <Field 
            name = "name"
            id = "name"
            type = "text"
            />
            {touched.name && errors.name ? (
                <div>{errors.name}</div>
            ): null}

            <label htmlFor = "email">Email</label>
            <Field 
            name = "email"
            id = "email"
            type = "text"
            />
            {touched.email && errors.email ? (
                <div>{errors.email}</div>
            ): null}

            <label htmlFor = "password">Password</label>
            <Field 
            name = "password"
            id = "password"
            type = "text"
            />
            {touched.password && errors.password ? (
                <div>{errors.password}</div>
            ): null}

            <label htmlFor = "ToS">Terms of Service
            <Field 
            name = "ToS"
            id = "ToS"
            type = "checkbox"
            />
            {touched.ToS && errors.ToS ? (
                <div>{errors.ToS}</div>
            ): null}
            </label>

            <button type = "submit">Register!</button>

        </Form>

        {user.map(user => (
            <ul key = {user.id}>
                <li>Name : {user.name}</li>
                <li>Email : {user.email}</li>
                <li>Password : {user.password}</li>
            </ul>
        ))}
        </div>
);
};

const FormikUserForm = withFormik({
    mapPropsToValues( { name, email, password, ToS} ){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            ToS: ToS || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Custom?"),
        email: Yup.string().required("Custom"),
        password: Yup.string().required("Is Required"),
        ToS: Yup.boolean().oneOf([true], "Must agree")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios.post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("success", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err.responde));
    }

})(UserForm)

export default FormikUserForm