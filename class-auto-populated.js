//// this is an exemple of autopopulated class structure
//// https://jsfiddle.net/nk2mfs0z/15/

class PATHS {

	constructor() { 

		this.gethost()

	}

	sethost(hostname) { 

		if(!hostname) paths.host = "http://localhost/"
		else paths.host = hostname

	}

	gethost() {

		return paths.host

	}

}

const paths = {}
const pathdata = new PATHS()

// set prop
pathdata.sethost("http://mysite.com/")
console.log( paths.host )

// get prop
let actualhost = pathdata.gethost()
console.log( actualhost )
