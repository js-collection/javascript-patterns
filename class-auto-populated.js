//// this is an exemple of autopopulated class structure
//// https://jsfiddle.net/nk2mfs0z/15/

class PATHS
{

	constructor() { 

		this.gethost();

	}

	sethost(hostname) { 

		if(!hostname) paths.host = "http://localhost/";
		else paths.host = hostname;

	}

	gethost() {

		return paths.host;

	}

}

const paths = {}, pathdata = new PATHS();

pathdata.sethost("http://mysite.com/");
alert(paths.host);

let actualhost = pathdata.gethost();
alert(actualhost);
