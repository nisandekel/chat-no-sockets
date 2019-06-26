import React from 'react';
import './Banner.css';

const Banner = (props)=>{

    const bannerClass = props.color===0 ? "warning" : "success"; 

    return (
        !props.isDisplayed ? null : (
            <div className={bannerClass +" banner"}>{props.msg}</div>
        )  
    );
}

export default Banner;