/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import Swal from "sweetalert2";
import $ from 'jquery';


const Register = () => {
    const [fName, setFName] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const RegisterANewUser = () => {

        if (!fName || !lName || !email || !password || !repassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'complete the info and, please try again!',
            })
            return;
        }

        if (password !== repassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'password not same, please try again!',
            })
            return;

        }

        fetch('/api/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',

            body: JSON.stringify({
                fname: fName,
                lname: lName,
                email: email,
                password: password
            })
        }).then(async (d) => {
            d = await d.json();
            if (d.success) {
                window.location.assign('/auth/login')
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something going wrong!',
                })
            }

        })

    }
    return (
        <>
            <Col lg="6" md="8">
                <Card className=" shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="First name" onChange={(d) => {
                                        setFName(d.target.value)
                                    }} name={'f_name'} type="text"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Last name" name={'l_name'} onChange={(d) => {
                                        setLname(d.target.value)
                                    }} type="text"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        name={'email'}
                                        onChange={(d) => {
                                            setEmail(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        name={'password'}
                                        autoComplete="new-password"
                                        onChange={(d) => {
                                            setPassword(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        name={'repassword'}
                                        placeholder="Confirm Password"
                                        type="password"
                                        autoComplete="new-password"
                                        onChange={(d) => {
                                            setRepassword(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>


                            <div className="text-center">
                                <Button className="mt-4" color="primary" onClick={RegisterANewUser} type="button">
                                    Create account
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Register;
