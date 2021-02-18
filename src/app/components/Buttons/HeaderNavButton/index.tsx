import React from 'react'
import Style from "./style.module.css"
import { Link } from 'react-router-dom'

interface ButtonProps {
  text: string;
  linkTo: string;
};

export const HeaderNavButton = ({ text, linkTo }: ButtonProps) => {
  return <Link to={linkTo} type="button" className={`${Style.buttonStyle} link`}>{text}</Link>
};

