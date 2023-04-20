import React, { useEffect, useRef, useState, useContext } from 'react'
import {GrMail} from "react-icons/gr"
import {AiFillLock} from "react-icons/ai"
import { Toast } from 'primereact/toast';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  {AuthContext}  from "./AuthContext";

interface Field{
    value: string,
    error: string
}

function Login() {
    const toast = useRef<Toast>(null);

    const [email,setEmail] = useState<Field>({
        value: "",
        error: ""
    });
    const [password, setPassword] = useState<Field>({
        value: "",
        error: ""
    });
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const [name, setName] = useState<Field>({
        value: "",
        error: ""
    });

    useEffect(() => {
        setEmail({
            value: "",
            error: ""
        })
        setPassword({
            value: "",
            error: ""
        })
        setName({
            value: "",
            error: ""
        })
    }, [showLogin])


    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/");
        }
    }, [isLoggedIn])

    const navigate = useNavigate()

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validateError = (e:any) => {
        let error = false;
        if(!regex.test(email.value)){
            setEmail({
                ...email,
                error: "El email no es válido"
            })
            error = true;
        }
        if(password.value.trim() === ""){
            setPassword({
                ...password,
                error: "Debe colocar una contraseña"
            })
            error = true;
        }
        if(!showLogin && name.value.trim() === ""){
            setName({
                ...name,
                error: "Debe colocar un nombre"
            })
            error = true;
        }
        if(error){
            return;
        }else{
            if(showLogin){
                handleSubmit(e)
            }else{
                register()
            }
        };
    }

    const register = () => {
        if(email.value.trim() !== "" && password.value.trim() !== "" && name.value.trim() !== ""){
            axios.post("http://localhost:3000/register", {
                name: name.value,
                email: email.value,
                password: password.value
            }).then((response:any) => {
                showToast(true, response.data.message)
                setShowLogin(true)
            }).catch(function (error) {
                showToast(false, error.response.data.message)
            });
        }
    }

    const showToast = (success:boolean, message: string) => {
        return toast.current?.show({ 
            severity: success ? 'success' : 'error', 
            summary: success ? 'Success' : 'Error', 
            detail: message 
        });
    }

    const checkDisabled = () => {
        if(showLogin){
            if(email.value.trim() === "" || password.value.trim() === "") return true;
        }else{
            if(email.value.trim() === "" || password.value.trim() === "" || name.value.trim() === "") return true;
        }
        return false;
    }

    const { login } = useContext(AuthContext);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(email.value.trim() !== "" && password.value.trim() !== ""){
            axios.post("http://localhost:3000/login", {
                email: email.value,
                password: password.value
            }).then((response:any) => {
                login(response);
            }).catch(function (error) {
                showToast(false, error.response.data.message)
            });
        }
    };

    return (
        <React.Fragment>
            <Toast ref={toast} />
            <section className='login-section'>
                <div className='login-box'>
                    <form action="">
                        <h2>
                            {showLogin ? 'Erictel APP' : 'Register'}
                        </h2>
                        {!showLogin && (
                            <React.Fragment>
                                <div className="input-box">
                                    <input 
                                        type="text" 
                                        required 
                                        value={name.value}
                                        onChange={(e:any) => {
                                            setName({
                                                ...name, 
                                                value:e.target.value,
                                                error: ""
                                            })}
                                        }
                                    />
                                    <label htmlFor="">Name</label>
                                </div>
                                {name.error !== "" && (
                                    <span className='error'>{name.error}</span>
                                )}
                            </React.Fragment>
                        )}
                        <div className="input-box">
                            <span className='icon'>
                                <GrMail />
                            </span>
                            <input 
                                type="text" 
                                required 
                                value={email.value}
                                onChange={(e:any) => {
                                    setEmail({
                                        ...email, 
                                        value:e.target.value,
                                        error: ""
                                    })}
                                }
                            />
                            <label htmlFor="">Email</label>
                        </div>
                        {email.error !== "" && (
                            <span className='error'>{email.error}</span>
                        )}
                        <div className="input-box">
                            <span className='icon'>
                                <AiFillLock />
                            </span>
                            <input 
                                type="password" 
                                required 
                                value={password.value}
                                onChange={(e:any) => {
                                    setPassword({
                                        ...password, 
                                        value:e.target.value,
                                        error: ""
                                    })}
                                }
                            />
                            <label htmlFor="">Password</label>
                        </div>
                        {password.error !== "" && (
                            <span>{password.error}</span>
                        )}
                        <button type='button'
                            disabled={checkDisabled()}
                            onClick={(e:any) => {
                                validateError(e)
                            }}
                        >
                            {showLogin ? 'Login' : 'Create Account'}
                        </button>
                        <div className="register-link">
                            {showLogin ? (
                                <p>Don't have an account? 
                                    <span onClick={() => {
                                        setShowLogin(false)}
                                    }>Register</span>
                                </p>
                            ) : (
                                <span onClick={() => setShowLogin(true)}>Back to login</span>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Login;