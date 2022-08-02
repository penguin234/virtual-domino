function PerspectiveCamera(position, lookdirection, updirection, horizontalangle) {
    this.position = position;
    this.lookdirection = lookdirection;
    this.updirection = updirection;
    this.horizontalangle = horizontalangle;
}

function GetPositionAdjustTransform(camera) {
    return new Translate(camera.position.x * -1, camera.position.y * -1, camera.position.z * -1);
}

function GetDirectionAdjustTransform(camera) {
    const l = camera.lookdirection.copy().normalize();
    const u = camera.updirection.copy().normalize();

    const r = l.outerProduct(u);
    u.mult(-1);

    return new Matrix4By4(
        r.x, u.x, l.x, 0,
        r.y, u.y, l.y, 0,
        r.z, u.z, l.z, 0,
        0, 0, 0, 1
    );
}

function GetConvertToPixelMatrix(camera) {
    return new Matrix3By3(
        1, 0, -0.5,
        0, 1, -0.5,
        0, 0, 1
    );
}

PerspectiveCamera.prototype.GetConvertCoordTransform = function() {
    const pos = GetPositionAdjustTransform(this);
    const dir = GetDirectionAdjustTransform(this);
    const coord = Applier.merge(pos, dir);
    return coord;
}

PerspectiveCamera.prototype.GetProjectionTransform = function() {
    const coord = this.GetConvertCoordTransform();

    const proj = new Matrix4By3(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
        0 ,0, 0
    );

    const pix = GetConvertToPixelMatrix(this);

    return Applier.merge(Applier.merge(coord, proj), pix);
}