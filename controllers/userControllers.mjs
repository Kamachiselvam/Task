import { user } from "../data/userdata.mjs"
export const createUser={
    name:{
        notEmpty:{
            errorMessage:"name should be required"
        },
        custom:{
            options:(value)=>{
                const exictName=user.find((u)=>u.name===value)
                if(exictName){
                    throw new err("The name already excits")
                    
                }
                 return true
        }
         }
           
    },
    email:{
        notEmpty:{
            errorMessage:"The email required"
        },
        isEmail:{
            errorMessage:"The email must be in email format"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"The password required"
        },
        isStrongPassword:{
            options:{
                minLength:5,
                minUppercase:1,
                minLowercase:1,
                minNumbers:1,
                minSymbols:1
            },
            errorMessage:"The password contain must be uppercase,lowercase,alphabets"
        }
    }
}