(function () {
    Array.prototype.__select = function () {
        return this[Math.floor(Math.random() * this.length)]
    }

    function select(group) {
        return '"+["' + group.replace(/#/g, '","') + '"].__select()+"'
    }

    function emplace(group) {
        if (group.length > 2 && group[0] == '#' && group[1] == '{' &&
            group[group.length - 1] == '}') return select(group.slice(2, -1))
        return group
    }

    function wto(pattern) {
        var out = JSON.stringify(pattern)
        while (out.indexOf('#{') != -1)
            /* jshint loopfunc: true */
            out = out.split(/(?=#{|})/).map(function (it, n, arr) {
                /* wow such lookbehind */
                if (n && arr[n][0] == '}') it = it.substr(1)
                return arr[++n] && arr[n][0] == '}'? it + '}': it
            }).map(emplace).join('')
        /* jshint evil: true */
        return Function('return ' + out)
    }

    if (typeof module != 'undefined' && module.exports) module.exports = wto
    else if (typeof define == 'function' && define.amd) define(function () { return wto })
    else if (typeof window != 'undefined') window.wto = wto
}())
