import os, { uptime } from 'node:os';

/**
 * 获取系统信息
 * @returns {Object}
 */
export function getSystemIofo() {
    const uptiem = os.uptime();
    try {
        return {
            platform: os.platform(), //获取操作系统平台
            type: os.type(), // 获取操作系统名称
            release: os.release(),
            upTime: `服务器已正常运行${(uptime/216000).toFixed(0)}天${(uptime%216000/3600).toFixed(0)}小时${(uptime%216000%3600/60).toFixed(0)}分钟`
        }
    } catch (error){
        logger.error("获取系统信息失败!");
    }
    return {
            platform: '未知',
            type: '未知',
            release: '未知',
            upTime: '服务器已正常运行0天0小时0分钟'
        }
}
