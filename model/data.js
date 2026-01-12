import getCpuInfo from './cpu.js';
import getDiskInfo from './disk.js';
import getMemoryInfo from './memory.js';
import getNetworkInfo from './network.js';
import getSystemIofo  from './system.js';

export default async function getData() {
    const [cpu, disk, memory, network, system] = await Promise.all([
        getCpuInfo(),
        getDiskInfo(),
        getMemoryInfo(),
        getNetworkInfo(),
        getSystemIofo()
    ]);
    
    const data = {
        cpu: cpu,
        disk: disk,
        memory: memory,
        network: network,
        system: system
    };

    return data;
}

