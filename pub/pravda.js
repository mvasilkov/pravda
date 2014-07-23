(function () {
Array.prototype.__map = function (fn) {
    var len = this.length, res = Array(len), i
    for (i = 0; i < len; ++i)
        res[i] = fn(this[i], i, this)
    return res
}

function watch_the_world_burn() {
    $('#gen').empty().append(Array(5).__map(function () {
        var headline = BD.__select()
        if (typeof headline == 'function')
            headline = headline()
        return $('<li>').text(wto(headline))
    }))
}

$('#btn').click(watch_the_world_burn)
watch_the_world_burn()
}())
