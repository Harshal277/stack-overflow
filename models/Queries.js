import mongoose from "mongoose";

const QueriesSchema = mongoose.Schema({
    queryTitle: { type: String, required: "query"},
    msgs: [{
        steps: String,
    }]
})

export default mongoose.model("Queries", QueriesSchema)