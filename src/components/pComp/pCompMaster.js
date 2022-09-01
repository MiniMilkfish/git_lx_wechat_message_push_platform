import React from 'react';
import {
	Layout,
	Button,
	Avatar,
	Input,
	List,
	Checkbox,
	Modal,
	Form,
	Select,
	Tooltip,
	Tag,
	Spin
} from 'antd';
import {
	UserOutlined,
	SearchOutlined,
	SettingOutlined
} from '@ant-design/icons';
import BraftEditor from 'braft-editor';	// 引入编辑器组件
import 'braft-editor/dist/index.css';	// 引入编辑器样式
import { SPLITWORDS } from '../../utils/common';
const { Header, Content } = Layout;
const { Option } = Select;

export const PCompMaster = (props) => {
	const {
		masterFormInfo,
		masterFormEvent
	} = props;

	const [form] = Form.useForm();

	const styles = {
		header: {
			height: '78px',
			background: '#2265DD',
			fontSize: 22,
			fontWeight: 600,
			alignItem: 'center',
			color: '#FFFFFF',
			paddingLeft: 57,
			display: 'flex'
		},
		headerAvatar: {
			height: 37,
			width: 36,
			marginTop: 21
		},
		headerTitle: {
			lineHeight: '78px',
			marginLeft: 12
		},
		contentSettingBtn: {
			textAlign: 'right',
			margin: "20px auto 15px",
			width: "1290px"
		},
		contentSendTools: {
			display: "flex",
			margin: "0 auto",
			width: "1290px"
		},
		toolsSearchbox: {
			width: '430px',
			height: '44px',
			boxShadow: "0px 2px 6px 3px rgb(210 210 210 / 60%)",
			borderRadius: "3px",
			marginBottom: '8px'
		},
		toolsSearchResultContainer: {
			width: '430px',
			height: '683px',
			boxShadow: "0px 2px 6px 3px rgb(210 210 210 / 60%)",
			borderRadius: "3px",
			background: '#F1F8FF'
		},
		toolsSearchResultAllCheck: {
			width: '430px',
			height: '40px',
			borderBottom: '1px solid #D2D2D2',
			paddingLeft: '16px',
			paddingTop: '9px'
		},
		toolsSearchResultList: {
			width: '430px',
			height: '640px',
			overflow: 'auto'
		},
		toolsSearchListItem: {
		},
		toolsContentRightEdit: {
			width: "840px",
			height: "735px",
			border: "1px solid #D2D2D2",
			boxShadow: "0px 2px 6px 3px rgb(210 210 210 / 60%)",
			borderRadius: "3px",
			background: "#FFFFFF",
			boxSizing: "border-box",
			marginLeft: "20px"
		},
		toolsContentSendBtn: {
			textAlign: 'right',
			padding: "14px 24px",
		}
	};

	return (
		<div className="container">
			<Spin tip={masterFormInfo.spinOptions.tip} spinning={masterFormInfo.spinOptions.spinning} size='large'>
				<Layout style={{ background: "none" }}>
					<Header style={styles.header}>
						<Avatar style={styles.headerAvatar} shape="square" src={process.env.PUBLIC_URL + './logo.png'} />
						<div style={styles.headerTitle}>龙象环保微信公众号消息推送平台</div>
					</Header>
					<Content>
						<div style={styles.contentSettingBtn}>
							<Button
								type="primary"
								shape='round'
								icon={<UserOutlined />}
								size="large"
								onClick={() => {
									form.resetFields();
									masterFormEvent.settingModalVisible();
								}}
							>设置微信用户</Button>
						</div>
						<div className='sendTools' style={styles.contentSendTools}>
							<div className='leftList'>
								<Input
									size="large"
									placeholder='工地名称/关键字 "回车"后搜索'
									allowClear
									suffix={<SearchOutlined />}
									style={styles.toolsSearchbox}
									onPressEnter={masterFormEvent.buildingListFilter.bind(this)}
								/>
								<div style={styles.toolsSearchResultContainer}>
									<Checkbox
										style={styles.toolsSearchResultAllCheck}
										onChange={masterFormEvent.buildingListChecked.bind(this, true, undefined)}
										indeterminate={
											masterFormInfo.searchConditions.buildingCheckedList.length !== 0 &&
											masterFormInfo.searchConditions.buildingCheckedList.length !== masterFormInfo.searchConditions.buildingList.length
										}
										checked={masterFormInfo.searchConditions.buildingCheckedList.length === masterFormInfo.searchConditions.buildingList.length}
									>当前选中数量&nbsp;<Tag color="#f50">{masterFormInfo.searchConditions.buildingCheckedList.length} / {masterFormInfo.buildingList.bindBuildingList.length}</Tag>&nbsp;个</Checkbox>
									<List
										style={styles.toolsSearchResultList}
										size="small"
										split={false}
										bordered={false}
										dataSource={masterFormInfo.searchConditions.buildingList}
										renderItem={item => (
											<List.Item style={styles.toolsSearchListItem}>
												<Checkbox
													onChange={masterFormEvent.buildingListChecked.bind(this, false, item.mnCode)}
													checked={masterFormInfo.searchConditions.buildingCheckedList.includes(item.mnCode)}
												>
													<Tooltip placement="right" title={item.mnCode}>
														{item.description}
													</Tooltip>
												</Checkbox>
											</List.Item>
										)}
									/>
								</div>
							</div>
							<div className='rightEdit' style={styles.toolsContentRightEdit}>
								<BraftEditor style={{ height: '673px', borderBottom: "1px solid #D2D2D2" }} contentStyle={{ height: "580px" }} value={masterFormInfo.editorState} onChange={masterFormEvent.editorChange} />
								<div style={styles.toolsContentSendBtn}>
									<Button
										type="primary"
										style={{ width: '114px' }}
										onClick={masterFormEvent.messageSend.bind(this)}
										disabled={masterFormInfo.editorState.toHTML().length === 7 || masterFormInfo.searchConditions.buildingCheckedList.length === 0}
									>
										推送
									</Button>
								</div>
							</div>
						</div>
					</Content>
				</Layout>
				<Modal
					title={<span><SettingOutlined />&nbsp;&nbsp;设置微信用户</span>}
					visible={masterFormInfo.settingModalOptions.modalVisible}
					okText="绑定"
					cancelText="取消"
					width={800}
					onOk={() => {
						form.validateFields().then((values) => {
							form.resetFields();
							masterFormEvent.settingOptionSubmit(values);
						}).catch((info) => {
							console.log('Validate Failed:', info);
							// 警告
						})
					}}
					onCancel={masterFormEvent.settingModalVisible.bind(this)}
				>
					<Form
						name="settingModal"
						form={form}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 20 }}
					>
						<Form.Item
							label="微信用户"
							name="openId"
							rules={[
								{
									required: true,
									message: '绑定的用户为必选项',
								},
							]}
						>
							<Select
								placeholder="请选择要绑定的用户"
								onChange={() => { }}
								allowClear
								showSearch
							>
								{
									masterFormInfo.userList.map(function (item, index) {
										return (
											<Option value={item.openId} key={index}>{item.nickname}</Option>
										);
									})
								}
							</Select>
						</Form.Item>

						<Form.Item
							label="微信备注"
							name="nickname"
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="工地名称"
							name="mnCode"
							rules={[
								{
									required: true,
									message: '绑定的工地为必选项',
								},
							]}
						>
							<Select
								placeholder="请选择要绑定的工地"
								onChange={() => { }}
								allowClear
								showSearch
							>
								{
									masterFormInfo.buildingList.allBuildingList.map(function (item, index) {
										return (
											<Option value={item.mnCode + SPLITWORDS + item.description} key={index}>{item.description}</Option>
										);
									})
								}
							</Select>
						</Form.Item>
					</Form>
				</Modal>
			</Spin>
		</div >
	);
};
