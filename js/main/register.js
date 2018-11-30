//Get the DOM node
let select = document.querySelector('#registerInputSelect')
    //Regular expression
let Check = [
    /^[\u4E00-\u9FA5]{2,4}$/, /^\d{8}$/, /[1-9][0-9]{4,}/, /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/, /\S/
]
let inputs = document.querySelectorAll('.form-group input')
    //Manually triggering an event
let blurfuc = new Event('blur')
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', () => {
        if (!Check[i].test(inputs[i].value)) {
            inputs[i].style.borderColor = 'red'
        } else {
            inputs[i].style.borderColor = '#ebedf2'
        }
    })
}
document.querySelector('#registerButton').addEventListener('click', () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].dispatchEvent(blurfuc);
    }
    if (
        Check.every((currentValue, index, arr) => {
            return currentValue.test(inputs[index].value)
        }) && select.value != '小组') {
        axios({
                method: "post",
                baseURL: "http://192.168.0.108:8080/",
                url: "user/regist",
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 3000,
                data: {
                    name: inputs[0].value,
                    stu_id: inputs[1].value,
                    tencent: inputs[2].value,
                    mobile_phone: inputs[3].value,
                    group_id: select.value == '前端' || select.value == 'UI' ? 2 : 1,
                    password: inputs[4].value
                },
                // transformRequest: [
                //   data => {
                //     return JSON.stringify(data);
                //   }
                // ]
            })
            .then(response => {
                if (response.data.state == 0) {
                    alert("用户已存在,请登录");
                    window.location.href = '../../pages/samples/login.html'
                }
                if (response.data.state == 1) {
                    alert("注册成功");
                    window.location.href = '../../index.html'
                }
            })
            .catch(error => {
                console.log(`err:${error}`);
            });
    } else {
        return false;
    }

})