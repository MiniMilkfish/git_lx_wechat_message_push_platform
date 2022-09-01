/**
 * 通用组件： 全局消息通知
 */
import { notification } from 'antd';

export const NOTIFICATION_TYPE = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning'
};

export const CommonCompNotification = options => {
	const {
		type,
		msg,
		desc
	} = options;

	let nOptions = {};
	if (msg) nOptions.message = msg;
	if (desc) nOptions.description = desc;

	return notification[type || 'open'](nOptions);
};