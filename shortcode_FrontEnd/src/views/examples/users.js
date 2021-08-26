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
import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    DropdownMenu,
    DropdownItem,
    Media,
    UncontrolledDropdown, DropdownToggle,
} from "reactstrap";
import {} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import Swal from "sweetalert2";

const Users = () => {
        const [users, setUsers] = useState([]);
        const UpdateUserPermission = ({id}, p) => {
            fetch('/api/user/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    id: id,
                    p: p
                })
            }).then(async (d) => {
                    d = await d.json();
                    if (d.success) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'updated...',
                            text: 'Done!',
                        })
                        if (d.users) {
                            setUsers(d.users);
                        }
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Ops...',
                            text: 'something going wrong!',
                        })

                    }

                }
            )
        }
        useEffect(() => {


            fetch('/api/isLog', {
                credentials: 'same-origin'
            }).then(async (d) => {
                    d = (await d.json())
                    if (d.users) {
                        setUsers(d.users);
                    }
                    if (!d.id) {
                        window.location.assign('/auth/login');
                    }

                }
            )
        }, []);

        return (
            <div className={"pb-8 pt-5 pt-lg-8 "}>
                {/* Page content */}
                <Container className="" fluid>
                    <Row>
                        {users.map((d, i) => {
                            return <Col className="order-xl-2 mb-5 mb-xl-0 mt-5" xl="12">
                                <Row>
                                    <Col>{d.f_name + " " + d.l_name}</Col>
                                    <Col style={{
                                        textAlign: 'right'
                                    }}>
                                        <UncontrolledDropdown>
                                            <DropdownToggle className="pr-0" style={{
                                                boxShadow: 'none'
                                            }}>
                                                <Media className="align-items-center">

                                                    <Media className="ml-2 d-block d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold btn btn-warning" id={'user_title'} style={{
                        minWidth: 200
                    }}>
                        {d.role}
                    </span>
                                                    </Media>
                                                </Media>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem className="noti-title" header tag="div">
                                                    <h6 className="text-overflow m-0">Choose special user!</h6>
                                                </DropdownItem>

                                                <DropdownItem href="#pablo" onClick={(e) => {
                                                    UpdateUserPermission(d, 'admin')
                                                }
                                                }>
                                                    <i className="ni ni-user-run"/>
                                                    <span>admin</span>
                                                </DropdownItem>
                                                <DropdownItem href="#pablo" onClick={(e) => {
                                                    UpdateUserPermission(d, 'superuser')

                                                }
                                                }>
                                                    <i className="ni ni-user-run"/>
                                                    <span>superuser</span>
                                                </DropdownItem>
                                                <DropdownItem href="#pablo" onClick={(e) => {
                                                    UpdateUserPermission(d, 'user')

                                                }
                                                }>
                                                    <i className="ni ni-user-run"/>
                                                    <span>user</span>
                                                </DropdownItem>

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Col>
                                </Row>
                            </Col>
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
;

export default Users;
