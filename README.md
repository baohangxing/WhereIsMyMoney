# WhereIsMyMoney

## 介绍
&emsp; 俗话说“你不理财，财不理你”，对于每天花费的记录和管理不仅是一种好的生活习惯，而且有助于我们更加合理地管理我们的钱包，更好地规划我们的日常生活。
省钱比赚钱容易, 合理使用相关的互联网软件管理钱包, 也成为了日常需求之一。

&emsp; 这款多平台的个人在线记账系统使用Koa作为后端框架，采用前后分离的结构，web端主要使用Vue框架，
微信小程序和手机APP端使用H5混合APP开发框架uni-app。用户可以在不同的设备和平台上进行记账，
编辑账单类型，查看统计数据，各个平台同步数据，此外该系统还具备语音输入，账单导出，后台管理等功能，
保证系统的完整性，方便用户随时随地的使用，满足用户记账的需求。

经过测试，这是一个方便人们记账使用的系统。


## 主要功能

1. 用户可以在多端（web端, 手机移动端, 微信小程序端）进行注册，登录，记账并同步数据，在各个不同的平台上有着适合该设备的界面。
2. 用户可以选择时间，填写内容，金额，选择类型记一笔账，输入方式有传统的填写，语音输入的方式（手机端）。
3. 账单类型包括系统内置的多种收入或是支出的账单类型，还支持用户自定义账单类型。系统会根据记账的记录在所使用的设备上显示各种图表(柱状图和条形图)，生动的展示用户的花费情况，还支持导出数据报表以及发生邮件提醒的方式。
4. 在网页端提供管理员账户的登录界面，登录后可以查看用户的活跃情况，默认类型的编辑以及版本更新说明等操作。

## 系统结构

* ASRT-server 语音识别系统工程文件
* other 包括原型设计，logo，安卓封面图，安卓打包密钥等的一些设计文件和配置文件
* server Koa服务器工程文件
* whereismymoneyweb 个人记账系统的网页端工程文件
* whereismymoneywp 个人记账系统的手机端和微信小程序工程文件

#### 数据库

模型转存为 server/mySql 下的 mymoney.sql

#### 服务器

服务器框架使用的是基于nodejs的Koa2 web开发框架，使用Json web token的身份认证标准。下面介绍其他使用的一些技术或相关的库：
* Redis，一个数据结构服务器，作为持久化存储，定时存储的工具。
* Apidoc，一个生成nodejs接口文档的库。
* Crypto，一个提供加密界面的库。
* Ioredis，一个node连接redis的工具库。
* Jsonwebtoken， token生成管理的工具，用于登录验证。
* Mysql，一个node连接mysql数据库的工具库。
* Nodemailer， 一个node邮箱发送工具。
* Sequelize, 一个node关系数据库对象关系映射工具。
* Exceljs， 一个node环境下的excel生成、导出的相关的工具。
* 其他一些koa配套的工具/库, 如koa-bodyparser，koa-convert，koa-json，koa-jwt，koa-router，koa2-cors，https，querystring等。

&emsp; 后端服务器架构采用类MVC的架构模式，其中app.js为服务器入口，routes下的index.js统一管理路由分发，controller文件下的各个文件为各个模块的的业务逻辑处理，lib文件夹是一些引用库的实例化工具，middlewars为项目使用的中间件，model文件下是数据库的对象关系映射，负责管理数据库，public下为生成的api文档的网页资源，config下的config.js为统一的配置文件。

#### 语音识别系统

ASRT是一套基于深度学习实现的语音识别系统，本项目声学模型通过采用卷积神经网络（CNN），LSTM长短时记忆神经网络和连接性时序分类（CTC）方法，使用大量中文语音数据集进行训练，将声音转录为中文拼音，并通过语言模型，将拼音序列转换为中文文本。
参考见：https://github.com/nl8590687/ASRT_SpeechRecognition。

##### 相关参考

* Krizhevsky A , Sutskever I , Hinton G . ImageNet Classification with Deep Convolutional Neural Networks[J]. Advances in neural information processing systems, 2012, 25(2).
* Hochreiter S , Schmidhuber J . Long Short-Term Memory[J]. Neural computation, 1997, 9(8):1735-1780.
* Alex Graves, Santiago Fernández, Faustino Gomez. Connectionist temporal classification: Labelling unsegmented sequence data with recurrent neural networks[C]// International Conference on Machine Learning. ACM, 2006.

#### 微信小程序移动端

&emsp; 框架使用uni-app，一个使用 Vue.js 开发所有前端应用的框架，使用vuex做中心化状态管理, 使用scss作为css预处理工具。微信小程序移动端使用一套代码，多端编译之后在各个平台上运行，在编写代码是需要考虑不同平台的特性，通过uniapp的特性条件编译进行区别处理。

&emsp; assets中统一放置所有的样式字体和js资源，common下放置的是api文件，components放置的是组件文件，config下是统一配置文件，pages下是界面文件，static下是静态图片资源，store为中心化状态管理文件，main.js为工程入口，uni.scss为统一的项目样式资源。

#### 网页端

网页端使用vue框架。下面介绍其他使用的一些技术，组件或库：
* axios， 一个基于 promise 的 HTTP 库。
* echarts，一个使用 JavaScript 实现的开源可视化库。
* element-ui，一款基于Vue.js 2.0 的桌面端UI框架。
* vue-quill-editor， 一款Vue的富文本编辑器。
* vue-router，官方的路由管理器。
* vuex，Vue.js 应用程序开发的状态管理模式。
* stylus，一个css预处理工具
* eslint, 一个插件化的javascript代码检测工具。
* babel, 一个 JavaScript 编译器。

&emsp; 结构如下：api下放置的是统一api文件，components放置的是组件文件, config下是统一配置文件， views下是界面文件，static下是静态图片资源，router为路由管理文件， store为中心化状态管理文件，main.js为工程入口。

## 如何运行

1. 配置数据库
2. 一些config里的配置文件需要自行更改，包括数据库密码等配置，redis配置，邮箱配置，识别接口的key, uniapp的id, 打包密钥等等
3. 项目下个几个redeme有相关运行的说明
