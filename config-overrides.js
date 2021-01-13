module.exports = function override(config, env) {
    const path = require('path');
    config.resolve.alias['Layouts'] = path.join(__dirname, 'src', 'layouts');
    config.resolve.alias['Reducers'] = path.join(__dirname, 'src', 'reducers');
    config.resolve.alias['Pages'] = path.join(__dirname, 'src', 'pages');
    config.resolve.alias['Utilities'] = path.join(__dirname, 'src', 'utilities');
    config.resolve.alias['Services'] = path.join(__dirname, 'src', 'services');
    config.resolve.alias['Client'] = path.join(__dirname, 'src', 'client');
    config.resolve.alias['DTO'] = path.join(__dirname, 'src', 'dto');
    config.resolve.alias['Images'] = path.join(__dirname, 'public', 'images');
    return config;
}