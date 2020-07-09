import React, { useState } from 'react';
import './App.css';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup'

const initialValues = {
  name: '',
  location: '',
  company: '',
  account: '',
  comments: '',
  address: {
    city: '',
    state: ''
  },
  phNumbers: ['']
}

const savedValues = {
  name: 'Shakti Singh',
  location: 'Whitefield',
  company: 'TCS',
  account: 'USBank',
  comments: 'This is bank of US',
  address: {
    city: 'Bangalore',
    state: 'Karnataka'
  },
  phNumbers: ['8880350404', '8073618545']
}

const onSubmit = (values, onSubmitProps) => {
  console.log(values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required("Field is required!"),
  location: Yup.string().required("Field is required!"),
  company: Yup.string().required("Field is required!"),
  account: Yup.string().required("Field is required!")
})

function App() {

  const [formValues, setformValues] = useState(null)

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    // validateOnMount
    >
      {formik => {
        return (
          <div className="container col-md-6  p-4 shadow">
            <h2 className=" text-center">React Formik Form Example</h2>
            <Form>
              <div className="form-group ">
                <label htmlFor="name">Name</label>
                <div className="input-group mb-3">
                  <Field type="text" name="name" id="name"
                    className="form-control"
                  />
                </div>
                <ErrorMessage className="text-danger" name='name' component='div' />
              </div>
              <div className="form-group ">
                <label htmlFor="location">Location</label>
                <div className="input-group mb-3">
                  <Field type="text" name="location" id="location"
                    className="form-control" />
                </div>
                <ErrorMessage className="text-danger" name='location' component='div' />
              </div>
              <div className="form-group ">
                <label htmlFor="company">Company</label>
                <div className="input-group mb-3">
                  <Field type="text" name="company" id="company"
                    className="form-control" />
                </div>
                <ErrorMessage className="text-danger" name='company' component='div' />
              </div>
              <div className="form-group ">
                <label htmlFor="account">Account</label>
                <div className="input-group mb-3">
                  <Field type="text" name="account" id="account"
                    className="form-control" />
                </div>
                <ErrorMessage className="text-danger" name='account' component='div' />
              </div>
              <div className="form-group ">
                <label htmlFor="comments">Comments</label>
                <div className="input-group mb-3">
                  <Field as="textarea" type="text" name="comments" id="comments"
                    className="form-control" />
                </div>
              </div>
              <div className="form-group ">
                <label htmlFor="">Address</label>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <div className="input-group mb-3">
                    <Field type="text" name="address.city" id="city" className="form-control" />
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="state">State</label>
                  <div className="input-group mb-3">
                    <Field type="text" name="address.state" id="state" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="form-group ">
                <label htmlFor="account">Phone Number</label>
                <div className="input-group mb-3">
                  <FieldArray name="phNumbers">
                    {
                      (fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps;
                        const { values } = form;
                        const { phNumbers } = values;
                        return (
                          <div className="w-100">
                            {
                              phNumbers.map((item, index) => (
                                <div key={index} className="input-group" >
                                  <Field name={`phNumbers[${index}]`} className="form-control" />
                                  <div className="input-group-append">
                                    {
                                      index > 0 &&
                                      <button className="btn btn-outline-secondary" type="button" onClick={() => remove(index)}>-</button>
                                    }
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => push('')}>+</button>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )
                      }
                    }
                  </FieldArray>
                </div>
              </div>

              <button type="button" className="btn btn-success mr-3" onClick={() => setformValues(savedValues)}>Load Saved Data</button>
              <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="btn btn-success">Submit</button>
              <button type="reset" className="btn btn-primary">Reset</button>
            </Form>
          </div>
        )
      }}
    </Formik>
  );
}

export default App;
