function CorrectVector3D(v1, v2, comp) {
    return comp(v1.x, v2.x) && comp(v1.y, v2.y) && comp(v1.z, v2.z);
}

function CorrectMatrix4By4(m1, m2, comp) {
    for (const rowindex in m1.matrix) {
        for (const colindex in m1.matrix[rowindex]) {
            if (!comp(m1.read(rowindex, colindex), m2.read(rowindex, colindex))) {
                return false;
            }
        }
    }
    return true;
}

/*
let v1 = new Vector3D(1, 0, 0);
let a1 = new Vector3D(0, 1, 0);
let r1 = Applier.toPoint(v1, Rotate(a1, Math.PI / 2));
console.log('r1 should be (0, 0, -1):');
r1.log();

let v2 = new Vector3D(3, 0, 0);
let a2 = new Vector3D(2, 2, 0);
let r2 = Applier.toPoint(v2, Rotate(a2, Math.PI));
console.log('r2 should be (0, 3, 0):');
r2.log();

let v3 = new Vector3D(0, 0, 2);
let a3 = new Vector3D(1, 0, Math.sqrt(3));
let r3 = Applier.toPoint(v3, Rotate(a3, Math.PI));
console.log('r3 should be (1.7, 0, 1):');
r3.log();

let v4 = new Vector3D(4, 0, 0);
let a4 = new Vector3D(0, 0, 10);
let r4 = Applier.toPoint(v4, Rotate(a4, Math.PI / 4));
console.log('r4 should be (2.828, 2.828, 0):');
r4.log();

let v5 = new Vector3D(2, 3, 4);
let a5 = new Vector3D(4, 6, 8);
let r5 = Applier.toPoint(v5, Rotate(a5, Math.PI / 3));
console.log('r5 should be (2, 3, 4):');
r5.log();
*/

const rotate = {
    name: 'rotate',
    methods: [
        {
            name: 'rotate',
            cases: [
                {
                    input: {
                        target: new Vector3D(1, 0, 0),
                        axis: new Vector3D(0, 1, 0),
                        angle: Math.PI / 2,
                    },
                    expectation: {
                        result: new Vector3D(0, 0, -1),
                    },
                }
            ],
        },
    ]
};

const subjects = [
    {
        name: 'vector3d',
        methods: [
            {
                name: 'log',
            },
        ],
    },
    {
        name: 'matrix4by4',
        methods: [
            {
                name: 'log',
            },
        ],
    },
    rotate,
    {
        name: 'scale',
        methods: [
            {
                name: 'log',
            },
        ],
    },
    {
        name: 'translate',
        methods: [
            {
                name: 'log',
            },
        ],
    },
    {
        name: 'applier',
        methods: [
            {
                name: 'log',
            },
        ],
    },
];