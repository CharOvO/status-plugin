import si from 'systeminformation';
import * as tool from './tool.js';
/**
 * 获取网络信息
 * @return {Promise<Object>} // 包含 上行速率和下行速率
 */

export default async function getNetworkInfo() {
    try {
        let network = {}
        // 前
        // const infob = await si.get({
        //     networkStats: 'tx_bytes,rx_bytes'
        // });
        // const dateb = Date.now();

        // await new Promise(resolve => setTimeout(resolve, 100));
        // //后
        // const infoa = await si.get({
        //     networkStats: 'tx_bytes,rx_bytes'
        // });
        // const datea = Date.now();
        
        // const dateDiff = (datea - dateb) / 1000;
        // network.txSpeed = `${tool.formatSizeUnit((infoa.networkStats[0].tx_bytes - infob.networkStats[0].tx_bytes) / dateDiff)}/S`;
        // network.rxSpeed = `${tool.formatSizeUnit((infoa.networkStats[0].rx_bytes - infob.networkStats[0].rx_bytes) / dateDiff)}/S`;

        // 总上传下载
        const info = await si.get({
            networkStats: 'tx_bytes,rx_bytes,tx_sec,rx_sec'
        });

        network.txTotal = `${tool.formatSizeUnit(info.networkStats[0].tx_bytes)}`;
        network.rxTotal = `${tool.formatSizeUnit(info.networkStats[0].rx_bytes)}`;
        network.txSpeed = `${tool.formatSizeUnit(info.networkStats[0].tx_sec)}`;
        network.rxSpeed = `${tool.formatSizeUnit(info.networkStats[0].rx_sec)}`;
        
        return network;
    } catch (error) {
        // logger.error('获取网络信息失败!',error);
        return {
            txSpeed: '0KB/S',
            rxSpeed: '0KB/S',
            up: '0KB/S',
            down: '0KB/S'
        }
    }
    
}



