# FPM-NBIOT-TIANYI

对接电信 NB-IOT 北向接口的应用平台，用于给设备发送指令，接收设备的反馈和上报信息等。

基于 Nodejs, yf-fpm-server 的基础核心框架进行构建的。

## Content

- Manuals
- Roadmap
- Issues


### Manuals

- 开发者平台

  [https://180.101.147.208:8093](https://180.101.147.208:8093)

  User: `****18952780055`
  
  Code: `~39z~HZ{`

- 开发指南

  [开发指南&接口文档](https://180.101.147.208:8093/assets/docCenter/helpcenter/helpPortal/Portal/helpcenter.html?manualName=UserGuide_CMCC&docSite=CMCC&page=gettingStarted&lang=zh)


### Roadmap

- [x] 获取token
- [x] token失效后，刷新token
- [x] 发送指令给设备
- [ ] 订阅设备信息
- [ ] 联调应用和设备
- [ ] 接入到 fpm-iot-middleware 平台中
- [ ] 上线应用



### Issues

- [ ] 解析订阅消息异常,初步分析是传入的json体以 Object 的方式传入的，没有进行 stringify 。

  - Fake command:    

    ```bash
    # command 1
    curl -H "Content-Type:application/json" -X POST --data {"a":"b"} http://localhost:9999/notify
    ```

    ```bash
    # command 2
    curl -H "Content-Type:application/json" -X POST --data {\"a\":\"b\"} http://localhost:9999/notify
    ```

    ```bash
    # command 3
    curl -H "Content-Type:application/json" -X POST --data {'a':'b'} http://localhost:9999/notify
    ```

    使用 Command 1 的指令，会导致服务异常：

    ```javascript
     { SyntaxError: Unexpected token a in JSON at position 1
        at JSON.parse (<anonymous>)
        at parse (co-body\lib\json.js:57:17)
        at AsyncFunction.module.exports [as json] (co-body\lib\json.js:41:20)
        at process._tickCallback (internal/process/next_tick.js:68:7) status: 400, body: '{a:b}' } { request:
    { method: 'POST',
        url: '/notify',
        header:
        { host: 'localhost:9999',
            'user-agent': 'curl/7.64.0',
            accept: '*/*',
            'content-type': 'application/json',
            'content-length': '5' } },
    response:
    { status: 404,
        message: 'Not Found',
        header: [Object: null prototype] {} },
    app: { subdomainOffset: 2, proxy: false, env: 'development' },
    originalUrl: '/notify',
    req: '<original node req>',
    res: '<original node res>',
    socket: '<original node socket>' }
    ```

    使用 Command 2 的指令，服务器输出正常，因为对参数进行了 stringify。

  - How to fix?

    需要对 yf-fpm-server 中的 co-body 模块进行处理，进行参数的判断，如果是json格式的，则直接使用，不用进行 JSON.parse
