
const UserInfo = (token, setUserData) => {
    return  fetch('http://127.0.0.1:8000/api/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            return response.json();
        })
        .then(data => {
            setUserData(Object.values(data.data))
            return true;
        })
        .catch(error => {
            console.error('Error userdata:', error);
            return false;
        });
}
export default UserInfo