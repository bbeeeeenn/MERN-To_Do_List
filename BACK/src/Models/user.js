import { Schema, SchemaTypes, model } from "mongoose";

const User = model(
	"user",
	new Schema(
		{
			username: {
				type: SchemaTypes.String,
				required: true,
			},
			password: {
				type: SchemaTypes.String,
				required: true,
			},
		},
		{ timestamps: true }
	)
);

export default User;
