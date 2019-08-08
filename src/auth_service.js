const AuthApiService = {
  postUser(user){
    return fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
      .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json());
  }
};

export default AuthApiService;