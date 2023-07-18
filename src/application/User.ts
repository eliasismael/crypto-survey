export class User {
    public address: string;
    private answersID: number[];

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

export type UserType = {
    addAnswerID: (arg: number) => void;
    seeAnswersID: () => number[];
};

export const getUserInstance = (currentAccount: string) => {
    const user = new User(currentAccount);
    return user;
};
