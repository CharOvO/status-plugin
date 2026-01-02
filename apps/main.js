import * as cpu from '../model/cpu.js';
import * as system from '../model/system.js';
import * as memory from '../model/memory.js';
import * as disk from '../model/disk.js';


export class skr_status extends plugin{
    constructor() {
        super({
         /** 功能名称 */
        name: 'SKR状态',
        /** 功能描述 */
        dsc: '获取服务器状态',
        event: 'message',
        /** 优先级，数字越小等级越高 */
        priority: 1,
        rule: [
            {
            /** 命令正则匹配 */
            reg: '^[/#]?(状态|status)$',
            /** 执行方法 */
            fnc: 'status'
            },
            {
            /** 命令正则匹配 */
            reg: '^[/#]?(复读|echo)$',
            /** 执行方法 */
            fnc: 'echo'
            }
        ]
        })
    }

    async status(e) {
        const cpuInfo = await cpu.getCpuInfo();
        const systemInfo = await system.getSystemIofo();
        const memoryInfo = await memory.getMemoryInfo();
        const diskInfo = await disk.getDiskInfo();
        let rmsg = [
            `🥰 CPU信息：`,
            `  型号：${cpuInfo.name}`,
            `  核心：${cpuInfo.cores}`,
            `  架构：${cpuInfo.arch}`,
            `🌸 CPU负载：`,
            `  当前负载：${cpuInfo.load}`,
            `  频率：${cpuInfo.speed}`,
            `  温度: ${cpuInfo.temp}`,
            `✨ 系统信息：`,
            `  主机名: ${systemInfo.hostname}`,
            `  内核：${systemInfo.platform}`,
            `  发行版：${systemInfo.distro}`,
            `  运行时间：${systemInfo.upTime}`,
            `😞 内存占用：`,
            `  ${memoryInfo.active}/${memoryInfo.total}`,
            `🎉 容量概况：`,
        ];
        rmsg.push(` ${diskInfo.used}/${diskInfo.total}`);
        rmsg.push(`🤣 硬盘信息：`);
        rmsg.push(`--------------`);

        for (let i = 0; i < diskInfo.disk.length; i++){
            rmsg.push(` 型号: ${diskInfo.disk[i].name}`);
            rmsg.push(` 类型: ${diskInfo.disk[i].type}`);
            rmsg.push(` 容量: ${diskInfo.disk[i].size}`);
            rmsg.push(` 温度: ${diskInfo.disk[i].temperature}`);
            rmsg.push(`--------------`);
        }
        

        e.reply(rmsg.join('\n'), false, { at: true });
    }

    async echo(e) {
        e.reply("请输入要复读内容",true,{at: true});
        await this.setContext("test");
        logger.info("等待用户输入中...");
    }

    async test(e) {
        this.finish('test');
        e.reply(this.e.message,false,{at: true});
    }


}
