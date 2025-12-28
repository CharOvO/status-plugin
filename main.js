import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'

export class skr_status extends plugin{
    constructor() {
        super({
         /** 功能名称 */
        name: 'SKR状态',
        /** 功能描述 */
        dsc: '获取服务器状态',
        event: 'message',
        /** 优先级，数字越小等级越高 */
        priority: -1009,
        rule: [
            {
            /** 命令正则匹配 */
            reg: '^[/#]?(状态|status)$',
            /** 执行方法 */
            fnc: 'status'
            }
        ]
        })
    }

    async status(e) {
        e.reply("当前状态良好!", true, { at: true, recallMsg: 5 });
        return true;
    }
}
