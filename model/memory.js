import si from 'systeminformation';

/**
 * 获取内存信息
 * @return {Promise<Object>} // 包含 内存占用百分比 使用量 总量 的对象
 */

export default async function getMemoryInfo() {
    try {
        let memory = {};
        const info = await si.get({
            mem: 'total,active'
        });

        memory.total = `${(info.mem.total / 1024 ** 3).toFixed(1)}GB`,
        memory.active = `${(info.mem.active / 1024 ** 3).toFixed(1)}GB`
        memory.usagePercent = (info.mem.active / info.mem.total) * 100
        return memory;
    } catch (error) {
        logger.error("获取内存信息失败!",error);

        return {
            total: '0GB',
            active: '0GB',
            usagePercent: 0
        }
    }
}
