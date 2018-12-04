var simplemde = new SimpleMDE({
    autofocus: true,
    initialValue: '# Markdown Editer',
    forceSync: true,
    element: document.getElementById("MyID")
});

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

var arrWeb = []
var arrJava = []

function loadUsers() {
    axios({
        method: "get",
        baseURL: "http://192.168.0.117:8080/",
        url: 'getAll',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        Array.prototype.slice.call(response.data.managerList).forEach((ele) => {
            ele.group_id == 1 ? arrJava.push(ele.stu_id) : arrWeb.push(ele.stu_id)
        })
        Array.prototype.slice.call(response.data.userList).forEach((ele) => {
            ele.group_id == 1 ? arrJava.push(ele.stu_id) : arrWeb.push(ele.stu_id)
        })
    })
}
loadUsers()

function markdownCommit(state) {
    let value = simplemde.value()
    let author = searchCookie('stu_id')
    let group = searchCookie('group')
    let title = document.querySelector('#title').innerText
    let receivers;
    let WebChecked = document.querySelector('.web').checked
    let JavaChecked = document.querySelector('.java').checked
    if (searchCookie('stu_id') == undefined) {
        alert('你还没有登录,请登录后操作')
        return;
    }
    if (title == '') {
        alert('请输入公文标题')
        return;
    }
    if (value == '') {
        alert('请输入公文内容')
        return;
    }
    if (!WebChecked && !JavaChecked) {
        alert('请选择群发用户')
        return;
    }
    if (group == 1) {
        var index = arrJava.indexOf(Number(author));
        arrJava.splice(index, 1)
    } else if (group == 2) {
        var index = arrWeb.indexOf(Number(author));
        arrWeb.splice(index, 1)
    }
    if (WebChecked && !JavaChecked) {
        receivers = arrWeb.join('|')
    }
    if (JavaChecked && !WebChecked) {
        receivers = arrJava.join('|')
    }
    if (JavaChecked && WebChecked) {
        receivers = arrWeb.concat(arrJava).join('|')
    }
    axios({
            method: "post",
            baseURL: "http://192.168.0.117:8080/",
            url: 'addArchivesDetail',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                author: author,
                title: title,
                content: value,
                state: state,
                receiver: receivers
            }
        })
        .then(response => {
            // console.log('response', response);
            alert('提交成功')
        }).catch(error => {
            console.log(`err:${error}`);
            alert('提交失败')
        })
}
document.querySelector('#save').addEventListener('click', () => {
    markdownCommit(0)
})
document.querySelector('#upload').addEventListener('click', () => {
    markdownCommit(1)
})