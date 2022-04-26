const User = require("../Models/User")

export default {
    get_all: (req, res) => {
        res.status(200).json(User.get_all())
    },
    get: (req, res) => {
        const user = User.get_all(req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(404).json({
            error: 'User Not Found'
        })
    },
    get_reviews: (req, res) => {
        const reviews = User.get_reviews(req.params.id)
        if (reviews != [])
            res.status(200).json(reviews)
        else res.status(404).json({
            error: 'User or Reviews Not Found'
        })
    },
    create: (req, res) => {

        const new_users = User.add(req.body)

        res.status(201).json(new_users)
    },
    delete: (req, res) => {

        const id = req.params.id

        const new_users = User.delete(id)

        res.status(200).json(new_users)
    },
    delete_all_review: (req, res) => {
        const userId = req.params.id

        const new_reviews = User.delete_reviews(userId)

        res.status(200).json(new_reviews)

    }
}
