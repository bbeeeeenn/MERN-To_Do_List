import { Schema, SchemaTypes, model } from "mongoose";

export default model(
	"user_data",
	new Schema(
		{
			user: {
				type: SchemaTypes.String,
				required: true,
			},
			toDos: [
				{
					type: SchemaTypes.String,
					required: true,
					done: {
						type: SchemaTypes.Boolean,
						default: false,
					},
				},
			],
		},
		{ timestamps: true }
	)
);
