import { validateNumber  } from "../utils/validators";

function subtract (a, b) {
    validateNumber(a)
    validateNumber(b)

    return a - b
}

export default subtract