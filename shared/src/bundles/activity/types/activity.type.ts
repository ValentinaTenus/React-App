type Activity = {
    id: string;
    cardId: string;
    cardName: string;
    changeType: string;
    oldValue: string;
    newValue: string;
    createdAt: Date;
    updatedAt: Date;
}

export { Activity };