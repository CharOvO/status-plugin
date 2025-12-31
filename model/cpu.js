import os from 'os';
import si from 'systeminformation'


/**
 * 获取cpu型号
 * @returns {Promise<Object>} // 包含
 */
export async function getCpuInfo() {
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
        cpu.speed = `${info.cpu.speed}GHz`
        if (info.cpuTemperature.main === null) {
            logger.error("获取cpu温度失败!");
            cpu.temp = '0℃';
        } else {
            cpu.temp = `${info.cpuTemperature.main}℃`;
        }
        try {
            cpu.arch = `${os.arch()}`;
        } catch (error) {
            cpu.arch = '未知';
        }
        return cpu;  
        
    } catch (error) {
        logger.error("获取cpu信息失败!");

        return {
            name: '未知',
            cores: '0核',
            load: '0%',
            speed: '0GHz',
            temp: '0℃',
            arch: '未知'
        };
    }
} 