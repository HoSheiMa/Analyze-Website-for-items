/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Input,
    InputGroup,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container,
    Modal,
    NavbarToggler,
    ModalHeader,
} from "reactstrap";

function AdminNavbar(props) {
    const [collapseOpen, setcollapseOpen] = React.useState(false);
    const [cartItems, setCartItems] = React.useState(0);

    const [modalSearch, setmodalSearch] = React.useState(false);
    const [color, setcolor] = React.useState("navbar-transparent");
    React.useEffect(() => {
        window.addEventListener("resize", updateColor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener("resize", updateColor);
        };
    });
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    const updateColor = () => {
        if (window.innerWidth < 993 && collapseOpen) {
            setcolor("bg-white");
        } else {
            setcolor("navbar-transparent");
        }
    };
    // this function opens and closes the collapse on small devices
    const toggleCollapse = () => {
        if (collapseOpen) {
            setcolor("navbar-transparent");
        } else {
            setcolor("bg-white");
        }
        setcollapseOpen(!collapseOpen);
    };
    // this function is to open the Search modal
    // const toggleModalSearch = () => {
    //   setmodalSearch(!modalSearch);
    // };

    setInterval(() => {
        let cart = localStorage.getItem('cart');

        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = [];
        }

        setCartItems(cart ? cart.length : 0)


    }, 100)

    return (
        <>
            <Navbar className={classNames("navbar-absolute", color)} expand="lg">
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div
                            className={classNames("navbar-toggle d-inline", {
                                toggled: props.sidebarOpened,
                            })}
                        >
                            <NavbarToggler onClick={props.toggleSidebar}>
                                <span className="navbar-toggler-bar bar1"/>
                                <span className="navbar-toggler-bar bar2"/>
                                <span className="navbar-toggler-bar bar3"/>
                            </NavbarToggler>
                        </div>
                        <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                            {props.brandText}
                        </NavbarBrand>
                    </div>
                    <NavbarToggler onClick={toggleCollapse}>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                    </NavbarToggler>
                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>
                            <InputGroup className="search-bar">
                                <Button color="link" onClick={() => {
                                    console.log(window.toggleModalSearch())
                                }}>
                                    <i className="tim-icons icon-zoom-split"/>
                                    <span className="d-lg-none d-md-block">Search</span>
                                </Button>
                            </InputGroup>
                            <InputGroup className="search-bar">
				<span style={{
                    position: "absolute",
                    backgroundColor: "red",
                    padding: 2,
                    borderRadius: "50%",
                    fontSize: 10,
                    width: 20,
                    textAlign: "center",
                    top: -5,
                    left: 25
                }}>{cartItems}</span>
                                <Button color="link" onClick={() => window.location.assign('/admin/cart')}>

                                    <i className="tim-icons icon-cart"/>
                                    <span className="d-lg-none d-md-block">Cart</span>
                                </Button>
                            </InputGroup>

                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    nav
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <div className="photo">
                                        <img
                                            alt="..."
                                            src={require("assets/img/anime3.png").default}
                                        />
                                    </div>
                                    <b className="caret d-none d-lg-block d-xl-block"/>
                                    <p className="d-lg-none">Log out</p>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-navbar" right tag="ul">

                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item" onClick={(e) => {
                                            fetch('/api/user/logout', {
                                                credentials: 'same-origin'
                                            }).then(async (d) => {
                                                d = (await d.json())
                                                localStorage.setItem('cart', '[]');

                                                window.location.assign('/auth/login');
                                            })
                                            e.preventDefault()
                                        }}>Log out</DropdownItem>
                                    </NavLink>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <li className="separator d-lg-none"/>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default AdminNavbar;
