import { useState } from "react";

export default function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [password2, setPassword2] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });
        const data = await response.json();

        if (response.ok) {
          console.log('User created successfully',data)
        } else if (response.status == 400) {
          alert('A user with that email already exists')
        } else if (response.status == 401) {
          alert('Passwords do not match')
        } else {
          setError(data.message);
        }
    } 
    return (
        <div class="card" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',margin: '10em'}}>
          <h2>Sign Up</h2>
          <div class="card-body">
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-6">
                  <label for="inputName" class="form-label">Username</label>
                  <input type="text" class="form-control" value = {name} onChange={(e) => setName(e.target.value)} id="inputName"placeholder="Jane Doe" required/>
                </div>
                <div class="col-md-6">
                  <label for="inputEmail" class="form-label">Email</label>
                  <input type="email" class="form-control" value = {email} onChange={(e) => setEmail(e.target.value)} id="inputEmail"placeholder="janedoe@gmail.com" required/>
                </div>
                <div class="col-6">
                  <label for="inputPassword" class="form-label">Password</label>
                  <input type="text" class="form-control" value = {password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" required/>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-success">Sign in</button>
                </div>
              </form>
          </div>
        </div>
      );  
};