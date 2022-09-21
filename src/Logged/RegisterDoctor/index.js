import React, {  useState } from "react";
import * as S from "./styled";
import logo from "../../assets/img/logo.png";
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PuffLoader } from "react-spinners";
import api from "../../service/api";
import toast, { Toaster } from 'react-hot-toast';

const RegisterDoctor = () => {
    const [value, setValue] = useState()
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        tell: "",
        crm: "",
        cidade: "",
        cpf: "",
        especialit: "",
        aux: 0
    })
    const [loading, setLoading] = useState(false);


    const notifySucess = () => toast.success('Medico cadastrado com sucesso.');

    const notifyErro = () => toast.error('Informações incorretas, verifique e tente novamente.');


    const checkAnswer = () => {
        if(value === "sim"){
            return(
                <>
                <div style={{display: 'flex', flexDirection: "column", marginLeft: 40, marginBottom: 20}}>
                <S.CardTittle style={{marginTop: 5}}>Quantos?</S.CardTittle>
                <S.CardInput  style={{width: 296}}>
                <S.CardInputValue value={user.aux} onChange={(e) => setUser(prevState => ({...prevState, aux: e.target.valueAsNumber}))} type="number" style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                </>
            )
        } else {
            return(
                <>
                </>
            )
        }
    }

    const handleRegister = () => {
        setLoading(true)
        console.log(user)
        api.post('/register', user)
        .then((res) => {
            console.log(res.data)
            setLoading(false)
            notifySucess()
            setUser({
                email: "",
                password: "conferedMed123",
                name: "",
                tell: "",
                crm: "",
                cidade: "",
                cpf: "",
                especialit: "",
                aux: ""
            })
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
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
            <S.TittlePage>CADASTRAR MÉDICO</S.TittlePage>
            <S.SubTittlePage>Preencha os campos com seus dados</S.SubTittlePage>
            </div>
            </div>
            <S.CardRegister>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 35}}>
                <S.CardTittle>Nome</S.CardTittle>
                <S.CardInput>
                    <S.CardInputValue type='text' value={user.name} onChange={(e) => setUser(prevState => ({...prevState, name: e.target.value}))}></S.CardInputValue> 
                </S.CardInput>
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>E-mail</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.CardInputValue value={user.email} onChange={(e) => setUser(prevState => ({...prevState, email: e.target.value}))} style={{width: 300}}></S.CardInputValue>     
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 22}}>
                <S.CardTittle>Telefone</S.CardTittle>
                <S.CardInput style={{width: 296}}>
                <S.CardInputValue type='tel' value={user.tell} onChange={(e) => setUser(prevState => ({...prevState, tell: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>CRM</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.CardInputValue value={user.crm} onChange={(e) => setUser(prevState => ({...prevState, crm: e.target.value}))}  style={{width: 300}}></S.CardInputValue>     
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 22}}>
                <S.CardTittle>UF</S.CardTittle>
                <S.CardInput style={{width: 296}}>
                <S.CardInputValue value={user.cidade} onChange={(e) => setUser(prevState => ({...prevState, cidade: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>CPF</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.CardInputValue value={user.cpf} onChange={(e) => setUser(prevState => ({...prevState, cpf: e.target.value}))} style={{width: 300}}></S.CardInputValue>     
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 22}}>
                <S.CardTittle >Especialidade</S.CardTittle>
                <S.CardInput style={{width: 296}}>
                <S.CardInputValue value={user.especialit} onChange={(e) => setUser(prevState => ({...prevState, especialit: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", width: 630 }}>
                <div style={{display: 'flex', flexDirection: "column", marginBottom: 20}}>
                <S.CardTittle style={{marginTop: 11, marginBottom: 11}}>Possui Auxiliar?</S.CardTittle>
                <div style={{display: "flex", width: 300}}>
                <div>
                <RadioButton  value="sim" name="sim" onChange={(e) => setValue(e.value)} checked={value === 'sim'} />
                <text style={{marginLeft: 15}}>SIM</text>
                </div>
                <div  style={{marginLeft: 26}}>
                <RadioButton style={{}} value="nao" name="nao" onChange={(e) => setValue(e.value)} checked={value === 'nao'} />
                <text  style={{marginLeft: 15}}>NÃO</text>
                </div>
                </div>
                </div>
                {checkAnswer()}
                </div>
                
            </S.CardRegister>
            <S.ButtonLogin onClick={() => handleRegister()}>Cadastrar</S.ButtonLogin>
        </S.Body>
    )
}

export default RegisterDoctor;