import React, { useEffect, useState } from "react";
import * as S from "./styled";
import logo from "../../assets/img/logo.png";
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PuffLoader } from "react-spinners";
import api from "../../service/api";
import toast, { Toaster } from 'react-hot-toast';

const RegisterClinic = () => {
    const [value, setValue] = useState()
    const [loading, setLoading] = useState(false);

    const [objClinic, setObjClinic] = useState({
        name: '',
        local: ''
    })


    const notifySucess = () => toast.success('Clínica cadastrado com sucesso.');

    const notifyErro = () => toast.error('Informações incorretas, verifique e tente novamente.');


    const registerClinic = () => {
        api.post('/registerclinic', objClinic)
        .then((res) => {
            console.log(res)
            notifySucess()
            setObjClinic({
                name: '',
                local: ''
            })
        })
        .catch((err) => {
            console.log(err)
            notifyErro()
        })
    }


    return(
        <S.Body>
             <Toaster/>
            <div style={{position: "absolute", top: 300}}>
            <PuffLoader color="#085769" loading={loading}  size={150}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <S.IconLogoTittle src={logo}/>
            <div style={{display: "flex", flexDirection: "column"}}>
            <S.TittlePage>CADASTRAR CLÍNICAS</S.TittlePage>
            </div>
            </div>
            <S.CardRegister>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 35, marginBottom: 35}}>
                <S.CardTittle>Nome da Clínica</S.CardTittle>
                <S.CardInput>
                    <S.CardInputValue value={objClinic.name} onChange={(e) => setObjClinic(prevState => ({...prevState, name: e.target.value}))}></S.CardInputValue> 
                </S.CardInput>

                <S.CardTittle style={{marginTop: 5}}>Endereço da Clínica</S.CardTittle>
                <S.CardInput>
                    <S.CardInputValue value={objClinic.local} onChange={(e) => setObjClinic(prevState => ({...prevState, local: e.target.value}))}></S.CardInputValue>  
                </S.CardInput>

                </div>
            </S.CardRegister>
            <S.ButtonLogin onClick={()=> registerClinic()} >Cadastrar</S.ButtonLogin>
        </S.Body>
    )
}

export default RegisterClinic;