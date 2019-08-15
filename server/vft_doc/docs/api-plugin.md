# 接口自动化扩展

可以在beanshell中加载自定义的jar包。

> 暂不支持界面插件的扩展，如果你有必须扩展界面的通用需求，可以给我提需求。

## 扩展自定义jar包

和Jmeter本身扩展方式一样，将你的jar包放到你的服务端的Jmeter的lib中。
```text
jmeter-path/lib
```

## 修改Jmeter模板

Jmeter模板位置
```text
server/templete.jmx
```
其中的jar包路径加到模板里，下面以 [fastjson-1.2.49.jar](https://mvnrepository.com/artifact/com.alibaba/fastjson) 为例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.0 r1840935">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
      <stringProp name="TestPlan.comments"></stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath">D:\xxxx\jmeter-path\lib\fastjson-1.2.49.jar</stringProp> //路径加到这里
    </TestPlan>
```

在Beanshell中使用fastjson

```java
import com.alibaba.fastjson.JSONObject;

// returnData为json字符串
JSONObject jsonObject = JSONObject.parseObject(returnData);
JSONObject data = jsonObject.getJSONObject("id");
System.out.println(data);

```
