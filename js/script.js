const tableData = document.querySelector('#customers > tbody')




function loadData() {
    const rqs = new XMLHttpRequest()
    rqs.open("get", "https://reqres.in/api/unknown?per_page=12")
    rqs.onload = () => {
        try {
            const json = JSON.parse(rqs.responseText);
            inputDatajson(json)
        } catch (err) {
            console.warn('Error')
        }
    }
    rqs.send();
}

function inputDatajson(json) {
    let arr = json.data;
    arr.forEach((elem) => {
        const tr = document.createElement('tr')
        for (let key in elem) {
            const td = document.createElement('td');
            td.className = key
            td.textContent = elem[key];
            tr.appendChild(td);
            if (key == 'name') {
                getUpname(td)
            }
            if (key == 'color') {
                getColor(td)
                addColor(td, elem[key])
            }
        }
        tableData.appendChild(tr)
    })
}

function getUpname(td) {
    let str = td.innerText
    return td.innerText = str.charAt(0).toUpperCase() + str.slice(1);
}

function getColor(td) {
    const color = document.createElement('div');
    color.className = "colorField";
    td.appendChild(color);
}

function addColor(td, colorBG) {
    const arrColor = td.querySelector('.colorField')
    arrColor.style.backgroundColor = colorBG
}

function changeActive() {
    const chckbxActive = document.querySelectorAll('input:checked')
    if (chckbxActive.length < 5) {
        const reset = document.querySelector('.reset')
        reset.classList += ' active'
        reset.addEventListener('click', () => {
            const delClass = document.querySelectorAll('.hideColumn')
            delClass.forEach((el) => {
                el.classList.remove("hideColumn")
            })
            reset.classList.remove("active")
            localStorage.clear()
        })
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadData()
    const th = document.querySelectorAll('th')
    th.forEach((el) => {
        el.addEventListener('click', () => {
            changeActive()
            const chckbx = el.querySelector('.checkbox')
            const elemClass = el.className
            let checkboxStr = chckbx;
            //
            if (localStorage.getItem('onChecked') === 'false') {
                checkboxStr.checked = false;
            }
            checkboxStr.addEventListener('click', () => {
                localStorage.setItem('onChecked', 'false');
            });
            //

            if (chckbx.checked == false) {
                const delChild = document.getElementsByClassName(elemClass)
                for (let key in delChild) {
                    delChild[key].classList += ' hideColumn'
                }
                chckbx.checked = true
            }
            
        })

    })

})