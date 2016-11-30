-----
## MingAlert插件使用方法
### 引入文件
1. 引入css &nbsp;:&nbsp;`<link rel=”stylesheet” href=”mingAlert.css”>`
2. 引入js&nbsp;:&nbsp;`<script src=”mingAlert”><script>`
3. 设置js,(注意，何时调用，则何时显示弹框)

> type 为alert类型，可填change，findback，register，login，content以及userDefine

````javascript
MingAlert(type,{
	content:'提示内容', type为content时需要，其他时候不需要
	maskBool:true, //是否显示蒙层，非必需默认为true
	cancelBool:false, //是否显示取消按钮，非必需默认为true
	titleBool:false,//是否需要标题，非必需默认为true
        title:'标题',//非必需
	success:function(){   //点击确认时调用的方法,非必须
			// console.log( M.getInputValue('emailLabel') )  //获取该id下input的value
			// M.toggleErr('emailLabel');//显示和隐藏错误提示消息
			// this.successBool = false;//这里设置可控点击按钮之后弹框消不消失
                        //  这里可以嵌套MingAlert('content',{})多个弹框
		},
	fail:function(){   //点击取消时调用的方法,非必需
		//this.successBool = false;   //这里设置可控点击按钮之后弹框消不消失,非必需
	}
})
````
#### 特别说明：userDefine类型

> 如果参数type为userDefine时则为自己组装的提示框,在第二个参数里添加

````javascript
defineLabel:[
		{id:'accountLabel',className:'m-label',tips:'用户名:',placeholder:'用户名',errTips:'错误：用户名格式不对'},
		{id:'accountLabel2',className:'m-label',tips:'用户名:',placeholder:'用户名',errTips:'错误：用户名格式不对'}
	]
````

实例代码:

````javascript
MingAlert('userDefine',{
	title:'自定义',
	defineLabel:[
		{id:'accountLabel',tips:'用户名:',placeholder:'用户名',errTips:'错误：用户名格式不对'},
		{id:'accountLabel2',tips:'用户名:',placeholder:'用户名',errTips:'错误：用户名格式不对'}
	]
})
````
