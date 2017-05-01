
const fs=require('fs');

function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`regisrer URL  mapping: GET ${path}`);
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`regisrer URL  mapping: POST ${path}`);
        }else if(url.startsWith('PUT ')){
            var path = url.substring(4);
            router.put(path,mapping[url]);
            console.log(`regisrer URL  mapping: PUT ${path}`);
        } else if(url.startsWith('DELETE ')){
            var path = url.substring(7);
            router.del(path,mapping[url]);
            console.log(`regisrer URL  mapping: DELETE ${path}`);
        } else {
            console.log(`invaid URL: ${url}`);
        }
    }
}

function addControllers(router,dir){
    var files=fs.readdirSync(__dirname + '/'+dir);
    var js_files = files.filter((f) =>{
        return f.endsWith('.js');
    });

    for(var f of js_files){
        console.log(`process ${dir}: ${f}... `);
        let mapping = require(__dirname+'/'+dir+'/'+f);
        addMapping(router,mapping);
    }

}

module.exports = function(dir){
    let 
        controllers_dir = dir || 'controllers',//如果不传入参数，将默认扫描路径
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};

