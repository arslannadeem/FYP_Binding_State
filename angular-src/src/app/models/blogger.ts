export class Blogger {
    name: string;
    email: string;
    key: string;
    password: string;
    location: string;
    constructor() {}
    setlocation(e: string): void {
        this.location = e;
    }
    getlocation(): string {
        return this.location;
    }
    setpassword(e: string): void {
        this.password = e;
    }
    getpassword(): string {
        return this.password;
    }
    setkey(k: string ) {
    this.key = k;
    }
    getkey() {
    return this.key;
    }
    setname(n: string): void {
    this.name = n;
    }
    setemail(e: string): void {
    this.email = e;
    }
    getname(): string {
    return this.name;
    }
    getemail(): string {
    return this.email;
    }
}

