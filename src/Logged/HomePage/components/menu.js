import React from "react";
import styled from "styled-components";
import logo from "../../../assets/img/logo.png"

const Body = styled.div`
    height: 100%;
    background-color: #085769;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ButtonMenu = styled.button`
    height: 50px;
    width: 291.38px;
    margin-bottom: 43px;
    border-radius: 30px;
    border: 3px solid white;
    background-color: transparent;
    color: white;
    font-weight: 900;
    font-size: 18px;
    margin-left: 20px;
    margin-right: 20px;

    :hover{
        background-color: white;
        color: #085769;
    }
`

const ImgLogo = styled.img`
    width: 134px;
    height: 123px;
    margin-top: 70px;
    margin-bottom: 135px;
`

const Menu = ({selectPage, setSelectPage}) => {


    return(
        <Body>
            <ImgLogo src={logo}></ImgLogo>
            <ButtonMenu onClick={() => setSelectPage(0)}>MÉDICOS CADASTRADOS</ButtonMenu>
            <ButtonMenu onClick={() => setSelectPage(1)}>CADASTRAR MÉDICO</ButtonMenu>
            <ButtonMenu onClick={() => setSelectPage(2)}>CADASTRAR CLÍNICAS</ButtonMenu>
            <ButtonMenu onClick={() => setSelectPage(3)} style={{fontSize: 16}}>CADASTRAR PROCEDIMENTOS</ButtonMenu>
            <ButtonMenu>GRÁFICOS</ButtonMenu>
        </Body>
    )
}

export default Menu;