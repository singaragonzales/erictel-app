import React, { useContext, useEffect, useState, useRef} from 'react'
import "./style.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { AuthContext } from '../Login/AuthContext';
import axios from 'axios';
import ProfileImage from '../../assets/profile.png'
import { GrMail } from 'react-icons/gr';
import { Toast } from 'primereact/toast';

interface Field{
    value: string,
    error: string
}

function Profile() {

    const navigate = useNavigate()
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    const toast = useRef<Toast>(null);

    const [image,setImage] = useState<string>("");
    const [name, setName] = useState<Field>({
        value: "",
        error: ""
    });
    const [description, setDescription] = useState<Field>({
        value: "",
        error: ""
    });
    const [showLogin, setShowLogin] = useState<boolean>(true);
    

    const [userId, setUserId] = useState({})
    const [base64, setBase64] = useState<string>('')
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') !== "true") {
            navigate("/")
        }else{
            setUserId(location.state.id)
            axios.get(`http://localhost:3000/users/${location.state.id}`).then((response:any) => {
                console.log(response)
                setUserInfo(response.data)
                setDescription({...description, value: response.data.description})
                setName({...name, value: response.data.name})
                setImage(response.data.profile)
            }).catch(function (error) {
                showToast(false, error.response.data.message)
            });
        }
    }, [])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onloadend = () => {
            setImage(reader.result as string)
        };
    };

    const checkDisabled = () => {
        if(name.value.trim() === ""){
            return true;
        } 
        return false;
    }

    const validateError = (e:any) => {
        let error = false;
        // if(password.value.trim() === ""){
        //     setPassword({
        //         ...password,
        //         error: "Debe colocar una contraseña"
        //     })
        //     error = true;
        // }
        if(name.value.trim() === ""){
            setName({
                ...name,
                error: "Debe colocar un nombre"
            })
            error = true;
        }
        if(error){
            return;
        }else{
            saveChanges()
        };
    }

    const saveChanges = () => {
        if(name.value.trim() !== ""){
            axios.put(`http://localhost:3000/users/${location.state.id}`, {
                name: name.value,
                description: description.value,
                profile: image
            }).then((response:any) => {
                showToast(true, "Usuario Actualizado con éxito")
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
    
  return (
    <React.Fragment>
        <Toast ref={toast} />
        <Navbar/>
            <section className='profile-section'>
                <div className='login-box'>
                    <h2>
                        {'Edit Profile'}
                    </h2>
                    <div className='profile-container'>
                        <div className="user-profile">
                            <div className="card">
                                <img src={image === "" ? ProfileImage: image} alt="" />
                                <label htmlFor="input-file">Upload Image</label>
                                <input type="file" accept='image/jpeg, image/png, image/jpg' id='input-file'
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <form action="">
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
                            <div className="input-box">
                                <input 
                                    type="text" 
                                    required 
                                    value={description.value}
                                    onChange={(e:any) => {
                                        setDescription({
                                            ...description, 
                                            value:e.target.value,
                                            error: ""
                                        })}
                                    }
                                />
                                <label htmlFor="">Description</label>
                            </div>
                            {description.error !== "" && (
                                <span className='error'>{description.error}</span>
                            )}
                            <button type='button'
                                disabled={checkDisabled()}
                                onClick={(e:any) => {
                                    validateError(e)
                                }}
                            >
                                {'Save'}
                            </button>
                        </form>
                    </div>
                    
                </div>
            </section>
        </React.Fragment>
        // <section className='profile-section'>
        //     <div className='container'>
        //         <header>Edit Profile</header>
        //         <div className='profile-container'>
        //             <div className="user-profile">
        //                 <div className="card">
        //                     <h1>{userInfo?.name}</h1>
        //                     <p>{userInfo?.description}</p>
        //                     <img src={base64 === "" ? ProfileImage: base64} alt="" />
        //                     <label htmlFor="input-file">Upload Image</label>
        //                     <input type="file" accept='image/jpeg, image/png, image/jpg' id='input-file'
        //                         onChange={handleImageUpload}
        //                     />
        //                 </div>
        //             </div>
        //             <form action="">
        //                 <div className="form first">
        //                     <div className="details personal">
        //                         <div className="fields">
        //                             <div className="input-box">
        //                                 <input type="text" required placeholder='Full Name'/>
        //                                 <label htmlFor="">Full Name</label>
        //                             </div>
        //                             <div className="input-box">
        //                                 <input type="text" placeholder='Description'/>
        //                                 <label htmlFor="">Description</label>
        //                             </div>
        //                             <hr />
        //                             <div className="input-box">
        //                                 <input type="password" placeholder='Password'/>
        //                                 <label htmlFor="">Password</label>
        //                             </div>
        //                             <button>Save</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </section>
    // </React.Fragment>
    
    
  )
}

export default Profile