export class Answers {
    key: string;
    name: string;
    email: string;
    date: string;
    answer: string;
    blogkey: string;
    setblogkey(n: string): void {
        this.blogkey = n;
    }
    getblogkey(): string {
        return this.blogkey;
    }
    setkey(n: string): void {
        this.key = n;
    }
    gekey(): string {
        return this.key;
    }
    setname (n: string): void {
        this.name = n;
    }
    getname(): string {
        return this.name;
    }
    setemail (n: string): void {
        this.email = n;
    }
    getemail(): string {
        return this.email;
    }
    setdate (n: string): void {
        this.date = n;
    }
    getdate(): string {
        return this.date;
    }
    setanswer (n: string): void {
        this.answer = n;
    }
    getanswer(): string {
        return this.answer;
    }

}
