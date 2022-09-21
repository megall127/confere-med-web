import React, { useState } from "react";
import * as S from "./styled";
import logo from "../../assets/img/logo.png"
import profile from "../../assets/icons/profile.png"
import senha from "../../assets/icons/senha.png"
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PuffLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const navigation = useNavigate();

    const notify = () => toast.error('Credenciais incorretas, verifique e tente novamente.');

    const handleLogin = () => {
        setLoading(true)
        api.post("/login", {
            email: user,
            password: password
        })
        .then((res) => {
            AsyncStorage.setItem('@token', res.data.token.token)
            navigation("/homepage")
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            notify()
        })
    }

   


    return(
        <S.Body>
             <Toaster/>

            <div style={{position: "absolute"}}>
            <PuffLoader color="#085769" loading={loading}  size={150}/>
            </div>
            <S.CardLogin>
                <S.BoxBlue>
                    <S.IconLogo src={logo}/>
                    <S.TittleBoxBlue>Boas vindas <br/> de volta!</S.TittleBoxBlue>
                    <S.SubTextBoxBlue>Acesse sua conta administrativa</S.SubTextBoxBlue>
                    <S.SubTextBoxBlue>agora mesmo.</S.SubTextBoxBlue>
                </S.BoxBlue>
                <S.BoxLogin>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <S.TittleBoxBlue style={{color: "#085769", width: 250, marginTop: 84}}>Acesse sua Conta</S.TittleBoxBlue>
                    <S.SubTextBoxBlue style={{color: "#B5AFAF", width: 350}}>Preencha seus dados para ter acesso a sua conta</S.SubTextBoxBlue>
                    </div>
                    <div style={{marginTop: 100}}>
                        <S.InputLogin>
                            <S.IconLogin src={profile}/>
                            <S.InputInvisible value={user} onChange={(e) => setUser(e.target.value)} placeholder="Login"></S.InputInvisible>
                        </S.InputLogin>
                        <S.InputLogin>
                            <S.IconLogin style={{height: 26, width: 18}} src={senha} />
                            <S.InputInvisible value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha"></S.InputInvisible>
                        </S.InputLogin>
                    </div>
                    <div style={{marginBottom: 76, display: 'flex', flexDirection: "column"}}>
                        <S.ButtonForget>Esqueci minha senha</S.ButtonForget>
                        <S.ButtonLogin onClick={() => handleLogin()}>Entrar</S.ButtonLogin>
                    </div>
                </S.BoxLogin>
            </S.CardLogin>
        </S.Body>
    )
}

export default LoginPage;