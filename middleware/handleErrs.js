const handleErrs = (err) => {

    let errors ={name:'',email:'', password:'',login:''}

    //Getting errors from errors obj (mongoose errors)

    if(err.message === 'incorrect email or password'){
        errors.login = 'incorrect email or password'
    }

    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors
    }
    
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;

        })
    }

    return errors
}

module.exports = {
    handleErrs,
}