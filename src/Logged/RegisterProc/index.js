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
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

const RegisterProc = () => {
    const [value, setValue] = useState()
    const [clinics, setClinics] = useState([])
    const [allDocs, setallDocs] = useState([])
    const [dateproc, setDateProc] = useState(new Date())
    const [selectDoc, setSelectDoc] = useState({name: 'Selecione'})
    const [selectClinic, setSelectClinic] = useState({})
    const [proc, setProc] = useState({
        id: '',
        clinica: '',
        convenio: '',
        nome_paciente: '',
        nome_proc: '',
        valor_repasse: null,
        quantidade: '',
        date_proc: null,
        stats_proc: 1,
        stats_pay: 1,
        valor_auxiliar: null,
        valor_proc: null,
    })

    const [loading, setLoading] = useState(false);


    const notifySucess = () => toast.success('Procedimento cadastrado com sucesso.');

    const notifyErro = () => toast.error('Informações incorretas, verifique e tente novamente.');


    const handleTakeAll= () => {
        api.get('/getallclinics')
        .then((res) => {
            setClinics(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handleAllDocs = () => {
        api.get("/getalldoctors")
        .then((res) => {
            setallDocs(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const handleRegisterProc = () => {
        api.post('/proc', proc)
        .then((res) => {
            console.log(res.data)
            notifySucess()
            setProc({
                id: '',
                clinica: '',
                convenio: '',
                nome_paciente: '',
                nome_proc: '',
                valor_repasse: null,
                quantidade: '',
                date_proc: null,
                stats_proc: 1,
                stats_pay: 1,
                valor_auxiliar: null,
                valor_proc: null,
            })
        })
        .catch((err) => {
            console.log(err)
            notifyErro()
        })
    }

    useEffect(() => {
        handleAllDocs()
    },[])

    useEffect(() => {
        setProc(prevState => ({...prevState, id: selectDoc}))
    },[selectDoc])

    useEffect(() => {
        const newDate = dateproc.toISOString().slice(0, 10)
        setProc(prevState => ({...prevState, date_proc: newDate}))
    },[dateproc])


    useEffect(() =>{
        const newDate = dateproc
        const day = 86400000
        const fiveDaysAgo = new Date(newDate - (5*day))
        console.log(fiveDaysAgo)
    },[dateproc])

    useEffect(() => {
        setProc(prevState => ({...prevState, clinica: selectClinic}))
    },[selectClinic])
    
    useEffect(() => {
        handleTakeAll()
    },[])

    return(
        <S.Body>
             <Toaster/>
            <div style={{position: "absolute", top: 300}}>
            <PuffLoader color="#085769" loading={loading}  size={150}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <S.IconLogoTittle src={logo}/>
            <div style={{display: "flex", flexDirection: "column"}}>
            <S.TittlePage>CADASTRAR PROCEDIMENTOS</S.TittlePage>
            </div>
            </div>
            <S.CardRegister>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 35}}>
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column"}}>
                <S.CardTittle >Medico</S.CardTittle>
                <S.CardInput style={{width: 296}}>
                <S.SelectCard value={selectDoc.name} onChange={(e)=> setSelectDoc(e.target.value)} >
                        <option >Selecione</option>
                    {allDocs.map((itens) => {   
                        return(
                            <option value={itens.id}>{itens.name}</option>
                        )
                    })}
                </S.SelectCard>
                </S.CardInput>
                </div>
                <div style={{display: "flex", flexDirection: 'column', marginLeft: 45}}>
                <S.CardTittle >Valor do Procedimento</S.CardTittle>
                <InputNumber format={true} placeholder="R$" mode="decimal" locale="en-US" minFractionDigits={2} size={30} value={proc.valor_proc} onValueChange={(e) => setProc(prevState => ({...prevState, valor_proc: e.target.value}))}></InputNumber>
                </div> 
                </div>
       
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>Nome da Clínica</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.SelectCard value={selectClinic.name} onChange={(e) => setSelectClinic(e.target.value)} >
                <option >Selecione</option>
                    {clinics.map((itens) => {
                        return(
                            <option  value={itens.name}>{itens.name}</option>
                        )
                    })}
                    
                </S.SelectCard>
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 22}}>
                <S.CardTittle >Convênio</S.CardTittle>
                <S.CardInput style={{width: 296}}>
                <S.CardInputValue value={proc.convenio} onChange={(e) => setProc(prevState => ({...prevState, convenio: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row"}}>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>Nome do paciente</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.CardInputValue value={proc.nome_paciente} onChange={(e) => setProc(prevState => ({...prevState, nome_paciente: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 22}}>
                <S.CardTittle >Valor do repasse</S.CardTittle>
                <InputNumber placeholder="R$" mode="decimal" locale="en-US" minFractionDigits={2} size={30} value={proc.valor_repasse} onValueChange={(e) => setProc(prevState => ({...prevState, valor_repasse: e.target.value}))} ></InputNumber>
                </div>
                </div>
                <S.CardTittle style={{marginTop: 5}}>Nome do procedimento</S.CardTittle>
                <S.CardInput>
                <S.CardInputValue value={proc.nome_proc} onChange={(e) => setProc(prevState => ({...prevState, nome_proc: e.target.value}))} style={{width: 280}}></S.CardInputValue> 
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "row"} }>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>Quantidade de procedimentos</S.CardTittle>
                <S.CardInput style={{width: 318}}>
                <S.CardInputValue value={proc.quantidade} onChange={(e) => setProc(prevState => ({...prevState, quantidade: e.target.valueAsNumber}))} type="number" style={{width: 300}}></S.CardInputValue>      
                </S.CardInput>
                </div>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 10, marginLeft: 27, marginRight: 68}}>
                <S.CardTittle >Valor do auxiliar</S.CardTittle>
                <InputNumber placeholder="R$" mode="decimal" locale="en-US" minFractionDigits={2} size={30} value={proc.valor_auxiliar} onValueChange={(e) => setProc(prevState => ({...prevState, valor_auxiliar: e.target.value}))} style={{width: 230}}></InputNumber>
                </div>
                </div>
                <div style={{display: 'flex', flexDirection: "row", marginBottom: 10} }>
                <div style={{display: 'flex', flexDirection: "column", marginTop: 5}}>
                <S.CardTittle style={{marginTop: 5}}>Data do procedimento</S.CardTittle>
                <Calendar id="basic" value={dateproc} onChange={(e) => setDateProc(e.target.value)} dateFormat="yy-mm-dd" />  
                </div>
                </div>
                
            </S.CardRegister>
            <S.ButtonLogin onClick={()=> handleRegisterProc()}>Cadastrar</S.ButtonLogin>
        </S.Body>
    )
}

export default RegisterProc;