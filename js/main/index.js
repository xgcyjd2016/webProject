function searchCookie(key) {
    if (!document.cookie) {
        return false
    }
    let arr = document.cookie.split(';')
    let result;
    for (let i = 0; i < arr.length; i++) {
        if (key == arr[i].split('=')[0].replace(/\s+/g, "")) {
            result = arr[i].split('=')[1].replace(/\s+/g, "")
        }
    }
    return result;
}
document.querySelector('#leftinformation span').firstChild.nodeValue = searchCookie('name')
document.querySelector('.nav-profile-text p').firstChild.nodeValue = searchCookie('name')
    //登出
document.querySelectorAll('.userLogout').forEach((index) => {
    index.addEventListener('click', () => {
        axios({
                method: "get",
                baseURL: "http://192.168.0.108:8080/",
                url: 'logout',
            })
            .then(response => {
                console.log('response', response);
                if (response.data.state == 1) {
                    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for (let i = keys.length; i--;)
                            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                    }
                    window.location.reload()
                } else {
                    alert('服务器异常');
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log(`err:${error}`);
            });
    })
})