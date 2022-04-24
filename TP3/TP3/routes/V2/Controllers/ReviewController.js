import Review from '../Models/Review'

export default {
    get_all: (req, res) => {
        res.status(200).json(Review.get_all())
    },
    get: (req, res) => {
        const review = Review.get(req.params.id)
        res.status(200).json(review)
    },
    create: (req, res) => {
        const new_reviews = Review.add(req.body)

        res.status(201).json(new_reviews)
    },
    delete: (req, res) => {
        const id = req.params.id

        const new_reviews = Review.delete(id)

        res.status(200).json(new_reviews)
    }
}