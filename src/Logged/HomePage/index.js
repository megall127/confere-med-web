import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import RegisterClinic from "../RegisterClinic";
import RegisterDoctor from "../RegisterDoctor";
import RegisterProc from "../RegisterProc";
import AllDoctors from "../AllDoctors";
import Menu from "./components/menu";
import * as S from "./styled";




const HomePage = () => {

    const [selectPage, setSelectPage] = useState(0)


    const navigation = useNavigate()

    const handleSelectPage = () => {
        if(selectPage === 0){
            return(
                <AllDoctors/>
            )
        } else if(selectPage === 1){
            return(
                <RegisterDoctor/>
            )
        } else if(selectPage === 2) {
            return(
                <RegisterClinic/>
            )
        } else if(selectPage === 3) {
            return(
                <RegisterProc/>
            )
        } else {
            return(
                <></>
            )
        }

    }

    const auth = () => {
        api.get('/checkroute')
        .then(() => {
            
        })
        .catch(() => {
             navigation('/unatorized')
             setTimeout(() => {
                navigation('/')
             }, 5000)
        })
     }

    useEffect(() => {
        auth()
    },[])
    

    return(
        <>
                <S.Body>
                    <Menu 
                    selectPage={selectPage}
                    setSelectPage={setSelectPage}
                    />
                    {handleSelectPage()}
                </S.Body>
        </>
    )
}

export default HomePage;