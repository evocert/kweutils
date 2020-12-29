export function rotateRxRyRz(po, angles){

    var rc = angles.rotateCenter;

    po.x -= rc[0];
    po.y -= rc[1];
    po.z -= rc[2];

    var ry = rotateY(po, angles.y);
    var rx = rotateX(ry, angles.x);
    var rz = rotateZ(rx, angles.z);

    rz.x += rc[0];
    rz.y += rc[1];
    rz.z += rc[2];

    return rz;
}

function rotateX(p, a){
    var sa = Math.sin(a);
    var ca = Math.cos(a);
    return {
        x: p.x,
        y: p.y * ca - p.z * sa,
        z: p.y * sa + p.z * ca
    };
}

function rotateY(p, a){
    var sa = Math.sin(a);
    var ca = Math.cos(a);
    return {
        x: p.z * sa + p.x * ca,
        y: p.y,
        z: p.z * ca - p.x * sa
    };
}

function rotateZ(p, a){
    var sa = Math.sin(a);
    var ca = Math.cos(a);
    return {
        x: p.x * ca - p.y * sa,
        y: p.y * sa + p.y * ca,
        z: p.z
    };
}
