define(function(){
	var Show = function(str,fn){
		var _this = this;
		str = str||'警告';
		fn = fn||'';
		this.oNewDiv = document.createElement('div');
		this.oNewDiv.className='alertConfirm';
		this.oNewDiv.innerHTML = '<div class="mask" id="alerMask"></div>\
	<div class="dialog borderRadius" id="alerDialog">\
		<h3>温馨提示:</h3>\
		<div class="dialogContent">\
			<p>\
				<i></i>\
				<span class="borderRadius">'+str+'</span>\
			</p>\
		</div>\
		<div class="dialogfooter" id="dialogBtn">\
			<a href="javascript:;" class="borderRadius">取消</a>\
			<a href="javascript:;" class="borderRadius">确定</a>\
		</div>\
		<a class="dialogClose" title="关闭" id="dialogCloseBtn"></a>\
	<div>';
		document.body.appendChild(this.oNewDiv);
		this.AlerBtn = document.getElementById('alerBtn');
		
		this.AlerBtn.onclick = function(){
			_this.AlerBtnClick();
		}

		this.oDialogBtn = document.getElementById('dialogBtn').getElementsByTagName('a');
		this.oDialogCloseBtn = document.getElementById('dialogCloseBtn');
		this.oDialogBtn[0].onclick =this.oDialogCloseBtn.onclick=function(){
			_this.fnClick();
		};
		
		this.oDialogBtn[1].onclick = function(){
			_this.fnClick();
			fn&&fn();
		};

	}
	Show.prototype.AlerBtnClick = function(){
		this.oNewDiv.style.display = 'block';
		
	}
	Show.prototype.fnClick = function(){
		this.oNewDiv.style.display = 'none';
	}
    return Show;
})