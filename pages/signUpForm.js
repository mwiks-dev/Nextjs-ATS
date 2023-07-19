import { useState } from "react";

export default function SignUp(){
    const [username, setUsername] = useState('')
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
            body: JSON.stringify({username, email, password}),
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
        <div>
          <h2>Sign Up</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
          <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div> */}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );  
};