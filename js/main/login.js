//Get the DOM node
let stu = document.querySelector('#loginInputstudentID')
let pas = document.querySelector('#loginInputPassword')
let checkbox = document.querySelector('#loginChecked')
    //Regular expression
let pasCheck = /\S/
let stuCheck = /^\d{8}$/
    //Manually triggering an event
let blurfuc = new Event('blur')
    //form validation
stu.addEventListener('blur', () => {
    stu.style.borderColor = '#ebedf2'
    if (!stuCheck.test(stu.value)) {
        stu.style.borderColor = 'red'
        return false;
    }
})
pas.addEventListener('blur', () => {
        pas.style.borderColor = '#ebedf2'
        if (!pasCheck.test(pas.value)) {
            pas.style.borderColor = 'red'
            return false;
        }
    })
    //Form submission
document.querySelector('#loginInputButton').addEventListener('click', () => {
    //Manually triggering an event
    pas.dispatchEvent(blurfuc)
    stu.dispatchEvent(blurfuc)
    if (stuCheck.test(stu.value) && pasCheck.test(pas.value)) {
        let url;
        checkbox.checked ? url = 'uanager/login' : url = 'user/login'
        axios({
                method: "post",
                baseURL: "http://192.168.0.121:8080/SpringMyBatis-1.0-SNAPSHOT",
                url: url,
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    stu_id: stu.value,
                    password: pas.value
                },
                // transformRequest: [
                //   data => {
                //     return JSON.stringify(data);
                //   }
                // ]
            })
            .then(response => {
                console.log('response', response);
                if (response.data.state == 0) {
                    alert("密码错误");
                }
                if (response.data.state == 1) {
                    alert("登录成功");
                    if (!document.cookie) {
                        let str = JSON.stringify(response.data)
                        let arr = str.substring(1, str.length - 1).replace(/:/g, '=').replace(/"/g, '').split(',')
                        for (let i = 0; i < arr.length; i++) {
                            document.cookie = arr[i] + ';path=/'
                        }
                    }
                    window.location.href = '../../index.html'
                }
                if (response.data.state == -1) {
                    alert("用户不存在，请注册");
                }
            })
            .catch(error => {
                console.log(`err:${error}`);
            });
    }
    return false;
})