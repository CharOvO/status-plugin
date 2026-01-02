import si from 'systeminformation';

function formatSizeUnit(size) {
      if (size > (1024 ** 4)) {
               return`${(size / (1024 ** 4)).toFixed(1)}TB`;
            } else if(size > (1024 ** 3)) {
                return `${(size / (1024 ** 3)).toFixed(1)}GB`;
            }else {
                return `${(size / (1024 ** 2)).toFixed(1)}MB`;
            }
 }



/**
 * 获取硬盘信息
 * @return {Promise<Object>} // 包含每块磁盘名称,容量,温度等信息的对象
 */

export async function getDiskInfo() {
    // return [await si.blockDevices(),await si.fsSize()];
    try {
        let disk = [];
        let used = 0; //磁盘使用容量
        let total = 0; //磁盘总计容量
        const info = await si.get({
            diskLayout: 'name,type,size,temperature',
            fsSize: 'fs,used,size'
        });

        for (let i = 0; i < info.diskLayout.length; i++) { 
            let dev = {}; // 每块硬盘的数据对象
         
            dev.name = `${info.diskLayout[i].name}`;
            dev.type = `${info.diskLayout[i].type}`;
            dev.size = `${formatSizeUnit(info.diskLayout[i].size)}`
            if (info.diskLayout[i].temperature === null) {
                logger.error("获取硬盘温度失败!",);
                dev.temperature = '0℃';
            } else {
                dev.temperature = `${info.diskLayout[i].temperature}℃`;
            }
           

            total += info.diskLayout[i].size;

            disk.push(dev);
        }
        for (let i = 0; i < info.fsSize.length; i++){
            if (info.fsSize[i].fs === 'efivarfs' || info.fsSize[i].fs === 'tmpfs' || info.fsSize[i].size === 0) {
                continue;
            }
            used += info.fsSize[i].used;
        }

        return {
            disk: disk,
            total: formatSizeUnit(total),
            used: formatSizeUnit(used)
        }
    } catch (error) {
        logger.error("获取硬盘数据失败!",error);
    }
}