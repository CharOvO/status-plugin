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
        e.reply("当前状态良好!", true, { at: true });
    }

    async echo(e) {
        e.reply("请输入要复读内容",true,{at: true});
        this.setContext("test");
        console.log("正在等待用户输入复读内容...");
    
    }

    async test(e) {
        this.finish('test');
        e.reply(this.e.message,false,{at: true});

    }


}
