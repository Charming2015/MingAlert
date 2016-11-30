var M = {
	getByID : function(id){
		return typeof id === "string" ? document.getElementById(id) : id
	},
	getByClass: function(sClass, oParent){
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.getByTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	getByTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	},
	on : function(id , type , fn){	
		var dom = this.getByID(id) ;
		if( dom.addEventListener ){
			dom.addEventListener( type , fn , false )
		}else if(dom.attachEvent){
			dom.attachEvent('on' + type , fn )
		}else{
			dom['on' + type ] = fn;
		}
	},
	show:function(id){
		var dom = this.getByID(id);
		dom.style.display = 'block';
	},
	hide:function(id){
		var dom = this.getByID(id);
		dom.style.display = 'none';
	},
	getInputValue:function(id){
		return M.getByClass('m-input',M.getByID(id))[0].value;
	},
	toggleErr:function(id){
		var dom = M.getByClass('m-err',M.getByID(id))[0];
		if( dom.style.display == 'block' ){
			dom.style.display = 'none'
		}else{
			dom.style.display = 'block'
		}
	}
}

//模板类 基础提示框 data 渲染数据
var Alert = function(data){
	// 如果没有数据，防止后面程序执行
	if(!data) return ;
	// 设置内容
	this.content = data.content;
	// 是否产生蒙层，是否生成取消按钮
	this.maskBool = data.maskBool == undefined ? true : data.maskBool;
	this.cancelBool = data.cancelBool == undefined ? true : data.cancelBool;
	this.titleBool = data.titleBool == undefined ? true : data.titleBool;
	// 设置内容
	this.contentNode = document.createElement('div');
	this.contentNode.className = 'a-content';
	// 设置蒙层
	this.mask = document.createElement('div');
	this.mask.className = 'ming_mask'
	this.mask.id = 'ming_mask'
	// 设置面板
	this.panel = document.createElement('div');
	this.panel.className = 'ming_alert';
	this.panel.id = 'ming_alert';
	// 标题
	this.titleNode = document.createElement('p');
	this.titleNode.className = 'a-title';
	// 设置按钮框
	this.btnWarp = document.createElement('div');
	this.btnWarp.className = 'btnWarp';
	// 设置确定框
	this.confirmBtn = document.createElement('span');
	this.confirmBtn.className = 'a-confirm';
	this.confirmBtn.innerHTML = data.confirm || '确定';
	// 设置取消框
	this.cancelBtn = document.createElement('span');
	this.cancelBtn.className = 'a-cancel';
	this.cancelBtn.innerHTML = data.cancel || '取消';
	// 设置关闭按钮
	this.closeBtn = document.createElement('b');
	this.closeBtn.className = 'a-close';
	this.closeBtn.innerHTML = 'X';
	// 点击确定和关闭执行的函数
	this.success = data.success || function(){};
	this.fail = data.fail || function(){};
}
Alert.prototype = {
	init : function(){
		// 加入到dom
		this.panel.appendChild(this.closeBtn);
		if(this.titleBool)this.panel.appendChild(this.titleNode);
		this.panel.appendChild(this.contentNode);
		this.btnWarp.appendChild(this.confirmBtn);
		if(this.cancelBool) this.btnWarp.appendChild(this.cancelBtn)
		this.panel.appendChild(this.btnWarp);
		// 判断是否已经有mask和alert框，有的话就清掉。
		this.clearExist()
		// 判断是否生成蒙层的操作
		if(this.maskBool){
			this.mask.appendChild(this.panel);
			document.body.appendChild(this.mask);
		}else{
			document.body.appendChild(this.panel);
		}
		
		this.bindEvent();
		this.show();
	},
	bindEvent:function(){
		var me = this ; 
		this.closeBtn.onclick = function(){
			me.fail();
			me.hide();
		}
		this.cancelBtn.onclick = function(){
			me.fail();
			if(!me.successBool) {me.successBool = true;return false};
			me.hide();
		}
		this.confirmBtn.onclick = function(){
			me.success();
			if(!me.successBool) {me.successBool = true;return false};
			me.hide();
		}
	},
	hide : function(){
		this.panel.style.display = 'none';
		this.mask.style.display = 'none';

	},
	show : function(){
		this.panel.style.display = 'block';
		this.mask.style.display = 'block';
	},
	
	clearExist:function(){
		var ming_alert = M.getByID('ming_alert');
		if(ming_alert){
			ming_alert.parentNode.removeChild(ming_alert);
		}
		var ming_mask = M.getByID('ming_mask');
		if(ming_mask){
			ming_mask.parentNode.removeChild(ming_mask);
		}
	},
	createFactory:function(data){
		for( var num in data ){
			var thisData = data[num]
			this.labelName = document.createElement('label');
			this.labelName.id = thisData.id;
			this.labelName.className = 'm-label';
			var placeholder = thisData.placeholder || '';
			var errTips = thisData.errTips || '';
			this.labelName.innerHTML = '<p class="m-tips">'+ thisData.tips +'</p><input class="m-input" placeholder="'+ thisData.placeholder +'"><span class="m-err" style="display: none">'+ thisData.errTips +'</span>';
			this.contentNode.appendChild(this.labelName)
		}
	}
}
var MingAlert = function (type , data){
	var data = data == undefined ? {}:data;
	var normalTitle = '默认标题';
	var labelList;
	switch(type){
		case 'change':
			normalTitle = '修改密码';
			labelList = [
			{id:'emailLabel',tips:'邮箱:',placeholder:'邮箱',errTips:'错误：邮箱格式不对'},
			{id:'oldPasswordLabel',tips:'旧密码:',placeholder:'旧密码',errTips:'错误：密码错误'},
			{id:'newPasswordLabel',tips:'新密码:',placeholder:'新密码',errTips:'错误：密码错误'},
			{id:'confirmPwLabel',tips:'确认密码:',placeholder:'确认密码',errTips:'错误：两次输入密码不一致'}
			];
			break;
		case 'findback':
			normalTitle = '找回密码';
			labelList = [
			{id:'emailLabel',tips:'邮箱:',placeholder:'邮箱',errTips:'错误：邮箱格式不对'},
			]
			break;
		case 'register':
			normalTitle = '注册';
			labelList = [
				{id:'accountLabel',tips:'用户名:',placeholder:'用户名',errTips:'错误：用户名格式不对'},
				{id:'emailLabel',tips:'邮箱:',placeholder:'邮箱',errTips:'错误：邮箱格式不对'},
				{id:'passwordLabel',tips:'密码:',placeholder:'密码',errTips:'错误：密码错误'},
				{id:'confirmPwLabel',tips:'确认密码:',placeholder:'确认密码',errTips:'错误：两次输入密码不一致'}
			]
			break;	
		case 'login':
			normalTitle = '登录';
			labelList = [
				{id:'accountLabel',tips:'用户名:',placeholder:'用户名/邮箱',errTips:'错误：用户名格式不对'},
				{id:'passwordLabel',tips:'密码:',placeholder:'密码',errTips:'错误：密码错误'}
			]
			break;	
		case 'userDefine':
			normalTitle = '标题';	
			if(data.defineLabel) labelList = data.defineLabel;
			break;	
		default:
			normalTitle = '标题'	
			break;
	}
	// 创建实例
	var normalAlert = function(data){
		Alert.call(this , data);
		this.titleNode.innerHTML = data.title||normalTitle;
		if(type == 'content' )this.content = data.content||'默认内容';
		this.successBool = true;
	}
	// 继承alert
	normalAlert.prototype = new Alert();
	// 加入实例自己的方法
	normalAlert.prototype.init = function(){
		if(type == 'content' ){
			this.contentNode.innerHTML = this.content;
		}else{
			this.createFactory(labelList)
		}
		Alert.prototype.init.call(this);
	}
	// 生成实例
	new normalAlert(data).init()
}

