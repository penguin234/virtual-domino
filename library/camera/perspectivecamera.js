function PerspectiveCamera(position, lookdirection, updirection, horizontalangle) {
    this.position = position;
    this.lookdirection = lookdirection;
    this.updirection = updirection;
    this.horizontalangle = horizontalangle;
}

function GetPositionAdjustTransform(camera) {
    return new Translate(camera.position.x, camera.position.y, camera.position.z);
}

function GetDirectionAdjustTransform(camera) {

}

function GetConvertToPixelMatrix(camera) {
    return new Matrix3By3(
        1, 0, -0.5,
        0, 1, -0.5,
        0, 0, 1
    );
}

PerspectiveCamera.prototype.GetProjectionTransform = function() {
    const pos = GetPositionAdjustTransform(this);
    const dir = GetDirectionAdjustTransform(this);
    const coord = new Matrix4By3(
        dir.read(0, 0), dir.read(0, 1), dir.read(0, 2),
        dir.read(1, 0), dir.read(1, 1), dir.read(1, 2),
        dir.read(2, 0), dir.read(2, 1), dir.read(2, 2),
        pos.read(3, 0), pos.read(3, 1), pos.read(3, 2)
    );

    const pix = GetConvertToPixelMatrix(this);

    return Applier.merge(coord, pix);
}