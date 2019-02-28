/* 项目配置.基于默认配置,可以通过
 http://www.example.com/PUBLIC_PATH/web_adapter/adapter.html
访问自己的 app.如有修改,请对应变换访问地址即可.

服务器静态部署目录 PUBLIC_PATH,默认为用户 appId
*/

/* ==================== 用户相关配置.可根据需要,灵活修改. ============= */
/* app 入口文件. */
var APP_INDEX_PATH = 'index.html'

/* ====================== 以下适配器相关配置,一般不需要修改.=================== */
/* 适配器入口文件. */
var WEB_ADAPTER_INDEX_PATH = 'web_adapter/adapter.html'

/* 适配器核心js文件. */
var WEB_ADAPTER_CORE_JS_PATH = 'web_adapter/script/adapter.js'

/* =================== 应用和模块相关信息.一般由 APICloud 服务器自动生成.============= */
var PUBLIC_PATH = '/'

var APP_INFO = {
  appId: '',
  version: '1.0.0',
  appVersion: '00.00.01',
  appName: 'apicloud'
}

var MODULES_INFO = [{
    "name":"mam",
    "class":"UZMAM",
    "methods":["checkUpdate","addEvent","execCommand","showToastAlert","hideToastAlert"],
    "syncMethods":["syncExecCommand"],
    "launchClassMethod":"launch"
}
,{
	"name":"UIInput",
	"class":"UZUIInput",
	"methods":["open","resetPosition","show","hide","close","value","insertValue","setAttr","popupKeyboard","closeKeyboard","addEventListener","getSelectedRange"]
}
]
