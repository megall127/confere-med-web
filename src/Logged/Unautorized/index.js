import React from "react";
import styled from "styled-components";


const Body = styled.div`
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const TittleText = styled.text`
    font-size: 40px;
    font-weight: 600;
    color: red;
`

const SubTittle = styled.text`
    font-size: 20px;
    margin-bottom: 200px;

`


const UnautorizedPage = () => {

    

    return(
        <Body>
            <TittleText>Pagina não autorizada</TittleText>
            <SubTittle>Está página não esta autorizada para o seu usúario, você sera redirecionado!</SubTittle>
        </Body>
    )
}

export default UnautorizedPage;