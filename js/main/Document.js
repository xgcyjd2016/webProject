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
        baseURL: "http://192.168.0.121:8080/SpringMyBatis-1.0-SNAPSHOT",
        url: 'getAll',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log('response', response);
        Array.prototype.slice.call(response.data.user).forEach((ele) => {
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
    if (!searchCookie('stu_id')) {
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
            baseURL: "http://192.168.0.121:8080/SpringMyBatis-1.0-SNAPSHOT",
            url: 'addArchivesDetail',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                author: author,
                title: title,
                content: value,
                state: state,
                receiver: receivers,
                date: new Date().toDateString()
            }
        })
        .then(response => {
            // console.log('response', response);
            alert('SUCCESSFUL')
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
document.querySelector('#tijiaobutton').addEventListener('click', () => {
    axios({
            method: "get",
            baseURL: "http://192.168.0.121:8080/SpringMyBatis-1.0-SNAPSHOT",
            url: 'findArchivesDetailByAuthor',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            params: {
                author: Number(searchCookie('stu_id')),
                pageNow: 1
            }
        })
        .then(response => {
            console.log('responsesss', response);
        }).catch(error => {
            console.log(`erssssr:${error}`);
        })
})

//my_article

function showArticle(ArchivesDetail, page) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    ArchivesDetail.forEach((data, index, arr) => {
        // let index = data.index
    })
}