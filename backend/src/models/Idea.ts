import { Schema, model } from "mongoose";

const ideaSchema = new Schema({
    idea: {
        type: String,
        maxlength: 300,
        minlength: 10,
        required: true
    }, 
    budgetINR: {
        type: Number,
        required: false
    },
    result: {
      type: Object,
      required: true,
    },
    industry: {
        type: String,
        required: false
    },
    ipHash: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
);

const IdeaModel = model("Idea", ideaSchema);
export default IdeaModel;