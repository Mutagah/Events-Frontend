import 'antd/dist/antd.css'; 
import '../styles/globals.css';
import "../styles/login.css";
import {useEffect,useState} from "react";
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {

  return( 
    <>
    <Navbar/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
