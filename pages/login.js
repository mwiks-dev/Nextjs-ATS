import { signIn } from 'next-auth/client';

export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    if (result.error) {
      // Handle login error
      console.log(result.error);
    } else {
      // Redirect to dashboard or any other page
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
}
