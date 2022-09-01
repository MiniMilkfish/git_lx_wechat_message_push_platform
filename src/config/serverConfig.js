/**
 * 服务器配置、路由等
 */
const SERVER_CONFIG = {
    HOST: window.SERVER_HOST,	                												        //对应Server的HOST地址
    PORT: window.SERVER_PORT,																		    //对应Server的端口
    PREFIX: window.SERVER_PREFIX,
};

export const serverConfig = {
    SERVER_BASE_URL: `http://${SERVER_CONFIG.HOST}${SERVER_CONFIG.PORT.length > 0 ? (':' + SERVER_CONFIG.PORT) : ''}${SERVER_CONFIG.PREFIX.length > 0 ? ('/' + SERVER_CONFIG.PREFIX) : ''}`,
    SERVER_API: {
        GET_DEVICE_LIST: '/Device',                                                                         // 获取工地项目列表
        GET_USER_LIST: '/Users',                                                                            // 获取用户列表
        POST_UPLOAD_HTML: '/Page',                                                                          // 上传文件
        POST_SEND_MESSAGE: '/Templates/Send',                                                               // 推送消息
    },
    TEMPLATEID: window.MESSAGE_TEMPLATEID
};