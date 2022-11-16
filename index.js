/* eslint-disable no-undef, no-unused-vars */

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}
class Edge {
    constructor(a, b, midpoint, l, r) {
        this.a = a;
        this.b = b;
        this.l = l;
        this.r = r;
        this.midpoint = midpoint;
    }
}

class Cell {
    constructor(seed, edges, verticies) {
        this.seed = seed;
        this.edges = edges;
        this.verticies = verticies;
    }
}

var points = [];
var bisections = [];
var cells = [];
var verticies = []
let numberOfclicks = 1;
let bi = 0;
let first = true;
let dtr = "";
let alignment = "";
let inclusion = "";
let midpoint;



function setup() {
    createCanvas(windowWidth, windowHeight);

    // Put setup code here
    fill("black");
    textSize(40);
    button = createButton("Clear");
    button.position(30, 150);
    button.mousePressed(resetpoints);
    button = createButton("compute voronoi");
    button.position(80, 150);
    button.mousePressed(calculateCells);
    button = createButton("compute cell");
    button.position(200, 150);
    button.mousePressed(function () { computeCell(points[0]); });



}

function resetpoints() {
    numberOfclicks = 0;
    points = [];
    bisections = [];
    cells = [];
    verticies = []
    bi = 0;
    alignment = '';
    inclusion = "";
    clear();


}

function draw() {
    // Put drawings here
    background(240);
    for (i in points) {
        if (i == 0) {

            noStroke()
            let c = color('green');
            fill(c);
            ellipse(points[i].x, points[i].y, 7, 7);
            first = false;

        }
        else {
            noStroke()
            let c = color('gray');
            fill(c);
            ellipse(points[i].x, points[i].y, 7, 7);
        }



    }

    if (bi === 1) {


        stroke(50, 230, 0);
        for (let i = 0; i < bisections.length; i++) {


            line(bisections[i].a.x, bisections[i].a.y, bisections[i].b.x, bisections[i].b.y);


        }


    }
    noStroke()
    let c = color('green');
    fill(c);
    text("Naive approach - without pruning", 30, 75);


}

function mousePressed() {

    if (numberOfclicks === 0) { numberOfclicks += 1; }
    else {
        points.push(new Point(mouseX, mouseY));




    }
    numberOfclicks += 1;

}
function calculateCells() {
    bisections = []
    for (let i = 0; i < points.length; i++) {
        computeCell(points[i]);
    }
}


function computeCell(p) {


    for (let j = 0; j < points.length; j++) {
        if (p !== points[j]) {
            bisect(p, points[j]);
        }


    }

    print(bisections)
    bi = 1;

}



function v() {
    for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < edges.length; j++) {
            if (i !== j) {
                inter = intersect(edges[j], edges[i])
                if (inter != false) {
                    verticies.push(inter);
                }
            }
        }
    }

    for (let k = 0; k < points.length; k++) {
        if ((points[k] != bisections[bisections.length - 1].l) && (points[i] != bisections[bisections.length - 1].r)) {
            if (getDistance(bisections[bisections.length - 1].b, bisections[bisections.length - 1].l) > getDistance(bisections[bisections.length - 1].b, points[k])) {
                bisections[bisections.length - 1].b = midpoint; //console.log("a", j, k, i);
                break;

            }
            if (getDistance(bisections[bisections.length - 1].a, bisections[bisections.length - 1].l) > getDistance(bisections[bisections.length - 1].a, points[i])) {
                bisections[bisections.length - 1].a = midpoint; //console.log("b", j, k, i)
                break;
            }

        }
    }
}



function bisect(a, b) {
    print("bisecting")
    numberOfclicks = 0;
    let m1;
    let m;
    let c;
    let newx;
    let newy;
    let p1;
    let p2;


    midpoint = new Point((b.x + a.x) / 2, (b.y + a.y) / 2);
    m1 = (b.y - a.y) / (b.x - a.x);
    m = -(1 / m1);
    c = midpoint.y - (m * midpoint.x);
    if (((a.x > b.x) && (a.x > b.x)) || ((a.x < b.x) && (a.x < b.x))) {
        newy = windowHeight;
        newx = (newy - c) / m;
        p1 = new Point(newx, newy);
    }
    else {
        newy = c;
        p1 = new Point(0, newy);

    }


    newx = (c / -m);



    p2 = new Point(newx, 0);
    bisections.push(new Edge(p1, p2, midpoint, a, b));





}
function getDistance(a, b) {
    let x = a.x - b.x;
    let y = a.y - b.y;

    return Math.sqrt(x * x + y * y);
}

function intersect(l1, l2) {
    let x1 = l1.a.x;
    let x2 = l1.b.x;
    let y1 = l1.a.y;
    let y2 = l1.b.y;
    let x3 = l2.a.x;
    let x4 = l2.b.x;
    let y3 = l2.a.y;
    let y4 = l2.b.y;

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    //let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}

function orient(a, b, c) {

    let dtrmatrix = [
        [a.x, -a.y, 1],
        [b.x, -b.y, 1],
        [c.x, -c.y, 1]
    ];

    dtr = math.det(dtrmatrix);
    if (dtr > 0) {
        alignment = 1;
    }
    if (dtr < 0) {
        alignment = -1;
    }
    if (dtr === 0) {
        alignment = 1;
    }


    return alignment;

}
// This Redraws the Canvas when resized
windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
};
