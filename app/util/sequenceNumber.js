module.exports = function (number, range, prefix = '', suffix = '') {
    range = range * 10
    return prefix + (range / number.toString().length).toString().substring(1) + number.toString() + suffix
}