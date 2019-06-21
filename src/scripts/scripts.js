String.prototype.format = function() {
    a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}