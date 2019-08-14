# WEB UI自定义库扩展
Robotframework的强大的之处，在于它依赖python生态圈，拥有庞大的三方库支持。实际的项目中，我们可能还需要根据需求自定义一些库。<br />
VFT中同样支持扩展，创建自定义词库，这个可以参考RF的教程。

如：[创建robotframework自定义词库](https://www.jianshu.com/p/d45d9515884b)

## 生成库描述文件
无论是自定义的词库，还是第三方的成熟词库，都可以通过RF的robot.libdoc的生成库描述文件。<br />
这里以seleniumLibrary为例子

``` python
$ python -m robot.libdoc SeleniumLibrary SeleniumLibrary.html
```

## 获取关键词数据
我们所需的关键词数据就在生成的html文件中。
文件中搜索‘libdoc = ’，我们的关键词数据就是这个。
例如我上面教程中生成的自定义库：
``` text
libdoc = {"all_tags":[],"contains_tags":false,"doc":"<p>Documentation for library <code>CustomLibrary\x3c/code>.\x3c/p>","generated":"2019-08-14 16:49:52","inits":[],"keywords":[{"args":["msg"],"doc":"","matched":true,"name":"Custom Log","shortdoc":"","tags":[]}],"name":"CustomLibrary","named_args":true,"scope":"global","version":""};
```

## 导入数据库
复制获取的关键词数据到 server/scripts/data.py 中，执行 syncRFLib2DB.py 脚本导入到数据库中。
``` bash
$ python syncRFLib2DB.py
```
