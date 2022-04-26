import users from '../../../../TP3/users.json'
import reviews from '../../../../TP3/reviews.json'
import {
    writeFileSync
} from 'fs'

export default {
    get_all() {
        return users;
    },

    get(id) {
        const user = users.find(user => userId == id)

        return user
    },
    get_by(param, value) {    //gets the user by the name of the parameter and it's value
        const user = users.find(user => user[param] == value)

        return user
    },
    add(user) {
        const new_user = {
            ...user,
            "id": Date.now().toString(36)
        }
        let new_users = [
            ...users,
            new_user
        ]
        const new_data = JSON.stringify(new_users)

        writeFileSync("TP3/users.json", new_data)

        return new_user
    },

    //DELETE USER 

    delete(id) {
        let index = users.findIndex(user => userId == id)

        users.splice(index, 1)
        const new_data = JSON.stringify(users)

        writeFileSync("TP3/users.json", new_data)

        return users
    },

    get_reviews(userId) {
        return reviews.filter(review => review.userId == userId)
    },

    delete_reviews(userId) {
        let new_reviews = reviews.filter(review => review.userId != userId)

        const new_data = JSON.stringify(new_reviews)

        writeFileSync("TP3/reviews.json", new_data)

        return new_reviews
    }

}
