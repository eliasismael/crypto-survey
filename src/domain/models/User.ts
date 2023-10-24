export interface IUser {
    address: string;
    answersID: Array<number>;
    addAnswerID(answerID: number): void;
    seeAnswersID(): Array<number>;
}

export class User implements IUser {
    address: string;
    answersID: number[];

    constructor(address: string) {
        this.address = address;
        this.answersID = [];
    }

    addAnswerID(answerID: number) {
        this.answersID.push(answerID);
    }

    seeAnswersID(): number[] {
        return this.answersID;
    }
}
