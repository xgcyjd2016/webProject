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
                    baseURL: "http://192.168.0.121:8080/SpringMyBatis-1.0-SNAPSHOT",
                    url: 'logout',
                })
                .then(response => {
                    console.log('response', response);
                    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for (let i = keys.length; i--;)
                            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                    }
                    window.location.reload()

                })
                .catch(error => {
                    alert('服务器异常')
                    console.log(`err:${error}`);
                });
        })
    })
    //异步模块加载
let dominject = document.querySelector('.content-wrapper')


function Modularization(dom, script) {
    console.log(dom, script);
    let doms = dom || 'index'
    axios({
        method: "get",
        baseURL: "../../components",
        url: `${doms}.html`
    }).then((response) => {
        // //重载css依赖
        // let link = document.createElement('link')
        // link.href = 'css/style.css'
        // link.rel = 'stylesheet'
        // Array.prototype.slice.call(document.getElementsByTagName('link')).forEach(element => {
        //     if (element.href == link.href) {
        //         console.log(element);
        //         document.head.removeChild(element)
        //     }
        // });
        // document.head.appendChild(link)
        //重载相关js依赖
        if (script != undefined) {
            let scr = document.createElement('script')
            scr.src = script

            Array.prototype.slice.call(document.getElementsByTagName('script')).forEach(element => {
                if (element.src == scr.src) {
                    console.log(element);
                    document.body.removeChild(element)
                }
            });
            document.body.appendChild(scr)
        }
        return response
    }).then((response) => {
        dominject.innerHTML = response.data
    }).catch(error => {
        console.log(`err:${error}`);
    })
}