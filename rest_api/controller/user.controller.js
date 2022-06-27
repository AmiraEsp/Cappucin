var users = [{
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe.2@test.com",
        "age": 23,
        "id": 1
    },
    {
        "firstName": "Maria",
        "lastName": "Restova",
        "email": "maria.restova@test.com",
        "age": 22,
        "id": 2
    },
    {
        "firstName": "Maria",
        "lastName": "Restova",
        "email": "maria.restova.1@test.com",
        "age": 22,
        "id": 3
    }
];

const incrementId = () => {
    if (users.length == 0) {
        return 1;
    }
    return users[users.length - 1].id + 1;
}

const isEmailUnique = (email) => {
    const userExists = users.find((el) => {
        return el.email == email;
    });
    return userExists;
}

module.exports = {
    getAllUsers: (req, res) => {
        res.status(200).json(users);
    },
    createUser: (req, res) => {
        const user = req.body;
        if (isEmailUnique(user.email)) {
            return res.status(400).send("Email already registred");
        }
        user.id = incrementId();
        users.push(user);
        res.status(201).send("User Created")
    },
    getOneById: (req, res) => {
        const user = users.find(el => el.id == req.params.Identifier);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    },
    updateUserById: (req, res) => {
        // const Identifier = req.params.Identifier
        const { Identifier } = req.params;
        const user = users.find(el => el.id == req.params.Identifier);
        if (!user) {
            return res.status(404).send("User not found");
        }
        users = users.map((el) => {
            if (el.id == Identifier) {
                el = req.body;
                el.id = +Identifier;
            }
            return el;
        })
        res.json(users);
    },
    deleteUserById: (req, res) => {
        const { Identifier } = req.params;
        const index = users.findIndex((el) => el.id == Identifier);
        if (index == -1) {
            return res.status(404).send("User not found");
        }
        // users.splice(index,1);
        users = users.filter((el) => el.id != Identifier);
        res.json(users)
    }
}