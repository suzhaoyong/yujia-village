//引入mockjs
const Mock = require('mockjs')

//使用mockjs模拟数据
// Mock.mock(/\/api\/v1\/children\/\S+\/snap\/\S+\/qr-code/, (req, res) => {
//     return {
//         code: 0,
//         status:200,
//         data: [{
//           name: 'xxx'
//         }]
//     }
// })
const classList =  Mock.mock('/v1/school/backend/v1/kid-staff/grade-class', {
    status: 200,
    exception: "",
    code: 0,
    message: "",
    data: {
        items: [{
            grade: "2019级",
            class: [
                "1班",
                "2班"
            ]
        },{
            grade: "2018级",
            class: [
                "1班",
                "2班",
                "3班"
            ]
        },{
            grade: "2017级",
            class: [
                "1班",
                "2班",
                "3班",
                "4班",
            ]
        }]
    }
});

const studentsList = Mock.mock('/v1/kid-staff/98/pass-log?grade=2015&class=2', {
    status: 200,
    exception: "",
    code: 0,
    message: "",
    data: {
        items: [
           {
                id: "1",
                face_img: "https://tse4-mm.cn.bing.net/th?id=OIP.Wo0E2kACycBZa4AF_UoUjwAAAA&w=198&h=196&c=7&o=5&pid=1.7",          
                true_name: "韩大闽",
                class: "2016级1班",
                qr_code: "dfafflkh",  
                created_at: "08:27:00",    
           },
           {
                id: "2",
                face_img: "https://tse1-mm.cn.bing.net/th?id=OIP.dFr0K3P30nEyFdFXvjFoYgAAAA&w=199&h=199&c=7&o=5&pid=1.7",
                true_name: "周智勤",
                class: "港航1班",
                qr_code: "dfafflkh",  
                created_at: "08:27:00",    
           },
           {
                id: "3",
                face_img: "https://tse4-mm.cn.bing.net/th?id=OIP.KjZvunf_mO59QZublXs1gQAAAA&w=201&h=200&c=7&o=5&pid=1.7",          
                true_name: "欧姐",
                class: "翻译2班",
                qr_code: "dfafflkh",  
                created_at: "08:27:00",    
           },
        ]
    }
});
const studentsList1 = Mock.mock('/app/v1/children/98/pass-log', {
    status: 200,
    exception: "",
    code: 0,
    message: "",
    data: {
        items: [
           {
            idcards:'320682199109225792',
            face_img: "https://tse4-mm.cn.bing.net/th?id=OIP.Wo0E2kACycBZa4AF_UoUjwAAAA&w=198&h=196&c=7&o=5&pid=1.7",          
                true_name: "韩大闽",
           },
           {
                idcards:'123',
                face_img: "https://tse1-mm.cn.bing.net/th?id=OIP.dFr0K3P30nEyFdFXvjFoYgAAAA&w=199&h=199&c=7&o=5&pid=1.7",
                true_name: "周智勤",
           },
           {
                idcards:'456',
                face_img: "https://tse4-mm.cn.bing.net/th?id=OIP.KjZvunf_mO59QZublXs1gQAAAA&w=201&h=200&c=7&o=5&pid=1.7",          
                true_name: "欧姐",
           },
        ]
    }
});
export default {classList,studentsList,studentsList1};