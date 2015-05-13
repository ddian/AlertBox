/*global console*/
/*jshint multistr: true */
(function(){
'use strict';

function My_AlertBox(str,mydialog_fn){
	var _this = this;
	str = str||'警告';

	var oDate = new Date().getTime();
	var mydialog_Btn = 'mydialog_Btn'+oDate;

	this.myDialog_newDiv = document.createElement('div');
	this.myDialog_newDiv.className='mydialog_alertConfirm';
	this.myDialog_newDiv.id=mydialog_Btn;

	this.myDialog_newDiv.innerHTML = '<div class="mydialog_mask" id="alerMask"></div>\
	<div class="mydialog_dialog mydialog_borderRadius" onselectstart="return false">\
	<h3>温馨提示:</h3>\
	<div class="mydialog_Content">\
		<p>\
			<i></i>\
			<span class="mydialog_borderRadius">'+str+'</span>\
		</p>\
	</div>\
	<div class="mydialog_footer"">\
		<a href="javascript:;" class="mydialog_borderRadius mydialogCancelBtn">取消</a>\
		<a href="javascript:;" class="mydialog_borderRadius mydialogConfirmBtn">确定</a>\
	</div>\
	<a class="mydialog_CloseBtn" title="关闭"></a>\
	<div>';

	document.body.appendChild(this.myDialog_newDiv);

	this.myDialogParent = document.getElementById(mydialog_Btn);
	this.confirm  = this.myDialogParent.getElementsByTagName('a')[1];
	this.close = this.myDialogParent.getElementsByTagName('a')[2];
	this.cancel = this.myDialogParent.getElementsByTagName('a')[0];
	this.DragObj = this.myDialogParent.getElementsByTagName('div')[1];
	this.disX = 0;
	this.disY = 0;

	this.close.addEventListener('click',function(){
		_this.alertDestroy();
	},false);

	this.confirm.addEventListener('click',function(){
		_this.alertDestroy();
		if(mydialog_fn)mydialog_fn();
	},false);

	this.cancel.addEventListener('click',function(){
		_this.alertDestroy();
	},false);

	this.DragObj.addEventListener('mousedown',function(ev){
		var oEvent = ev||event;
		_this.myDialogDragDown(oEvent);
		return false;
	},false);
	/*this.DragObj.onmousedown = function(ev){
		var oEvent = ev||event;
		_this.myDialogDragDown(oEvent);
		return false;
	};*/

}

//弹框出现、消失
My_AlertBox.prototype.alertConfirm = function(){
	this.myDialog_newDiv.style.display = 'block';		
};

My_AlertBox.prototype.alertDestroy = function(){
	document.body.removeChild(this.myDialog_newDiv);
};

/*//drag
My_AlertBox.prototype.myDialogDragDown = function(oEvent){
	this.disX = oEvent.clientX-this.DragObj.offsetLeft;
	this.disY = oEvent.clientY-this.DragObj.offsetTop;
	var _this = this;
	document.onmousemove = function(ev){
		var oEvent = ev||event;
		_this.myDialogDragMove(oEvent);
	};
	document.onmouseup = function(){
		_this.myDialogDragUp();
	}
};
My_AlertBox.prototype.myDialogDragMove = function(oEvent){
	this.DragObj.style.left = oEvent.clientX-this.disX+230+'px';

	this.DragObj.style.top = oEvent.clientY-this.disY+100+'px';
}
My_AlertBox.prototype.myDialogDragUp = function(){
	document.onmousemove=null;
	document.onmouseup = null;
}*/

//拖拽

var eventHandler = {};

My_AlertBox.prototype.myDialogDragDown = function(oEvent){
	var _this = this;

	eventHandler.mousemove = function(e){
		_this.mydialog_mousemove(e, _this);
	};
	eventHandler.mouseup = function(e){
		// console.log('mouseup');
		_this.mydialog_mouseup(e, _this);
	};
	//获取绝对位置
	eventHandler.getPosition = function(obj){
		var DragObjLeft = 0;
		var DragObjTop = 0;
		while(obj){
			DragObjLeft += obj.offsetLeft;
			DragObjTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {l:DragObjLeft,t:DragObjTop};
	};

	this.disX = oEvent.clientX-eventHandler.getPosition(this.DragObj).l;
	this.disY = oEvent.clientY-eventHandler.getPosition(this.DragObj).t;

	document.addEventListener('mousemove',eventHandler.mousemove,false);
	document.addEventListener('mouseup',eventHandler.mouseup,false);

	if(this.DragObj.setCapture)this.DragObj.setCapture();
	return false;
};

My_AlertBox.prototype.myDialogDragMove = function(oEvent){
	this.left = oEvent.clientX-this.disX;
	this.top = oEvent.clientY-this.disY;

	this.clientWidth = document.documentElement.clientWidth||document.body.clientWidth;
	this.clientHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if(this.left<50){
		this.left=0
	}
	else if(this.left>this.clientWidth-this.DragObj.offsetWidth-50){
		this.left = this.clientWidth-this.DragObj.offsetWidth
	}
	if(this.top<50){
		this.top=0;
	}
	else if(this.top>this.clientHeight-this.DragObj.offsetHeight-50){
		this.top = this.clientHeight-this.DragObj.offsetHeight
	}
	this.DragObj.style.left = this.left+'px';
	this.DragObj.style.top = this.top+'px';
};

My_AlertBox.prototype.myDialogDragUp = function(){
	// console.log('ready to unbind');
	document.removeEventListener('mousemove',eventHandler.mousemove,false);
	document.removeEventListener('mouseup',eventHandler.mouseup,false);
	if(this.DragObj.releaseCapture)this.DragObj.releaseCapture();
};

My_AlertBox.prototype.mydialog_mousemove = function(ev,_this){
	var oEvent = ev||event;
	_this.myDialogDragMove(oEvent);
};

My_AlertBox.prototype.mydialog_mouseup = function(ev,_this){
	// console.log('mydialog_mouseup');
	_this.myDialogDragUp();
};

window.My_AlertBox = My_AlertBox;

})();













