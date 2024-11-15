import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../apipath';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    // const [userName,setuserName]=useState("")
    e.preventDefault();
    // try {
    //   const { data } = await axios.post(`${api_url}/api/login`, { email, password });
    //   localStorage.setItem('token', data.token);
    //   navigate('/');
    // } catch (error) {
    //   console.error('Error logging in:', error);
    // }
    try {
      const response = await fetch(`${api_url}/api/auth/login`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({email,password})
      })
      if(response.ok){
        navigate('/reviewpage')
        
        alert('User succesfully login')
        
        
      }

      const data=await response.json()
      localStorage.setItem('token',data.token)
      localStorage.setItem('username',data.user.name)
      window.location.reload()
      // setuserName(data.user.name)


      console.log(data)
    }catch(e){
      console.log(e)
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mx-auto p-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full mb-2 p-2 border" placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full mb-2 p-2 border" placeholder="Password" required />
      <button type="submit" className="bg-[#ff742b] text-white p-2 rounded-md">Login</button>
    </form>
  );
}

export default Login;
