const error = function (app,nodesc,message,description=NaN) {
    app.$Notice.error({
        title: message,
        desc: nodesc&&description ?  description : ''
    });
}
const success = function (app,nodesc,message,description) {
    app.$Notice.success({
        title: message,
        desc: nodesc&&description ?  description : ''
    });
}
const confirm = function(app,title,content,okfun=()=>{},cancelfun=()=>{}){
    let config = {
        title:title,
        content:content,
        okText:'确定',
        cancelText:'取消',
        closable:true,
        onOk:okfun,
        onCancel:cancelfun
    }
    app.$Modal.confirm(config)
}
let message = {
    'error':error,
    'success':success,
    'confirm':confirm
}
module.exports =  {message}