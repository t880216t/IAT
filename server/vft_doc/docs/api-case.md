# 接口自动化用例

## 用例树结构
<div style="display:flex;flex-direction:row;">
![ui](/img/apitree.png)

- 用例树分为3层，鼠标右键出操作菜单：项目、模块分类、测试用例
- **项目**：在此设置全局参数设置
- **模块分类**：这个只是为了使用例树更加清晰，在实际生成jmeter可执行文件时，并不会受这个影响。
- **测试用例**：测试用例对应jmeter的http sample，包含用例的基本信息、请求设置、返回校验、参数化设置、调试用例等。

</div>

## 项目全局参数设置
### 全局参数

![ui](/img/globalvalue.png){.img-fluid tag=1}

全局参数在当前项目下，用例编辑中可以自动联想搜索。<br/>
这里参数分为2个类型：正式版、测试版

![ui](/img/values.gif){.img-fluid tag=2}
