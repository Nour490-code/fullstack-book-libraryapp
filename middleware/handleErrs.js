const handleErrs = (err) => {

    let errors ={name:'',email:'', password:''}
    
    //Getting errors from errors obj (mongoose errors)
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