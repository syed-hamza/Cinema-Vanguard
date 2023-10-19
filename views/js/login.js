async function loginfunc() {
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var query = `select * from accounts as a where a.username = '${username}'`;
    var result = await fetch(`/sqlquery/${query}`)
    result = await result.json();
    if(result.length<1){
        alert("incorrect username");
        return;
    } 
    if (password !== result[0].password) {
      alert('Incorrect password.');
    } else {
      localStorage.setItem('username', username);
      console.log("success");
      window.location.href = '/';
    }
  }

  async function register(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    var username = document.getElementById('username').value;
    if(password != password2){
        alert("passwords do not match");
        document.getElementById('password').value = "";
        document.getElementById('password2').value = "";
        return;
    }
    query = `select * from accounts as a where a.username = '${username}'`;
    var response = await fetch(`/sqlquery/${query}`)
    response = await response.json();
    if(response.length!=0){
        alert("duplicate username");
        document.getElementById('password').value = "";
        document.getElementById('password2').value = "";
        document.getElementById('username').value = "";
        return;
    } 
    try{
        var query = `insert into accounts values("${email}","${username}","${password}","user")`;
        var result = await fetch(`/sqlquery/${query}`)    
        result = await result.json();
        window.location.href = '/login/';
    }
    catch{
        alert("some error occured")
    }  
  }