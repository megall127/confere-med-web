import styled from "styled-components";



export const Body = styled.div`
    height: 100%;
    width: 100%;
    background-color: #F3F0F0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TittlePage = styled.text`
    font-size: 36px;
    font-weight: 900;
    color: #085769;

`

export const SubTittlePage = styled.text`
    font-size: 24px;
    color: #74797A;

`

export const IconLogoTittle = styled.img`
    width: 73px;
    height: 67px;
    margin-right: 43px;

`

export const CardRegister = styled.div`
    width: 753px;
    background-color: white;
    margin-top: 94px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CardInput = styled.div`
    border: 1px solid #c4c4c4;
    width: 636px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    


`
export const CardTittle = styled.text`
    text-align: start;
    font-size: 20px;
    font-weight: 500;

`

export const CardInputValue = styled.input`
    border: none;
    height: 37px;
    width: 610px;
    margin-left: 5px;
    :focus{
        outline: none;
    }
`

export const ButtonLogin = styled.button`
    width: 277px;
    height: 48px;
    background-color: #085769;
    margin-top: 63px;
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    :hover{
        background-color: #c4c4c4;
        color: #085769;
    }


`