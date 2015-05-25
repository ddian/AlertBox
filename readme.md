# diandian\弹框使用说明
### 功能

- 弹框组件

### 特性

- 提供自定义提示内容
- 焦点管理
- 可拖拽

### 用法
- My_AlertBox为构造函数，需要new一个实例new My_AlertBox(string,callback)
- 调用实例方法alertConfirm()可让弹框出现
- 调用实例方法alertDestroy()可让弹框消失

### 参数：string

- 传入的字符串为弹框中出现的提示内容

### 参数：callback

- 传入的callback函数可以自定义

### Demo 一分钟教你写弹框

1、 新建一个HTML文件，为弹框准备一个可点击的按钮。
* HTML
```
<input type="button" value="按钮" id="btn"/>
```

2、 引入js文件
```
<script type="javascript/text" src="alertBox.js"></script>
```

3、创建<script></script>，绑定事件
```
var btn = document.getElementById('btn');
btn.addEventListener('click',alertEvent,false);
function alertEvent(){
    var box1 = new My_AlertBox('第一个弹框',function(){
        var box2 = new My_AlertBox('第二个弹框',function(){
            console.log('成功了')
        });
        box2.alertConfirm();
    });
    box1.alertConfirm();
}
```

