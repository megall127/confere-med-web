import styled from "styled-components";


export const Body = styled.div`
    height: 100vh;
    width: 100%;   
    background-color: #F3F0F0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const CardLogin = styled.div`
    height: 585px;
    width: 941px;
    background-color: white;
    display: flex;
    flex-direction: row;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`

export const BoxBlue = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #085769;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;

`
export const IconLogo = styled.img`
    height: 104px;   
    margin-top: 96px;

`

export const TittleBoxBlue = styled.text`
    text-align: left;
    font-weight: 900;
    color: white;
    font-size: 24px;
    margin-top: 50px;
    width: 200px;
    margin-left: 20px;
`

export const SubTextBoxBlue = styled.text`
    font-size: 14px;
    color: white;
    text-align: left;
    width: 200px;
    margin-top: 20px;
    margin-left: 20px;
    line-height: 0px;

`

export const BoxLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

`
export const InputLogin = styled.div`
    width: 484px;
    height: 60px;
    background-color: #F3F0F0;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

`

export const ButtonLogin = styled.button`
    width: 277px;
    height: 48px;
    background-color: #085769;
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
export const ButtonForget = styled.button`
    border: none;
    color: #085769;
    background-color: white;
    margin-bottom: 50px;
    text-decoration: underline;
    cursor: pointer;
    :hover{
        color: blue;

    }
`

export const InputInvisible = styled.input`
    border: none;
    background-color: transparent;
    height: 90%;
    width: 70%;
    font-size: 14px;
`

export const IconLogin = styled.img`
    height: 22px;
    width: 20px;
    margin-left: 20px;
    margin-right: 20px;
`