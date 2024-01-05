import { Schema, SchemaTypes, model } from "mongoose";

export default model(
	"user_data",
	new Schema({
		user: {
			type: SchemaTypes.String,
			required: true,
		},
		todos: [
			{
				text: {
					type: SchemaTypes.String,
					required: true,
				},
				date_created: {
					type: SchemaTypes.Date,
					default: Date.now,
				},
				done: {
					type: SchemaTypes.Boolean,
					default: false,
				},
			},
		],
	})
);
