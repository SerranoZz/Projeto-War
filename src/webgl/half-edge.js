class Vertex{
    attributes = new Map();
    id;
    hEdge;

    constructor(id){
        this.id = id;
    }
}

class HalfEdge{
    opositte;
    next;
    vertex;

    constructor(vertex){
        this.vertex = vertex;
    }
}

class Face{
    hEdge;

    constructor(hEdge){
        this.hEdge = hEdge;
    }
}

export default class HalfEdgeDS{
    #hEdges = [];
    #vertices = [];
    #faces = [];

    constructor(indexes){
        for(let i = 0; i < indexes.length; i += 3){
            const i1 = indexes[i];
            const i2 = indexes[i+1];
            const i3 = indexes[i+2];

            if(!this.#vertices[i1]) this.#vertices[i1] = new Vertex(i1);
            if(!this.#vertices[i2]) this.#vertices[i2] = new Vertex(i2);
            if(!this.#vertices[i3]) this.#vertices[i3] = new Vertex(i3);

            const h1 = new HalfEdge(this.#vertices[i1]);
            const h2 = new HalfEdge(this.#vertices[i2]);
            const h3 = new HalfEdge(this.#vertices[i3]);

            h1.next = h2;
            h2.next = h3;
            h3.next = h1;

            const face = new Face(h1);

            this.#hEdges[i] = h1;
            this.#hEdges[i+1] = h2;
            this.#hEdges[i+2] = h3;

            this.#faces[Math.round(i/3)] = face;
        }

        this.setOposittes();
    }

    setOposittes(){
        for(let hEdge of this.#hEdges){
            const v0 = hEdge.vertex;
            const v1 = hEdge.next.vertex;

            if(!v0.hEdge) v0.hEdge = hEdge;

            if(hEdge.opositte) continue;

            for(let hEdge1 of this.#hEdges){
                if(hEdge1.vertex === v1 && hEdge1.next.vertex === v0){
                    hEdge.opositte = hEdge1;
                    hEdge1.opositte = hEdge;
                    break;    
                }
            }
        }
    }

    setAttribute(values, vertlen, name){
        if(values.length/vertlen!==this.#vertices.length)
            throw new Error(`Mesh haves ${this.#vertices.length} vertices, but only ${values.length/vertlen} were given.`)

        for(let i = 0; i<values.length; i+=vertlen){
            const attrib = values.slice(i, i+vertlen);
            this.#vertices[Math.round(i/vertlen)].attributes.set(name, attrib);
        }
    }

    createVBOs(){
        const attributes = new Map();
        const indexes = [];

        for(let vertex of this.#vertices){
            for(let name of vertex.attributes.keys()){

                if(!attributes.get(name)) attributes.set(name, []);

                attributes.get(name).push(...vertex.attributes.get(name));
            }
        }

        for(let hEdge of this.#hEdges){
            indexes.push(hEdge.vertex.id);
        }

        return {attributes, indexes, count: this.#vertices.length};
    }
}
