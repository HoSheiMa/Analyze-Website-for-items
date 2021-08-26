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

const Forget = () => {

    const [email, setEmail] = useState('');
    const [disableEmail, setDisableEmail] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [repassword, setRepassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const next = () => {
        setDisableEmail(true)
        if (showCodeInput) {
            if (password !== repassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'passwords not equal!',
                })

            }
            setLoading(true);
            // send new password
            fetch('/api/user/checkforgetkey', {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'post',
                body: JSON.stringify({
                    key: code,
                    password: password,
                }),

                credentials: 'same-origin',

            }).then(async (d) => {
                d = await d.json();
                if (d.success) {
                    window.location.assign('/auth/login');
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }

            })

        } else {
            fetch('/api/user/forget?to=' + email, {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'same-origin',

            }).then(async (d) => {
                d = await d.json();
                if (d.success) {
                    setShowCodeInput(true)
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }

            })
        }


    }
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        disabled={disableEmail}
                                        onChange={(d) => {
                                            setEmail(d.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {showCodeInput ? <div><FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Code"
                                        type="text"
                                        autoComplete="new-password"
                                        onChange={(d) => {
                                            setCode(d.target.value);
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
                                            placeholder="password"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={(d) => {
                                                setPassword(d.target.value);
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
                                            placeholder="confirm password"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={(d) => {
                                                setRepassword(d.target.value);
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup></div> : <div/>}

                            <div className="text-center">
                                <Button onClick={next} className="my-4" color="primary" type="button">
                                    {loading ? "Loading" : "Finish"}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Forget;
