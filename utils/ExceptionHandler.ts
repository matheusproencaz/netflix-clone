import { useFieldArray } from "react-hook-form"

const ExceptionHandler = (error:string) => {

    if(error.includes("too-many-requests")){
        return ("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
    };

    if(error.includes("user-not-found")) { 
        return ("User not Found!") 
    };

    if(error.includes("wrong-password")) { 
        return ("Wrong Password!") 
    };

    if(error.includes("weak-password")){
        return ("Password should be at least 6 characters!");
    }

    if(error.includes("invalid-email")){
        return ("Invalid E-mail!")
    }

    if(error.includes("email-already-in-use")){
        return ("This e-mail is already in use!");
    }

}

export default ExceptionHandler;