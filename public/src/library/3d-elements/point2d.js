function Point2D(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
}

Point2D.NormalizeProjectedPoint = function(p) {
    return new Point2D(p.x / p.z, p.y / p.z, p.z);
};

Point2D.prototype.toString = function() {
    return '(' + String(this.x) + ', ' + String(this.y) + ')  depth: ' + String(this.d);
};

Point2D.prototype.log = function() {
    console.log(this.toString());
};


export default Point2D;