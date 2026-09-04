import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) setMessage(error.message);
    else setMessage('Signup successful! You can now log in.');
    setLoading(false);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Logged in successfully!');
      if (onLoginSuccess) onLoginSuccess(data.user);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '20px auto' }}>
      <h2>Login / Sign Up</h2>
      <form>
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Your Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button onClick={handleLogIn} disabled={loading}>Log In</button>
        <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}