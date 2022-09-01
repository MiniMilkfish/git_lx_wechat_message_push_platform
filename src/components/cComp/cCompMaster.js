import React, { Component } from 'react';
import BraftEditor from 'braft-editor'
import { PCompMaster } from '../pComp/pCompMaster';
import * as COMMON from '../../utils/common';
import { serverConfig } from '../../config/serverConfig';
import { CommonCompNotification, NOTIFICATION_TYPE } from "../commonComp/commonCompNotification";

class CCompMaster extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			tabsIcon: ['desktop', 'file', 'hdd', 'folder', 'mobile', 'tablet', 'tag', 'windows', 'user'],
			windowHeight: 768,
			windowWidth: 1366,
			spinOptions: {
				spinning: false,
				tip: ""
			},
			editorState: BraftEditor.createEditorState(null),
			settingModalOptions: {
				modalVisible: false,
				formValues: {
					/**
					 * @attr {String} openId
					 * @attr {String} nickname
					 * @attr {String} mnCode
					 */
				}
			},
			buildingList: {
				allBuildingList: [],			// 工地列表
				bindBuildingList: []			// 已绑定的工地列表
				/**
				 * description: String
				 * mnCode: String
				 * users: Array
				 */
			},
			searchConditions: {
				searchWords: '',
				buildingList: [],
				buildingCheckedList: [],			// 工地选中列表
			},
			userList: [
				// {
				// 	"openId": "",
				// 	"nickname": "",
				// 	"mnCode": ""
				// }
			],
		};

		this.onWindowResize = this._handleOnWindowResize.bind(this);
		this.editorChange = this._handleEditorChange.bind(this);
		this.settingModalVisible = this._handleSettingModalVisible.bind(this);
		this.settingOptionSubmit = this._handleSettingOptionSubmit.bind(this);
		this.buildingListQuery = this._handleBuildingListQuery.bind(this);
		this.userListQuery = this._handleUserListQuery.bind(this);
		this.buildingListFilter = this._handleBuildingListFilter.bind(this);
		this.buildingListChecked = this._handleBuildingListChecked.bind(this);
		this.messageSend = this._handleMessageSend.bind(this);
	}

	render() {
		const pCompMasterProps = {
			masterFormInfo: {
				editorState: this.state.editorState,
				settingModalOptions: this.state.settingModalOptions,
				buildingList: this.state.buildingList,
				searchConditions: this.state.searchConditions,
				userList: this.state.userList,
				spinOptions: this.state.spinOptions
			},
			masterFormEvent: {
				editorChange: this.editorChange,
				settingModalVisible: this.settingModalVisible,
				settingOptionSubmit: this.settingOptionSubmit,
				buildingListFilter: this.buildingListFilter,
				buildingListChecked: this.buildingListChecked,
				messageSend: this.messageSend
			}
		};

		return <PCompMaster {...pCompMasterProps} />;
	}

	static getDerivedStateFromProps(nextProps, _prevState) {
		return { ...nextProps };
	}

	componentDidMount() {
		let _this = this;
		this.setState({
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth
		}, function () {
			_this.buildingListQuery();
			_this.userListQuery();
		});

		window.addEventListener('resize', this.onWindowResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize)
	}

	//#region 自定义方法
	_handleEditorChange(editorState) {
		this.setState({ editorState })
	}

	/**
	 * 工地列表获取
	 */
	_handleBuildingListQuery() {
		let _this = this;
		const reqUrl = serverConfig.SERVER_BASE_URL + serverConfig.SERVER_API.GET_DEVICE_LIST,
			reqParams = {
				bind: true
			};

		this.setState({
			spinOptions: {
				spinning: true,
				tip: '工地列表更新中~'
			}
		}, () => {
			// 全部工地列表
			COMMON.handleCommonHttpRequest(reqUrl, "GET", {}, function (res, err) {
				if (err) return;

				_this.setState({
					buildingList: {
						..._this.state.buildingList,
						allBuildingList: [].concat(res.datas)
					}
				}, function () {
					// 已绑定的工地列表
					COMMON.handleCommonHttpRequest(reqUrl, "GET", reqParams, function (res, err) {
						if (err) return;

						_this.setState({
							buildingList: {
								..._this.state.buildingList,
								bindBuildingList: [].concat(res.datas)
							},
							searchConditions: {
								..._this.state.searchConditions,
								buildingList: [].concat(res.datas)
							},
							spinOptions: {
								spinning: false,
								tip: ''
							}
						});
					});
				});
			});
		})
	}

	/**
	 * 用户列表获取
	 */
	_handleUserListQuery() {
		let _this = this;
		const reqUrl = serverConfig.SERVER_BASE_URL + serverConfig.SERVER_API.GET_USER_LIST;

		COMMON.handleCommonHttpRequest(reqUrl, "GET", {}, function (res, err) {
			if (err) return;

			_this.setState({
				userList: [].concat(res.datas)
			});
		});
	}

	/**
	 * 工地列表搜索事件
	 */
	_handleBuildingListFilter(e) {
		let searchWords = e.target.value;
		let matchedList = this.state.buildingList.bindBuildingList.filter(function (item) {
			return item.description.includes(searchWords) || item.mnCode.includes(searchWords);
		});

		this.setState({
			searchConditions: {
				...this.state.searchConditions,
				searchWords: searchWords,
				buildingList: [].concat(matchedList)
			}
		});
	}

	/**
	 * 全选 / 单选
	 * @param {Boolean} isCheckAll 
	 * @param {String} mnCode 
	 * @param {Object} event 
	 */
	_handleBuildingListChecked(isCheckAll, mnCode, event) {
		let currentChecked = event.target.checked;
		let buildingCheckedList = [];

		if (isCheckAll) {
			if (currentChecked) buildingCheckedList = this.state.searchConditions.buildingList.map(item => item.mnCode);
		} else {
			buildingCheckedList = [].concat(this.state.searchConditions.buildingCheckedList);

			if (currentChecked) {
				buildingCheckedList.push(mnCode);
			} else {
				buildingCheckedList.splice(buildingCheckedList.findIndex(_mnCode => _mnCode === mnCode), 1);
			}
		}

		this.setState({
			searchConditions: {
				...this.state.searchConditions,
				buildingCheckedList: [].concat(buildingCheckedList)
			}
		});
	}

	/**
	 * 窗口尺寸变更事件
	 */
	_handleOnWindowResize() {
		this.setState({
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth
		})
	}

	/**
	 * 设置面板显示/隐藏
	 */
	_handleSettingModalVisible() {
		let _this = this;
		this.setState({
			settingModalOptions: {
				...this.state.settingModalOptions,
				modalVisible: !_this.state.settingModalOptions.modalVisible,
			}
		})
	}

	/**
	 * 设置微信用户表单提交
	 * @param {Object} formValues 
	 */
	_handleSettingOptionSubmit(formValues) {
		let _this = this;
		this.setState({
			settingModalOptions: {
				...this.state.settingModalOptions,
				modalVisible: !_this.state.settingModalOptions.modalVisible,
				formValues: Object.assign(formValues)
			},
			spinOptions: {
				...this.state.spinOptions,
				spinning: true,
				tip: '微信用户绑定中~'
			}
		}, function () {
			const reqUrl = `${serverConfig.SERVER_BASE_URL}/Users/${formValues.openId}/infomation`,
				reqParams = {
					mnCode: formValues.mnCode.split(COMMON.SPLITWORDS)[0],
					remark: formValues.nickname || ''
				};

			COMMON.handleCommonHttpRequest(reqUrl, "PUT", reqParams, function (res, err) {
				if (err) return;

				if (res) {
					_this.buildingListQuery();
					CommonCompNotification({
						type: NOTIFICATION_TYPE.SUCCESS,
						msg: "微信用户绑定",
						desc: "绑定成功"
					});
				} else {
					// 绑定失败
					CommonCompNotification({
						type: NOTIFICATION_TYPE.ERROR,
						msg: "微信用户绑定",
						desc: "绑定失败"
					});
				}
			}, false, true, COMMON.MIME_TYPE.FORM);
		})
	}

	/**
	 * 消息推动
	 */
	_handleMessageSend() {
		let _this = this;
		const htmlContent = this.state.editorState.toHTML();
		let fullHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body>' + htmlContent + '</body></html>';

		const reqUrl = `${serverConfig.SERVER_BASE_URL}${serverConfig.SERVER_API.POST_UPLOAD_HTML}`,
			reqForSendUrl = `${serverConfig.SERVER_BASE_URL}${serverConfig.SERVER_API.POST_SEND_MESSAGE}`;

		this.setState({
			spinOptions: {
				...this.state.spinOptions,
				spinning: true,
				tip: '消息推送中~'
			}
		}, function () {
			COMMON.handleCommonHttpRequest(reqUrl, "POST", fullHtml, function (linkId, err) {
				if (err) return;

				if (linkId) {
					let reqParams = {
						mnCodes: _this.state.searchConditions.buildingCheckedList,
						url: reqUrl + '/' + linkId,
						templateId: serverConfig.TEMPLATEID
					};
					COMMON.handleCommonHttpRequest(reqForSendUrl, "POST", reqParams, function (_res, err) {
						if (err) return;

						_this.setState({
							spinOptions: {
								..._this.state.spinOptions,
								spinning: false,
							}
						}, function () {
							CommonCompNotification({
								type: NOTIFICATION_TYPE.SUCCESS,
								msg: "消息推送",
								desc: "推送成功"
							});
						});
					}, false, true, COMMON.MIME_TYPE.JSON);
				} else {
					_this.setState({
						spinOptions: {
							..._this.state.spinOptions,
							spinning: false,
						}
					}, function () {
						CommonCompNotification({
							type: NOTIFICATION_TYPE.ERROR,
							msg: "消息推送",
							desc: "获取网页ID失败~"
						});
					});
				}
			}, false, true, COMMON.MIME_TYPE.TEXT);
		});
	}
	//#endregion

}

export default CCompMaster;