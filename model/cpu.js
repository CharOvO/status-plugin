import os from 'node:os';
import si from 'systeminformation'


/**
 * 获取cpu型号
 * @returns {Promise<Object>} // 包含 cpu型号 核心数 负载 频率 温度 的对象
 */
export default async function getCpuInfo() {
    try {
        let cpu = {}
        const info = await si.get({
            cpu: 'brand,cores,speed',
            currentLoad: 'currentLoad',
            cpuTemperature: 'main',
        });
        cpu.name = `${info.cpu.brand}`
        cpu.cores = `${info.cpu.cores}核`
        cpu.load = `${info.currentLoad.currentLoad.toFixed(2)}%`
        cpu.loadPercent = info.currentLoad.currentLoad
        cpu.speed = `${info.cpu.speed}GHz`
        if (info.cpuTemperature.main === null) {
            logger.error("获取cpu温度失败!",);
            cpu.temp = '0℃';
            cpu.tempNum = 0;
        } else {
            cpu.temp = `${info.cpuTemperature.main}℃`;
            cpu.tempNum = info.cpuTemperature.main;
        }
        try {
            cpu.arch = `${os.arch()}`;
        } catch (error) {
            cpu.arch = '未知';
        }
        return cpu;  
        
    } catch (error) {
        logger.error("获取cpu信息失败!",error);

        return {
            name: '未知',
            cores: '0核',
            load: '0%',
            loadPercent: 0,
            speed: '0GHz',
            temp: '0℃',
            tempNum: 0,
            arch: '未知'
        };
    }
} 


