let participants = {
    Akhilesh: {
        name: "Akhilesh",
        expenditure: 500
    },
    Anirban: {
        name: "Anirban",
        expenditure: 100
    },
    Anurag: {
        name: "Anurag",
        expenditure: 0
    },
    Anirudh: {
        name: "Anirudh",
        expenditure: 100
    }
};

let products = {
    pizza: {
        name: "pizza",
        cost: "300",
        participants: {
            Akhilesh: {
                name: "Akhilesh",
                amount: -1
            },
            Anirban: {
                name: "Anirban",
                amount: -1
            },
            Anurag: {
                name: "Anurag",
                amount: -1
            },
            Anirudh: {
                name: "Anirudh",
                amount: -1
            }
        }
    },
    pasta: {
        name: "pasta",
        cost: "100",
        participants: {
            Akhilesh: {
                name: "Akhilesh",
                amount: 1
            },
            Anirban: {
                name: "Anirban",
                amount: 1
            },
            Anurag: {
                name: "Anurag",
                amount: 0
            },
            Anirudh: {
                name: "Anirudh",
                amount: 1
            }
        }
    },
    tiramisu: {
        name: "tiramisu",
        cost: "100",
        participants: {
            Akhilesh: {
                name: "Akhilesh",
                amount: 2
            },
            Anirban: {
                name: "Anirban",
                amount: 1
            },
            Anurag: {
                name: "Anurag",
                amount: 0
            },
            Anirudh: {
                name: "Anirudh",
                amount: 0
            }
        }
    }
}

export {participants, products};