// var todo=[
// 	{"title":"开会","done":"false"},
// 	{"title":"不开会","done":"true"},
// 	{"title":"开会","done":"false"},
// 	{"title":"不开会","done":"true"},
// 	{"title":"又开会","done":"false"}
// ];
var inputBtn=document.querySelector(".top input")
var nowlist=document.querySelector(".now ")
var overlist=document.querySelector(".over ")
var nownums=document.querySelector(".title .nownum")
var overnums=document.querySelector(".title .overnum")
var clead=document.querySelector(".clead")

inputBtn.onkeydown=function(e){
		if (e.keyCode==13) {
			if (this.value=="") {
				return
			}else{
			 var title=this.value;
			 var data =getData();
			 data.push({"title":title,"done":"false"})
			 saveData(data);
			 this.value="";
			 render();
			}
		};
	}

function getData(){
	var d = localStorage.getItem('todo')
	if(d!=null){
		return d ==null?[]:JSON.parse(d);
	 }else return [];

}
function saveData(data){
	localStorage.setItem('todo',JSON.stringify(data))
}
function changeData(i,key,val){
	var data = getData();
	data[i][key]=val;
	saveData(data);
	render();
}
function delData(i){
	var data = getData();
	data.splice(i,1);
	saveData(data);
	render()
}

clead.onclick=function(){
	localStorage.clear();
	render()
}


render()
function render(){
	var nowStr="";
	var overStr="";
	var nowNum=0;
	var overNum=0;
	var todo=getData();
	for (var i = 0; i < todo.length; i++) {
		if (todo[i].done=="true") {
			overNum++;
			overStr+='<ul class="nowlist now-hot"><input type="checkbox" onchange=changeData('+i+',"done","false")><div class="text" contenteditable onblur=changeData('+i+',"title",this.innerHTML)>'+todo[i].title+'</div><i class="iconfont" style="color:#03d57b" onclick=delData('+i+')>&#xe614;</i></ul>'
		}else{
			nowNum++;
			nowStr+='<ul class="nowlist"><input type="checkbox" onchange=changeData('+i+',"done","true")><div class="text" contenteditable onblur=changeData('+i+',"title",this.innerHTML)>'+todo[i].title+'</div><i class="iconfont" onclick=delData('+i+')>&#xe614;</i></ul>'
		}
	}
	nownums.innerHTML=nowNum;
	overnums.innerHTML=overNum;
	nowlist.innerHTML=nowStr;
	overlist.innerHTML=overStr;
}
