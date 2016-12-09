"use strict";

/**
 * 网络层配置
 *
 * @class netConfig
 * @constructor
 */
module.exports = {
	/**
     * 域 ip
     * @property host 
     * @type String
     */
	host: (function() {
           return "http://127.0.0.1";
           // return "http://10.100.77.123";
     })(),

	/**
     * 数据服务器端口
     * @property port 
     * @type Number
     */
	dataPort: 3333,

	/**
     * 预览服务器端口
     * @property previewPort 
     * @type Number
     */
	previewPort: 3330,

     /**
     * 上线服务器端口
     * @property onLineViewPort 
     * @type Number
     */
     onLineViewPort: 3330,

	/**
     * 公用返回对象
     * @property res 
     * @type Object
     */
	res: {
		/**
	     * 成功标识
	     * @property success 
	     * @type Object
	     */
		success: {
			code: 200,
			msg: "success"
		}
	}
}