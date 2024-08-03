"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import './Navbar.css'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import LocationPopup from '@/popups/location/LocationPopup'



const Navbar = () => {
    const [showLocationPopup, setShowLocationPopup] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<any>(null)
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

 

    const getuser = async () => {

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleLogout = async () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    window.location.href = "/auth/signin"
                }

            })
            .catch((error) => {
                console.log(error)
                window.location.href = "/auth/signin"

            })
    }

    const checkLogin = async () => {
        // let authToken = await getCookie('authToken')
        // let refreshToken = await getCookie('refreshToken')

        // console.log(authToken, refreshToken)
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                console.log(response)
                if(response.ok){
                    setLoggedIn(true)
                }
                else{
                    setLoggedIn(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setLoggedIn(false)
            })
    }

    React.useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js') 
        checkLogin()
        getuser()
    }, [])
    return <>

<div className="container-fluid bg-dark">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3  border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <div className="d-inline-flex link-body-emphasis text-decoration-none">
        <div className='left'>
                <Image src={logo} alt="logo" width={120} height={300}
                    onClick={() => window.location.href = "/"}
                />
                </div>
        </div>
      </div>

      <ul className="nav col-12 col-md-5 mb-2 justify-content-left mb-md-0">
      <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search ..." />
                </div>
      </ul>

      <div className="col-md-3 text-end">
        {/* <button type="button" className="btn btn-primary me-2">Login</button>
        <button type="button" className="btn btn-danger">Login</button> */}
         <div className='right'>
                <p className='dropdown'
                    onClick={() => setShowLocationPopup(true)}
                >
                    {user ? user.city : "Select City"}
                     <RiArrowDropDownFill className="dropicon" /></p>
               {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                     :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>

               }
                <Link href="/profile" className='linkstylenone'>
                    <BiUserCircle className='theme_icon1' />
                </Link>
                {
                showLocationPopup &&
                <LocationPopup
                    setShowLocationPopup={setShowLocationPopup}
                />
            }
            </div>
      </div>
    </header>
  </div>



        {/* <nav>
            <div className='left'>
                <Image src={logo} alt="logo" width={100} height={100}
                    onClick={() => window.location.href = "/"}
                />
                <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search For a Movie" />
                </div>
            </div>
            <div className='right'>
                <p className='dropdown'
                    onClick={() => setShowLocationPopup(true)}
                >
                    {user ? user.city : "Select City"}
                     <RiArrowDropDownFill className="dropicon" /></p>
               {
                     loggedIn ?
                     <button className='theme_btn1 linkstylenone' onClick={handleLogout}>Logout</button>
                     :
                        <Link href="/auth/signin" className='theme_btn1 linkstylenone'>
                            Login
                        </Link>

               }
                <Link href="/profile" className='linkstylenone'>
                    <BiUserCircle className='theme_icon1' />
                </Link>
            </div>
            {
                showLocationPopup &&
                <LocationPopup
                    setShowLocationPopup={setShowLocationPopup}
                />
            }
        </nav> */}
    </>
}

export default Navbar