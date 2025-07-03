import { TransformFnParams } from "class-transformer"

export const trim = ({ value } : TransformFnParams)=> {
		if(typeof value === 'string') {
			return value.trim()
		} else {
			return value
		}
	}

export const trimLower = (({value} : TransformFnParams) => {
		if(typeof value === 'string') {
			return value.trim().toLowerCase()
		} else {
			return value
		}
	})
