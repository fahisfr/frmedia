import React, { useState } from "react";
import styles from "../styles/ls.module.css";
import Link from "next/link";
import FormInput from "../components/singupInput/FormInput.js";
import {useQuery,gql,useLazyQuery, useMutation} from '@apollo/client'

const GetALlUser= gql`

  query GetAllUser{
    getAllUsers{
    name

      }
  }
`

const CreateUser= gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!){
    createUser(name: $name, email: $email, password: $password){
      name
      email
      password
    }
  }
}
`

function index() {

  const {loading,error,data}=useQuery(GetALlUser)
  
  const [btnLoadign,setBtnLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitNow = ()=>{
    

  }


  const inputs =[
    {
      name: "name",
      type: "text",
      value: values.name,
      label: "User name",
      placeholder: " ",
      pattern: "[a-zA-Z0-9]{3,13}",
      errorMessage:"Username should be 3-13 characters" ,
     
    },
    {
      name: "email",
      type: "email",
      value: values.email,
      label: "Email",
      placeholder: " ",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}",
      errorMessage:"Please enter a valid email" ,
      
    },
    {
      name: "password",
      type: "password",
      value: values.password ,
      label:"Password",
      placeholder: " ",
      pattern: "[a-zA-Z0-9]{5,20}",
      errorMessage:"Password should be 5-20 characters" ,
      
    },
    {
      name: "confirmPassword",
      type: "password",
      value: values.confirmPassword,
      label: "Confirm Password",
      placeholder: " ",
      pattern: values.password ,
      errorMessage:"Password not match" ,

    }
  ]

  const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value});
  }

  const singupNow = (e)=>{
    e.preventDefault();
    console.log("singupNow");
    setBtnLoading(!btnLoadign);

  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.body}>
        <div className={styles.title}>
          <h1 className={styles.title_text}>Sing up</h1>
        </div>

        <form o className={styles.form}>


          {
            inputs.map((input, index) => {
              return (
                <FormInput
                  key={index}
                  {...input}
                  onChange={onChange}
                  value={values[input.name]}
                />
              );
            })
          }
         

          <div className={styles.form_bottom}>
            <button 
            className={styles.form_button} 
            type="submit"
            onClick={singupNow}
            >
              <span className={styles.form_button_text}>Sing Up</span>
            </button>
          </div>
        </form>

        <div className={styles.au}>
          <div className={styles.au_bd}>
            <div className={styles.or_d}>
              <span className={styles.or_text}> or</span>
            </div>

            <div className={styles.au_group}>
              <button className={styles.google_button}>
                <img
                  src="/google_icon.svg"
                  className={styles.google_button_icon}
                />
                <span className={styles.google_button_text}>
                  Continue With Google
                </span>
              </button>

              <div className={styles.body_bottom}>
                <span>
                  Already have an account? <Link href="/login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default index;
