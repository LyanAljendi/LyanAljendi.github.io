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
    button = createButton("voronoi");
    button.position(80, 150);
    button.mousePressed(calculateCells);



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
    background(200);
    for (i in points) {
        ellipse(points[i].x, points[i].y, 4, 4);

    }

    if (bi === 1) {


        //for (let i = 0; i < cells.length; i++) {
        //    for (let j = 0; j < cells[i].edges.length; j++) {

        //     line(cells[i].edges[j].a.x, cells[i].edges[j].a.y, cells[i].edges[j].b.x, cells[i].edges[j].b.y);

        // }



        //  }
        for (let i = 0; i < bisections.length; i++) {


            line(bisections[i].a.x, bisections[i].a.y, bisections[i].b.x, bisections[i].b.y);





        }


    }

    text("first of the firsts", 30, 75);


}

function mousePressed() {

    if (numberOfclicks === 0) { numberOfclicks += 1; }
    else {
        points.push(new Point(mouseX, mouseY));




    }
    numberOfclicks += 1;

}
function calculateCells1() {
    let midpoint;
    //  bisections = [];
    for (let i = 0; i < points.length; i++) {
        //for (let j = i + 1; j < points.length; j++) {
        if (i == points.length - 1) {
            bisect(points[i], points[0]);
        }
        else { bisect(points[i], points[i + 1]); }


        //}
    }
    for (let j = 0; j < bisections.length; j++) {
        for (let k = 0; k < bisections.length; k++) {
            if (j !== k) {
                midpoint = intersect(bisections[j], bisections[k]);

                if (midpoint !== false) {
                    for (let i = 0; i < points.length; i++) {
                        if ((points[i] != bisections[j].l) && (points[i] != bisections[j].r)) {
                            if (getDistance(bisections[j].b, bisections[j].l) > getDistance(bisections[j].b, points[i])) {
                                bisections[j].b = midpoint; console.log("a", j, k, i);
                                break;

                            }
                            if (getDistance(bisections[j].a, bisections[j].l) > getDistance(bisections[j].a, points[i])) {
                                bisections[j].a = midpoint; console.log("b", j, k, i)
                                break;
                            }

                        }
                    }

                }
            }
            //bisections[i].b = midpoint;

        }


        bi = 1;
    }
}
function calculateCells2() {
    let midpoint;
    for (let i = 1; i < points.length; i++) {
        let distance = getDistance(points[i], points[i - 1]);
        let point = points[i - 1];
        for (let j = i - 1; j >= 0; j--) {
            let l = getDistance(points[i], points[j])
            if (l < distance) {
                distance = l
                point = points[j]
            }

        }
        print(point)
        bisect(points[i], point);
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
    print(bisections)
    bi = 1;

}

function calculateCells3() {

    //for (let i = 1; i < points.length; i++) {

    // let distance = getDistance(points[i], points[i - 1]);
    //let point = points[i - 1];
    // for (let j = i - 1; j >= 0; j--) {
    // let l = getDistance(points[i], points[j])
    //  if (l < distance) {
    //    distance = l
    //   point = points[j]
    // }

    //}
    //print(point)
    // bisect(points[i], point);

    let verticies = []
    //let cell = new Cell(points[i], bisections, verticies)

    // print(cell)
    //print("cell.edges", i, " ", cell.edges)


    //cells.push(cell)

    //}
    for (let i = 0; i < points.length; i++) {
        //for (let j = i + 1; j < points.length; j++) {
        if (i == points.length - 1) {
            bisect(points[i], points[0]);
        }
        else { bisect(points[i], points[i + 1]); }

        //for (let i = 0; i < bisections.length - 1; i++) {
        //   for (let m = i + 1; m < bisections.length; m++) {
        //     if (i !== m) {
        //      trims(bisections[i], bisections[m]);
        //   }
        // }
        // }

    }
    print(bisections)

    for (let i = 0; i < bisections.length; i++) {
        for (let m = i; m < bisections.length; m++) {
            if (i !== m) {
                print("trimming")
                trims(bisections[m], bisections[i]);
            }
        }
    }

    bi = 1;
}

function trims(edge1, edge2) {
    let inter;
    inter = intersect(edge1, edge2);
    if (inter !== false) {
        if (orient(edge2.l, edge2.midpoint, edge2.b) == orient(edge2.l, inter, edge2.b)) {
            edge2.a = inter;

        } else {
            edge2.b = inter;
        }
    }
}

function trimEdges(cell) {
    let midpoint;
    let i = 0; {
        for (let j = i + 1; j < cell.edges.length; j++) {
            midpoint = intersect(cell.edges[i], cell.edges[j]);
            if (midpoint !== false) {
                for (let k = 0; k < points.length; k++) {
                    if ((points[k] != cell.edges[j].l) && (points[k] != cell.edges[j].r)) {
                        if (getDistance(cell.edges[j].b, cell.edges[j].l) > getDistance(cell.edges[j].b, points[k])) {
                            cell.edges[j].b = midpoint;

                            //console.log("a", j, k, i);
                            break;

                        }
                        if (getDistance(cell.edges[j].a, cell.edges[j].l) > getDistance(cell.edges[j].a, points[k])) {
                            cell.edges[j].a = midpoint;

                            //console.log("b", j, k, i)
                            break;
                        }

                        if (getDistance(cell.edges[i].b, cell.edges[i].l) > getDistance(cell.edges[i].b, points[k])) {
                            cell.edges[i].b = midpoint;

                            //console.log("a", j, k, i);
                            break;

                        }

                        if (getDistance(cell.edges[i].a, cell.edges[j].l) > getDistance(cell.edges[i].a, points[k])) {
                            cell.edges[j].a = midpoint;

                            //console.log("b", j, k, i)
                            break;
                        }



                    }
                }

            }
        }


    }

}
function addSite(s) {


    let distance = getDistance(points[points.length - 1], s);
    let point = points[i - 1];
    for (let j = points.length - 2; j >= 0; j--) {
        let l = getDistance(points[j], s)
        if (l < distance) {
            distance = l
            point = points[j]
        }

    }
    print(point)


    return point;


}
function computeCell(s) {
    p = addSite(s);
    print(points)
    print("closest poiint is ", p)
    bisect(s, p);


}
function calculateCells() {
    for (let i = 0; i < points.length; i++) {
        computeCell(points[i])
        print(bisections)
    }

    bi = 1;
}
function prune() {

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
