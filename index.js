import fs from 'node:fs';

if (!global.segment) {
  global.segment = (await import("oicq")).segment;
}

let ret = [];

logger.info(logger.yellow("- 正在载入 SKR-STATUS-PLUGIN"));
// 获取apps文件夹下的所有js文件
const files = fs
    .readdirSync('./plugins/skr-status-plugin/apps')
    .filter((file) => file.endsWith('.js'));
// 引入class
files.forEach((file) => {
    ret.push(import(`./apps/${file}`));
});
ret = await Promise.allSettled(ret);
// 判断,写入apps
let apps = {};
for (let i in files) {
    let name = files[i].replace('.js', '');
    if (ret[i].status !== "fulfilled") {
        logger.error(`插件加载错误:${logger.red(name)}`);
        logger.error(ret[i].reason);
        continue;
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
}

logger.info(logger.green("- SKR-STATUS-PLUGIN 载入成功"));
logger.info(logger.magenta("欢迎加入交流群(...)"));

