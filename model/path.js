import path from 'path';

// 启动目录
const _path = process.cwd().replace(/\\/g, '/');
// 插件名
const pluginName = path.basename(path.join(import.meta.url,'../../'));
// 插件目录
const pluginPath = path.join(_path, 'plugins', pluginName);
// 资源目录
const resourcesPath = path.join(pluginPath, 'resources').replace(/\\/g, '/');

export { _path, pluginName, pluginPath, resourcesPath };