import os from 'node:os';
import si from 'systeminformation'

/**
 * 获取系统信息
 * @returns {Promise<Object>} 包括 内核 发行版 主机名 运行时间 的对象
 */

export default async function getSystemIofo() {
    try {
        let system = {};
        const info = await si.get({
            osInfo: 'platform,distro,hostname' 
        });
        const uptime = os.uptime();

        system.platform = `${info.osInfo.platform}`;
        system.distro = `${info.osInfo.distro}`;
        system.hostname = `${info.osInfo.hostname}`;
        system.upTime = `服务器已正常运行${(uptime/(24*3600)).toFixed(0)}天${((uptime%(24*3600))/3600).toFixed(0)}小时${((uptime%(24*3600)%3600)/60).toFixed(0)}分钟`

        return system;
    } catch (error) {
        logger.error("获取系统信息失败!",error);

        return {
            platform: '未知',
            distro: '未知',
            hostname: '未知', 
            upTime: '服务器已正常运行0天0小时0分钟',
        }
    }
}


