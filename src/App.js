import React, {useState} from 'react';
import './App.css';

function App() {

  const [status, setStatus] = useState("Submit");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    
    let details = {
      name: name,
      phone: phone,
      message: message,
    };

    let response = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details)
    });

    console.log(details)

    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  
  return ( 
    <div className = "App" >
      <form className="form" onSubmit={handleSubmit}>
      <div class="pageTitle title"> Contact us </div>
        
        <input placeholder="Name" type="text" id="name" required 
        class="name formEntry" value={name} onChange={e => setName(e.target.value)}/>
        
        <input placeholder="Phone" type="text" id="phone" required 
        class="name formEntry" value={phone} onChange={e => setPhone(e.target.value)} />
        
        <textarea placeholder="Message" id="message" required 
        class="message formEntry" value={message} onChange={e => setMessage(e.target.value)}/>
        <button type="submit" class="submit formEntry">{status}</button>
        </form>
    </div>
  );
}

export default App;