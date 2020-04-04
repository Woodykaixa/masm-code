# masm-code README

## 开发背景
这学期我们学校（北京工业大学）在上8086汇编课程，使用Masm for Windows写汇编程序。而Masm for Windows这个软件，UI丑，部分功能还收费。于是我写了这个扩展。（也就是说，这个扩展是我出来写作业用的，你可以用这个扩展写8086汇编，但是体验可能不如其他扩展/IDE/编辑器好）

## 功能

+ Intel 8086汇编的语法高亮
+ Intel 8086汇编的代码片段
+ 自动下载Masm和DOSBox。无需手动配置
+ 通过VSCode命令启动DOSBox，自动进入工作区文件夹，自动配置Masm环境变量
+ 一条指令自动编译运行代码

## 注意
+ 本扩展是为北京工业大学汇编语言程序设计课程制作的，所用到的组件(DOSBox, ML, .etc)也是根据考试内容和作业内容下载的，不存在因为某个工具更好用就替换的情况。
+ 本扩展提供的语言功能仅限于北京工业大学汇编语言程序设计课程大纲内的语法，超出部分不与实现（我不会）。
+ 如果遇到bug，或者你有什么想法，发[issue](https://github.com/Woodykaixa/masm-code/issues)，不要加我qq(我害怕)

## 安装要求

无！有手就能用！

## 使用方式

按下<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>。在上方弹出的输入框中输入`启动DOSBox`或`在DOSBox中编译运行`（选择第二个选项就不需要看后面的内容了），然后按<kbd>Enter</kbd>（其实也可以用鼠标点）。然后DOSBox就会启动，并且转到当前编辑器所打开的文件的路径，输入`ML 文件名`，按下回车即可生成EXE文件，然后输入生成的EXE文件名，按下回车即可运行。你也可以使用`MASM.EXE`和`LINK.EXE`分别编译链接。关于调试程序，本扩展自动下载了`DEBUG.EXE`用于调试。

## 设置

目前可以在`settings.json`中设置DOSBox的窗口大小,默认为1024*768。你也可以自行修改为你觉得爽的大小。
```json
    {
        "masm-code.DOSBox.BoxWidth": 1024,
        "masm-code.DOSBox.BoxHeight": 768
    }
```

## 可能存在的bug

+ 有的时候，如果你缺少了masm或者dosbox的文件，他会显示正在下载，然后不动了。怎么办呢。打开目录`C:/Users/你的名字/AppData/Roaming/Code/User/globalStorage/kaixa.masm-code/`把里面大小为0kb的删掉，然后重启vscode。（我还没学会怎么重新加载扩展qaq）
+ 语法高亮可能也存在一些问题，因为我也刚学汇编没几天qaq
+ 其他bug，遇到的我都解决了，但是我感觉可能还是会遇到奇奇怪怪的问题。这时候你可以在[这里](https://github.com/Woodykaixa/masm-code/issues)反馈