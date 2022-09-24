const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const emailErr  = document.querySelector('.email.error')
    const passwordErr  = document.querySelector('.password.error')
    const nameErr  = document.querySelector('.name.error')

    emailErr.textContent = '';
    passwordErr.textContent = '';
    nameErr.textContent = '';


    try{
        const res = await fetch('/signup',{
            method:'POST',
            body: JSON.stringify({ name , email , password}),
            headers: {'Content-Type':'application/json'}
        })
        
        const data = await res.json()
        console.log(data);

        if(data.errors){
            emailErr.textContent = data.errors.email;
            passwordErr.textContent = data.errors.password;
            nameErr.textContent = data.errors.name;
        }
        if(data.user){
            location.assign('/')
        }
    }
    catch(err){
        console.log(err)
    }
})