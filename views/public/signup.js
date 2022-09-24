const form = document.querySelector('form');
form.addEventListener('submit',(e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
})