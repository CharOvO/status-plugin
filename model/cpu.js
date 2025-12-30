import os from 'node:os';

/**
 * 获取cpu型号
 * @returns {Object}
 */

export function getCpuInfo() {
    try {
        const cpuInfo = os.cpus();
        return {
            name: cpuInfo[0].model.trim().slice(0,21).concat('...'), //cpu型号
            arch: os.arch(), //cpu架构
            core: cpuInfo.length, //核心数
            load: `${(os.loadavg()[0]/cpuInfo.length*100).toFixed(2)}%`,
            speed: (cpuInfo[0].speed / 1000).toFixed(2), //频率
        }
    } catch(error){
        logger.error("获取cpu信息失败!");
        return {
        name: '未知',
        core: '0',
        arch: '未知',
        load: '0%',
        speed: '0',
        }       
    }
} 