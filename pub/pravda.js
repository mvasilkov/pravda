(function () {
Array.prototype.__map = function (fn) {
    var len = this.length, res = Array(len), i
    for (i = 0; i < len; ++i)
        res[i] = fn(this[i], i, this)
    return res
}

Array.prototype.__pop_random = function () {
    var i = Math.floor(Math.random() * this.length)
    var res = this[i]
    this.splice(i, 1)
    return res
}

function watch_the_world_burn() {
    var _BD = BD.slice()
    $('#gen').empty().append(Array(5).__map(function () {
        var headline = _BD.__pop_random()
        if (typeof headline == 'function')
            headline = headline()
        return $('<li>').text(wto(headline))
    }))
}

$('#btn').click(watch_the_world_burn)
watch_the_world_burn()
}())
