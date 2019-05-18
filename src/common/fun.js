export default {
    moveElement(odiv){
        
        odiv.onmousedown = (e) => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;

            document.onmousemove = (e)=>{
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                //绑定元素位置到positionX和positionY上面
                this.positionX = top;
                this.positionY = left;

                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
     getDate(){
    let d=new Date()
        return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()
    },
//    通过对象获取拼接字符串
    getRequestDataFromObj(obj){
        let  s=''
        for(let i in obj){
            s+=`${i}=${obj[i]}&&`
        }
        return s;
    },
//   打印
     printpage(ele){
        // var printHtml = document.getElementById(myDiv).innerHTML;
        //  var printHtml = ele.innerHTML;
        // var wind = window.open("",'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
        //
        // wind.document.body.innerHTML = printHtml;
        //
        // wind.print();
        //
         document.execCommand(`print`)
    }

}
