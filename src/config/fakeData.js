export default {
    // 1 获取工地项目列表
    GET_REMOTE_SERVER_LIST: {
        code: 0,
        msg: "SUCCESS",
        data: [
            { projectid: 1, projectname: "上海建筑服务器" },
            { projectid: 2, projectname: "杭州建筑服务器" },
            { projectid: 3, projectname: "杭州道路服务器" }
        ]
    },
    // 2 获取项目设备列表
    POST_PROJECT_DEVICE_LIST: {
        code: 0,
        msg: "SUCCESS",
        data: {
            rows: [
                {
                    projectid: 1,
                    mncode: "LXHB0CS0306251",
                    projectname: "交通交通交通交通交通交通交通交通",
                    dust: 0.088,
                    date: "2020-11-11 11:11",
                    datastatus: 0,
                    switchlist: [
                        { deviceid: 1, switchstatus: 0 }
                    ]
                },
                {
                    projectid: 2,
                    mncode: "LXHB0CS0306252",
                    projectname: "产业信息信息信息信息信息信息信息信息信息信息",
                    dust: 0.058,
                    date: "2020-11-11 11:12",
                    datastatus: 0,
                    switchlist: [
                        { deviceid: 1, switchstatus: 1 }
                    ]
                },
                {
                    projectid: 3,
                    mncode: "LXHB0CS0306253",
                    projectname: "产业产业产业产业产业产业产业产业产业产业",
                    dust: 0.098,
                    date: "2020-11-11 11:10",
                    datastatus: 1,
                    switchlist: [
                        { deviceid: 1, switchstatus: 2 }
                    ]
                }
            ],
            total: 20
        }
    },
    // 3 获取工地项目详情
    GET_PROJECT_DEVICE_DETAIL: {
        code: 0,
        msg: "SUCCESS",
        data: {
            projectid: 1,
            projectname: "安亭镇国际汽车城核心区21B-13地块",
            projectcode: "11",
            projectaddress: "工地地址",
            projecttype: "工地类型",
            mncode: "LXHB0CS0306253",
            projectdistrict: "所属区县",
            linkman: "联系人",
            phone: "联系电话",
            projectfloorarea: "占地面积",
            projectunitname: "运维单位",
            switchlist: [
                { devicetype: 1, deviceid: "11", switchstatus: 0 },
                { devicetype: 2, deviceid: "22", switchstatus: 1 },
                { devicetype: 2, deviceid: "33", switchstatus: 2 },
                { devicetype: 2, deviceid: "44", switchstatus: 1 },
                { devicetype: 3, deviceid: "55", switchstatus: 2 }
            ]
        }
    },
    // 4 获取易微联用户账号列表
    GET_COOLKIT_USER_LIST: {
        code: 0,
        msg: "SUCCESS",
        data: [
            { phonenumber: "123" },
            { phonenumber: "1234" },
            { phonenumber: "12345" }
        ]
    },
    // 5 获取用户账号下的远程开关列表
    GET_SWITCH_LIST: {
        code: 0,
        msg: "SUCCESS",
        data: [
            {
                deviceid: "11",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "22",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "33",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "44",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "55",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "66",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "77",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "88",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "99",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "111",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "222",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "333",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "444",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "555",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            },
            {
                deviceid: "666",
                devicename: "devicename",
                apikey: "apikey",
                productmodel: "productmodel",
                devicekey: "devicekey",
                brandname: "brandname",
                familyid: "familyid",
                description: "description"
            }
        ]
    },
    // 6 提交工地项目与远程开关的绑定
    POST_PROJECT_SWITCH_BIND: {
        code: 0,
        msg: "SUCCESS"
    },
    // 7 提交远程开关的操作命令
    POST_SWITCH_OPERATE: {
        code: 0,
        msg: "SUCCESS"
    }
};