class CLASSNAME {

    #private_field; // <- if private, the field isn't an implicit variable, so you need to write it here

	constructor() { 

        // log "this" return the "class object"
        // costructor lounch all inner element

        this.my_open_field = {}
        this.#private_field = {}

		this.#autostart_private_method()
        this.autostart_open_method()

    }

	#autostart_private_method() {

        // this method is accessible into the class but not from outside
		this.my_open_field = "hello world!"
        this.#private_field = "hello to me!"

	}

    autostart_open_method() {

        // this method is accessible and can be launched
		// from any position (inside and ouside class)
        // and can set (see set_private_field) and 
        // return open and private (see get_method_exemple) data
        // ...obvius, for do that, you need a return or callback system

        this.my_open_field = "hello beautyful world!"
        this.#private_field = "hello to you, dev!"

	}

    set_private_field(str) {

        // yes, it's horrible but you can override
        // a private field via open method

        this.#private_field = str

    }
    
    get_method_exemple() {

        // yes, you can return a private field via open method

        return [
            this.my_open_field, // return the open data, ok
            this.#private_field // return the private data, ops! wow!
        ]

	}

}

const classistance = new CLASSNAME()
