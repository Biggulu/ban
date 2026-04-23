function main(config) {
    // 遍历生成好的策略组
    if (config['proxy-groups']) {
        config['proxy-groups'].forEach(group => {
            // 将所有测速组（url-test）强制变异为智能组（smart）
            if (group.type === 'url-test') {
                group.type = 'smart';
                group.lazy = true;
                group.strategy = 'sticky-sessions';
                group.uselightgbm = true;
                group.collectdata = false;
            }
        });
    }
    return config;
}